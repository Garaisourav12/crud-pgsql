"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Todo.belongsTo(models.User, {
				foreignKey: "ownerId",
				onDelete: "CASCADE",
			});
		}
	}
	Todo.init(
		{
			title: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.TEXT, allowNull: false },
			completed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Todo",
			timestamps: true,
		}
	);

	return Todo;
};
