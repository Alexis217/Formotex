import prisma from "../src/lib/prisma.js";
import bcrypt from "bcryptjs";
import { config } from "../src/config/config.js";

async function main() {
  const adminEmail = config.adminEmail;
  const adminPassword = config.adminPassword;

  if (!adminEmail || !adminPassword) {
    console.error("❌ Faltan variables ADMIN_EMAIL o ADMIN_PASSWORD en .env");
    process.exit(1);
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`✅ El admin ya existe: ${existingAdmin.email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      name: "Administrador",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`🌱 Admin creado: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
