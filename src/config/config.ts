import dotenv from "dotenv";

dotenv.config();

const env = process.env;

export const config = Object.freeze({
  port: env.PORT ? Number(env.PORT) : 4000,
  nodeEnv: env.NODE_ENV || "development",
  databaseUrl: env.DATABASE_URL || "",

  jwtSecret: env.JWT_SECRET || "dev_secret",
  jwtExpiresIn: env.JWT_EXPIRES_IN || "1h",

  adminEmail: env.ADMIN_EMAIL || "admin2@formotex.local",
  adminPassword: env.ADMIN_PASSWORD || "Admin1234!",
});

// Validaciones básicas
if (!config.databaseUrl) {
  throw new Error("Falta configurar DATABASE_URL en el archivo .env");
}
if (!config.jwtSecret) {
  throw new Error("Falta configurar JWT_SECRET en el archivo .env");
}
