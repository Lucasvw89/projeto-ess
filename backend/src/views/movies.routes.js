const express = require("express");
const router = express.Router();
const movies_controller = require("../controllers/movies");

// Ariel
router.get("/", movies_controller.getMovie);
router.post("/", movies_controller.addMovie);
router.delete("/", movies_controller.delMovie);
router.put("/", movies_controller.editMovie);

module.exports = router;

//