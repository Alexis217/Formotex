import { PrismaUserRepository } from "../repositories/prisma-user.repository.js";
import { User } from "../entities/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
}

export class AuthService {
  constructor(private repo = new PrismaUserRepository()) {}

  // Registro de usuario
  async register(input: RegisterInput) {
    // Revisar si ya existe
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new Error("Email ya registrado");

    // Hash de password
    const hashed = await bcrypt.hash(input.password, 10);

    const user = new User(input.name, input.email, hashed);
    (user as any).role = input.role ?? "USER";

    const saved = await this.repo.save(user);
    return {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      role: (saved as any).role,
    };
  }

  // Login de usuario
  async login(input: LoginInput) {
    const user = await this.repo.findByEmail(input.email);
    if (!user) throw new Error("Usuario no encontrado");

    const match = await bcrypt.compare(input.password, user.password);
    if (!match) throw new Error("Contraseña incorrecta");

    // Generar JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: (user as any).role,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: (user as any).role,
      },
    };
  }
}
