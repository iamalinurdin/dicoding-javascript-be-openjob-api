import express from "express";
import routes from "./routes.js";

const app = express();
const port = 3000;
const hostname = "http://localhost";

app.use(routes);

app.listen(3000, () => {
  console.log(`listening at ${hostname}:${port}`);
});
