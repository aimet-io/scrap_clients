import Playwright from "playwright";
import { join } from "path";
import { URL } from "url";
import { EXECUTABLE_PATH, PATH_IMAGES } from "./config";

const waitPage = Playwright.chromium
  .launch({
    executablePath: EXECUTABLE_PATH,
  })
  .then((browser) => browser.newPage());

export const getData = async (url: string) => {
  const page = await waitPage;
  await page.goto(url);

  const hostname = new URL(url).hostname;

  const pathImage = join(PATH_IMAGES, hostname + ".jpeg");

  const buffer = await page.screenshot({ path: pathImage });

  return buffer.toString();
};
