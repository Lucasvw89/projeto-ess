const express = require("express");
const router = express.Router();
const maintenance_controller = require("../controllers/maintenance");

//Aline
router.put("/", maintenance_controller.putEditR);
router.delete("/", maintenance_controller.deleteR);

module.exports = router;