const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const { JWT_SECRET, SALT } = require("../envConfig");

const hashPassword = async (password) => {
	return await bycrypt.hash(password, SALT);
};

const comparePassword = async (password, hash) => {
	return await bycrypt.compare(password, hash);
};

const generateToken = (user) => {
	return jwt.sign({ id: user.id }, JWT_SECRET, {
		expiresIn: "1d",
	});
};

const verifyToken = (token) => {
	return jwt.verify(token, JWT_SECRET);
};

module.exports = {
	hashPassword,
	comparePassword,
	generateToken,
	verifyToken,
};
