import express from "express";
import authRoutes from "../src/domain/routes/auth.routes.js";
import equipmentRoutes from "../src/domain/routes/equipment.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.use("/api/equipment", equipmentRoutes);

export default app;
