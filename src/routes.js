import express from "express";

const router = express.Router();

router.use("/", (req, res) => {
  res.send("halo dunia");
});

export default router;
