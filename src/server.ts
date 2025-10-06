import app from "./app.js";
import dotenv from "dotenv";
import { config } from "./config/config.js";
import { env } from "process";

dotenv.config();

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
