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
  const title = await page.title();
  const urlPage = page.url();
  const pageDescription =  await page.$eval('meta[name=description]', (element) => element.getAttribute('content'));

  const hostname = new URL(url).hostname;

  const pathImage = join(PATH_IMAGES, hostname + ".jpeg");

  const buffer = (await page.screenshot({ path: pathImage })).toString("base64");

  return {
    title,
    urlPage,
    pageDescription,
    buffer,
  }
};
