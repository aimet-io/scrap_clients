import Playwright from "playwright";
import { join } from "path";
import { URL } from "url";
import fileType, { fileTypeFromBuffer } from "file-type";
import { EXECUTABLE_PATH, PATH_IMAGES } from "./config";

const waitPage = Playwright.chromium
  .launch({
    executablePath: EXECUTABLE_PATH,
  })
  .then((browser) => browser.newPage());

export const getData = async (url: string, notSave?: boolean) => {
  const page = await waitPage;
  await page.goto(url);

  const hostname = new URL(url).hostname;

  const pathImage = join(PATH_IMAGES, hostname + ".jpeg");

  const buffer = notSave
    ? await page.screenshot()
    : await page.screenshot({ path: pathImage });

  const mimeType = await fileTypeFromBuffer(buffer);

  if (!mimeType) return null;

  const base64String = `data:${mimeType.mime};base64,${buffer.toString(
    "base64"
  )}`;

  return base64String;
};
