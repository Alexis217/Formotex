import app from "./app.js";
import dotenv from "dotenv";
import { config } from "./config/config.js";

dotenv.config();

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
