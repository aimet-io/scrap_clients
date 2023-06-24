import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT);
export const EXECUTABLE_PATH = String(
  process.env.EXECUTABLE_PATH || process.env.CHROME_BIN
);
export const PATH_IMAGES = String(process.env.PATH_IMAGES);
