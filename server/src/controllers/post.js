import PostModel from "../models/post.js";
import { findUserId } from "../service/auth.js";

// CREATE
export const createPostHandler = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = findUserId(userId);

    if (!user) {
      return res.status(403).json("Unauthorized");
    }
    const newPost = new PostModel({
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await PostModel.find();

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await PostModel.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await PostModel.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const likedPostHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await PostModel.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await PostModel.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
