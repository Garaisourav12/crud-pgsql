const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	PORT: process.env.PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	SALT: Number(process.env.SALT),
	ENV_TYPE: process.env.ENV_TYPE,
};
