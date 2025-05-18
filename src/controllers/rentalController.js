const Rental = require("../models/rental");
const Car = require("../models/car");
const { Op } = require("sequelize");


const rentCar = async (req, res) => {
	const { startDate, endDate } = req.body;
	const carId = req.params.id;
	const userId = req.user.id;

	try {
		const car = await Car.findByPk(carId);
		if (!car) {
			return res.status(404).json({ message: "Car not found" });
		}

		const overlapping = await Rental.findOne({
			where: {
				carId,
				returned: false,
				[Op.or]: [
					{
						startDate: {
							[Op.between]: [startDate, endDate],
						},
					},
					{
						endDate: {
							[Op.between]: [startDate, endDate],
						},
					},
					{
						startDate: { [Op.lte]: startDate },
						endDate: { [Op.gte]: endDate },
					},
				],
			},
		});

		if (overlapping) {
			return res
				.status(400)
				.json({
					message: "Car is already rented for the selected period",
				});
		}

		const rental = await Rental.create({
			userId,
			carId,
			startDate,
			endDate,
		});
		await Car.update({ availability: false }, { where: { id: carId } });
		res.status(201).json({ message: "Car rented successfully", rental });
	} catch (error) {
		res.status(500).json({ error: "Rental error", details: error });
	}
};

const returnCar = async (req, res) => {
	const carId = req.params.id;
	const userId = req.user.id;

	try {
		const rental = await Rental.findOne({
			where: { carId, userId, returned: false },
		});
		if (!rental)
			return res.status(404).json({ error: "No active rental found" });

		rental.returned = true;
		await rental.save();
		await Car.update({ availability: true }, { where: { id: carId } });

		res.status(200).json({ message: "Car returned successfully", rental });
	} catch (error) {
		res.status(500).json({ error: "Return error", details: error });
	}
};

const userRentals = async (req, res) => {
	try {
		const rentals = await Rental.findAll({
			where: { userId: req.user.id },
		});
		res.status(200).json(rentals);
	} catch (error) {
		res.status(500).json({
			error: "Error fetching rentals",
			details: error,
		});
	}
};

const rentalDetails = async (req, res) => {
	try {
		const rental = await Rental.findByPk(req.params.rentalId);
		res.status(200).json(rental);
	} catch (error) {
		res.status(500).json({
			error: "Error fetching rental details",
			details: error,
		});
	}
};

const getAllRentedCars = async (req, res) => {
	try {
		const rentals = await Rental.findAll({ where: { returned: false } });
		res.status(200).json(rentals);
	} catch (error) {
		res.status(500).json({
			error: "Error fetching rented cars",
			details: error,
		});
	}
};

const getRentalHistory = async (req, res) => {
	const { userId, carId, startDate, endDate } = req.query;

	const filters = {};
	if (userId) filters.userId = userId;
	if (carId) filters.carId = carId;

	if (startDate && endDate) {
		filters.startDate = { [Op.gte]: new Date(startDate) };
		filters.endDate = { [Op.lte]: new Date(endDate) };
	}

	try {
		const rentals = await Rental.findAll({
			where: filters,
			order: [["startDate", "DESC"]],
		});
		res.status(200).json(rentals);
	} catch (error) {
		res.status(500).json({
			error: "Error fetching rental history",
			details: error,
		});
	}
};


module.exports = {
	rentCar,
	returnCar,
	userRentals,
	rentalDetails,
	getAllRentedCars,
	getRentalHistory,
};
