const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/posts");

// Miguel
router.post("/", post_controller.createPost);
router.delete("/", post_controller.deletePost);
router.put("/", post_controller.updatePost);

module.exports = router;

