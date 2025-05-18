const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
	const { username, password, role } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			role,
		});
		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error });
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ where: { username } });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = generateToken(user);
		res.json({ message: "Login successful", token });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Error logging in", error });
	}
};

const generateToken = (user) => {
	return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

module.exports = {
	register,
	login,
};
