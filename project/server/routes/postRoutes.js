const express = require("express");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("comments");
  res.json(posts);
});

router.post("/", async (req, res) => {
  const { title, content, userId, userName } = req.body;
  const newPost = new Post({
    title,
    content,
    userId,
    userName,
  });
  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

module.exports = router;
