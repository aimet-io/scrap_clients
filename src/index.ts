import express from "express";
import cors from "cors";
import { getData } from "./getData";
import { PORT } from "./config";

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("*", async (req, res) => {
    try {
      const url = req.path.slice(1);
      const data = await getData(url);
      console.log(url);
      res.json({ data });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });

  app.listen(PORT, () => console.log(`Running in ${PORT} port.`));
};

main();
