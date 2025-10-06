import type { IUserRepository } from "./user.repository.js";
import { User } from "../entities/user.js";
import prisma from "../../lib/prisma.js";

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const entity = new User(user.name, user.email, user.password, user.id);
    (entity as any).role = user.role;
    return entity;
  }

  async save(user: User): Promise<User> {
    const saved = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: (user as any).role ?? "USER",
      },
    });

    const entity = new User(saved.name, saved.email, saved.password, saved.id);
    (entity as any).role = saved.role;
    return entity;
  }
}
