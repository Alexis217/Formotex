import type { Request, Response } from "express";
import { EquipmentService } from "../services/equipment.service.js";

const service = new EquipmentService();

export async function getEquipments(req: Request, res: Response) {
  const data = await service.getAll();
  res.json(data);
}

export async function getEquipment(req: Request, res: Response) {
  const eq = await service.getOne(req.params.id);
  res.json(eq);
}

export async function createEquipment(req: Request, res: Response) {
  const eq = await service.create(req.body);
  res.status(201).json(eq);
}

export async function updateEquipment(req: Request, res: Response) {
  const eq = await service.update(req.params.id, req.body);
  res.json(eq);
}

export async function deleteEquipment(req: Request, res: Response) {
  await service.delete(req.params.id);
  res.status(204).send();
}
