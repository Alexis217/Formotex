import type { IUserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";

interface Input {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
}

export class CreateUserUseCase {
  constructor(private repo: IUserRepository) {}

  async execute(input: Input) {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new Error("Email ya registrado");

    const hashed = await bcrypt.hash(input.password, 10);

    return this.repo.save({
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      password: hashed,
      role: input.role || "USER",
    } as any);
  }
}
