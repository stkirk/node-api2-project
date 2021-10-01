// implement your posts router here
const express = require("express");

const Post = require("./posts-model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be retrieved" });
  }
});

router.post("/", (req, res) => {
  const post = req.body;
  console.log("NEW POST--> ", req.body);

  if (!post.title || !post.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.insert(post)
      .then((posted) => {
        res.status(201).json({
          ...posted,
          title: post.title,
          contents: post.contents,
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  if (!changes.title || !changes.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.update(id, changes)
      .then((updatedPost) => {
        if (updatedPost === 1) {
          res.status(200).json({ ...changes, id: parseInt(id) });
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      });
  }
});

module.exports = router;
