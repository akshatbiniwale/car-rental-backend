const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Car = sequelize.define("Car", {
	make: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	model: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	year: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	availability: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
	adminId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = Car;
