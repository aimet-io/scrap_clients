import Playwright from "puppeteer";
import { join } from "path";
import { URL } from "url";
import { fileTypeFromBuffer } from "file-type";
import { PATH_IMAGES } from "./config";

const waitPage = Playwright.launch({
  headless: true,
}).then((browser) => browser.newPage());

export const getData = async (url: string, notSave?: boolean) => {
  const page = await waitPage;
  await page.goto(url);
  const title = await page.title();
  const description = await page
    .$eval("meta[name=description]", (element) =>
      element.getAttribute("content")
    )
    .catch(() => "");
  const hostname = new URL(url).hostname;

  const pathImage = join(PATH_IMAGES, hostname + ".jpeg");

  const buffer = notSave
    ? await page.screenshot()
    : await page.screenshot({ path: pathImage });

  const mimeType = await fileTypeFromBuffer(buffer);

  if (!mimeType) return null;

  const image = `data:${mimeType.mime};base64,${buffer.toString("base64")}`;

  return {
    title,
    url,
    description,
    image,
  };
};
