const express = require("express");
const {
	createCar,
	getCars,
	getCarById,
	updateCar,
	deleteCar,
	rentCar,
} = require("../controllers/carController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/", verifyToken, isAdmin, createCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", verifyToken, isAdmin, updateCar);
router.delete("/:id", verifyToken, isAdmin, deleteCar);
router.post("/:id/rent", verifyToken, rentCar); 

module.exports = router;
