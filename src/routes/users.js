import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:user_id", getUser);
router.post("/users", createUser);
router.patch("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);

export default router;
