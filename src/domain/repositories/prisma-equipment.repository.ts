import  prisma  from "../../lib/prisma.js";
import { Equipment } from "../entities/equipment.js";

export class PrismaEquipmentRepository {
  async findAll() {
    return prisma.equipment.findMany();
  }

  async findById(id: string) {
    return prisma.equipment.findUnique({ where: { id } });
  }

  async save(data: Equipment) {
    return prisma.equipment.create({ data });
  }

  async update(id: string, data: Partial<Equipment>) {
    return prisma.equipment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.equipment.delete({ where: { id } });
  }
}
