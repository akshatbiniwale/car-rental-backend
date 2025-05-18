const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { userRentals } = require("../controllers/rentalController");
const router = express.Router();

router.get("/me/rentals", verifyToken, userRentals);

module.exports = router;
