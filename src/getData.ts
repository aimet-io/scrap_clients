import Playwright from "puppeteer";
import { join } from "path";
import { URL } from "url";
import { fileTypeFromBuffer } from "file-type";
import { EXECUTABLE_PATH, PATH_IMAGES } from "./config";
import { wait } from "./utils";

const waitBrowser = Playwright.launch({
  headless: true,
  executablePath: EXECUTABLE_PATH,
  args: [
    // Required for Docker version of Puppeteer
    "--no-sandbox",
    "--disable-setuid-sandbox",
    // This will write shared memory files into /tmp instead of /dev/shm,
    // because Docker’s default for /dev/shm is 64MB
    "--disable-dev-shm-usage",
  ],
});

export const getData = async (url: string, notSave?: boolean) => {
  const browser = await waitBrowser;
  const page = await browser.newPage();
  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  });
  await page.goto(url);
  const title = await page.title();
  const description = await page
    .$eval("meta[name=description]", (element) =>
      element.getAttribute("content")
    )
    .catch(() => "");
  const hostname = new URL(url).hostname;

  const pathImage = join(PATH_IMAGES, hostname + ".jpeg");

  await wait(1.5);

  const buffer = notSave
    ? await page.screenshot()
    : await page.screenshot({ path: pathImage });

  const mimeType = await fileTypeFromBuffer(buffer);

  if (!mimeType) return null;

  const image = `data:${mimeType.mime};base64,${buffer.toString("base64")}`;

  await page.close();

  return {
    title,
    url,
    description,
    image,
  };
};
