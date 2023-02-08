const { Router } = require("express");
const { getTotalData } = require("../controllers/stats");

const router = Router();

// Get total data
router.get("/data", getTotalData);

module.exports = router;