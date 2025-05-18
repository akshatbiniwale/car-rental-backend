const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const {
	rentCar,
	returnCar,
	getAllRentedCars,
	rentalDetails,
	getRentalHistory,
} = require("../controllers/rentalController");
const router = express.Router();

router.post("/:id/rent", verifyToken, rentCar);
router.post("/:id/return", verifyToken, returnCar);

router.get("/rented", verifyToken, isAdmin, getAllRentedCars);
router.get("/:rentalId", verifyToken, isAdmin, rentalDetails);
router.get("/history", verifyToken, isAdmin, getRentalHistory);

module.exports = router;
