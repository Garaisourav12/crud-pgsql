const { ENV_TYPE } = require("../envConfig");
const { BadRequestError, ConflictError } = require("../errors");
const userRepository = require("../repository/userRepository");
const {
	comparePassword,
	hashPassword,
	generateToken,
} = require("../utils/authUtils");
const { dataMissing } = require("../utils/commonUtils");

const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		if (dataMissing(name, email, password)) {
			throw new BadRequestError("All fields are required!");
		}

		const userExist = await userRepository.getUserByEmail(email);
		if (userExist) {
			throw new ConflictError("User already exists!");
		}

		const hashedPassword = await hashPassword(password);

		const user = await userRepository.createUser({
			name,
			email,
			password: hashedPassword,
		});

		return res.status(201).json({
			success: true,
			statusCode: 201,
			message: "User created successfully!",
			data: user,
		});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (dataMissing(email, password)) {
			throw new BadRequestError("All fields are required!");
		}

		const user = await userRepository.getUserByEmail(email);
		if (!user) {
			throw new BadRequestError("Email not found!");
		}

		const isMatch = await comparePassword(password, user.password);

		if (!isMatch) {
			throw new BadRequestError("Incorrect password!");
		}

		const token = generateToken(user);

		return res
			.status(200)
			.cookie("token", token, {
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
				httpOnly: true,
				secure: ENV_TYPE !== "development",
				sameSite: "none",
			})
			.json({
				success: true,
				statusCode: 200,
				message: "Login successful!",
				data: user,
			});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

const logout = async (req, res) => {
	return res
		.status(200)
		.clearCookie("token", {
			httpOnly: true,
			secure: ENV_TYPE !== "development",
			sameSite: "none",
		})
		.json({
			success: true,
			statusCode: 200,
			message: "Logout successful!",
		});
};

const getMe = async (req, res) => {
	const { id } = req.user;

	try {
		const user = await userRepository.getUserById(id);

		if (!user) {
			throw new BadRequestError("User not found!");
		}

		return res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Profile retrieved successfully!",
			data: user,
		});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

module.exports = {
	register,
	login,
	logout,
	getMe,
};
