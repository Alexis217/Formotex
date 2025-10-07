import { Router } from "express";
import {
  getEquipments,
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ensureRole } from "../middlewares/role.middleware.js";

const router = Router();

// Solo ADMIN puede crear, actualizar o eliminar
router.use(authMiddleware);

router.get("/", getEquipments);
router.get("/:id", getEquipment);
router.post("/", ensureRole("ADMIN"), createEquipment);
router.put("/:id", ensureRole("ADMIN"), updateEquipment);
router.delete("/:id", ensureRole("ADMIN"), deleteEquipment);

export default router;
