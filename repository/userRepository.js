// repository/userRepository.js
const { InternalServerError } = require("../errors");
const { User } = require("../models");

class UserRepository {
	async getAllUsers() {
		try {
			return await User.findAll();
		} catch (error) {
			throw new InternalServerError(
				"Internal Server Error: " + error.message
			);
		}
	}

	async getUserById(id) {
		try {
			return await User.findByPk(id);
		} catch (error) {
			throw new InternalServerError(
				"Internal Server Error: " + error.message
			);
		}
	}

	async getUserByEmail(email) {
		try {
			return await User.findOne({ where: { email } });
		} catch (error) {
			throw new InternalServerError(
				"Internal Server Error: " + error.message
			);
		}
	}

	async createUser(userData) {
		try {
			return await User.create(userData);
		} catch (error) {
			throw new InternalServerError(
				"Internal Server Error: " + error.message
			);
		}
	}
}

module.exports = new UserRepository();
