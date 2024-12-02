const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const router = express.Router();

router.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { content, author } = req.body;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const comment = new Comment({ content, author, postId });
  await comment.save();
  post.comments.push(comment._id);
  await post.save();
  res.status(201).json(comment);
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  res.status(200).json(comments);
});

router.post("/", async (req, res) => {
  const { content, author, postId } = req.body;
  const newComment = new Comment({ content, author, postId });
  await newComment.save();
  res.status(201).json(newComment);
});

module.exports = router;
