import express from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getCurrentUser,
  getUserSessionsHandler,
} from "../controllers/auth.js";
import { requireUser } from "../middlewares/requireUser.js";

const routes = express.Router();

routes.get("/healthcheck", (req, res) => res.sendStatus(200));

routes.get("/me", requireUser, getCurrentUser);

routes.post("/login", createUserSessionHandler);

routes.get("/login", requireUser, getUserSessionsHandler);

routes.delete("/login", requireUser, deleteSessionHandler);

export default routes;
