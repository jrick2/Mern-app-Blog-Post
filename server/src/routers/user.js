import express from "express";
import {
  addRemoveFriendsHandler,
  getUserFriedsHandler,
  getUserHandler,
} from "../controllers/user.js";
import { requireUser } from "../middlewares/requireUser.js";

const routes = express.Router();

routes.get("/:id", requireUser, getUserHandler);
routes.get("/:id/friends", requireUser, getUserFriedsHandler);

routes.patch("/:id/:friendId", requireUser, addRemoveFriendsHandler);

export default routes;
