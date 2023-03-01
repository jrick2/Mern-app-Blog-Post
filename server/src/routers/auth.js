import express from "express";
import {
  createUserHandler,
  createUserSessionHandler,
  deleteSessionHandler,
  getCurrentUser,
  getUserSessionsHandler,
} from "../controllers/auth.js";
import { requireUser } from "../middlewares/requireUser.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => res.sendStatus(200));

router.post("/api/register", createUserHandler);

router.get("/api/me", requireUser, getCurrentUser);

router.post("/api/login", createUserSessionHandler);

router.get("/api/login", requireUser, getUserSessionsHandler);

router.delete("/api/login", requireUser, deleteSessionHandler);

export default router;
