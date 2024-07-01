const express = require("express");
const router = express.Router();
const page_controller = require("../controllers/pages")


router.get("/:filme_id", page_controller.showpage);

module.exports = router;
