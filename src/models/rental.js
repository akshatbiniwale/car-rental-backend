const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Rental = sequelize.define("Rental", {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	carId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	startDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	endDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	returned: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Rental;
