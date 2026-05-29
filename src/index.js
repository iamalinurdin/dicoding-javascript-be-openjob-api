import "dotenv/config";
import express from "express";
import routes from "./routes.js";
import process from "process";

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`listening at ${hostname}:${port}`);
});
