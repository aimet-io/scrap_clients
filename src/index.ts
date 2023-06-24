import express from "express";
import { getData } from "./getData";
import { PORT } from "./config";

const main = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post("/", async (req, res) => {
    try {
      const { url } = req.body;
      const data = await getData(url);
      res.json(data);
    } catch (error) {
      res.json({ error });
    }
  });

  app.listen(PORT, () => console.log(`Running in ${PORT} port.`));
};

main();
