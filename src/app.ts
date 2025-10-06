import express from "express";
import authRoutes from "../src/domain/routes/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

export default app;
