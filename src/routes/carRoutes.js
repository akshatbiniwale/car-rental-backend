const express = require("express");
const {
	createCar,
	getCars,
	getCarById,
	updateCar,
	deleteCar,
	searchCars,
} = require("../controllers/carController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/", verifyToken, isAdmin, createCar);

router.get("/", getCars);
router.get("/search", searchCars);
router.get("/:id", getCarById);

router.put("/:id", verifyToken, isAdmin, updateCar);

router.delete("/:id", verifyToken, isAdmin, deleteCar);

module.exports = router;
