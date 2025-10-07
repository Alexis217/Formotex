import { PrismaEquipmentRepository } from "../repositories/prisma-equipment.repository.js";
import { Equipment } from "../entities/equipment.js";

export class EquipmentService {
  constructor(private repo = new PrismaEquipmentRepository()) {}

  async getAll() {
    return this.repo.findAll();
  }

  async getOne(id: string) {
    const eq = await this.repo.findById(id);
    if (!eq) throw new Error("Equipo no encontrado");
    return eq;
  }

  async create(input: Equipment) {
    return this.repo.save(input);
  }

  async update(id: string, input: Partial<Equipment>) {
    return this.repo.update(id, input);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}
