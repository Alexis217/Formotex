import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ensureRole } from "../middlewares/role.middleware.js";
import { body } from "express-validator";
import { validationMiddleware } from "../middlewares/validation.middleware.js";

const router = Router();

// Login público
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isString().notEmpty(),
  validationMiddleware,
  login,
);

// Register -> solo admin
router.post(
  "/register",
  body("email").isEmail(),
  body("name").isString().notEmpty(),
  body("password").isString().isLength({ min: 6 }),
  body("role").isIn(["ADMIN", "USER"]),
  validationMiddleware,
  register,
);

export default router;
