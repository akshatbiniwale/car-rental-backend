const Car = require("../models/car");

const createCar = async (req, res) => {
	const { make, model, year, availability } = req.body;
	try {
		const car = await Car.create({
			make,
			model,
			year,
			availability,
			adminId: req.user.id,
		});
		res.status(201).json(car);
	} catch (error) {
		res.status(500).json({ error: "Database error", details: error });
	}
};

const getCars = async (req, res) => {
	try {
		const cars = await Car.findAll();
		res.status(200).json(cars);
	} catch (error) {
		res.status(500).json({ error: "Database error", details: error });
	}
};

const getCarById = async (req, res) => {
	try {
		const car = await Car.findByPk(req.params.id);
		if (!car) return res.status(404).json({ error: "Car not found" });
		res.status(200).json(car);
	} catch (error) {
		res.status(500).json({ error: "Database error", details: error });
	}
};

const updateCar = async (req, res) => {
	try {
		const car = await Car.findByPk(req.params.id);
		if (!car) return res.status(404).json({ error: "Car not found" });

		if (car.adminId !== req.user.id)
			return res
				.status(403)
				.json({ error: "Unauthorized to update this car" });

		await car.update(req.body);
		res.status(200).json(car);
	} catch (error) {
		res.status(500).json({ error: "Database error", details: error });
	}
};

const deleteCar = async (req, res) => {
	try {
		const car = await Car.findByPk(req.params.id);
		if (!car) return res.status(404).json({ error: "Car not found" });

		if (car.adminId !== req.user.id)
			return res
				.status(403)
				.json({ error: "Unauthorized to delete this car" });

		await car.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Database error", details: error });
	}
};


const rentCar = async (req, res) => {
	try {
		const car = await Car.findByPk(req.params.id);
		if (!car) return res.status(404).json({ error: "Car not found" });
		if (!car.availability)
			return res.status(400).json({ error: "Car is already rented" });

		car.availability = false;
		await car.save();
		res.status(200).json({ message: "Car rented successfully", car });
	} catch (error) {
		res.status(500).json({ error: "Error renting car", details: error });
	}
};


module.exports = {
	createCar,
	getCars,
	getCarById,
	updateCar,
	deleteCar,
	rentCar,
};
