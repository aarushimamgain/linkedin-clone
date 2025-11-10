import express from "express";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const post = new Post({
      authorId: req.user.id,
      authorName: req.user.name,
      text: req.body.content, // ✅ changed here
    });
    await post.save();
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

export default router;

