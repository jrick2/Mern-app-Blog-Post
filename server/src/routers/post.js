import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likedPostHandler,
} from "../controllers/post.js";
import { requireUser } from "../middlewares/requireUser.js";

const routes = express.Router();

routes.get("/", requireUser, getFeedPosts);
routes.get("/:userId/posts", requireUser, getUserPosts);

routes.patch("/:id/like", requireUser, likedPostHandler);

export default routes;
