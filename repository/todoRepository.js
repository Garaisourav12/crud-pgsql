const { InternalServerError } = require("../errors");
const { Todo } = require("../models");

const getAllTodos = async (id) => {
	try {
		return await Todo.findAll({
			where: { ownerId: id },
		});
	} catch (error) {
		throw new InternalServerError(
			"Internal Server Error: " + error.message
		);
	}
};

const getTodoById = async (id) => {
	try {
		return await Todo.findByPk(id);
	} catch (error) {
		throw new InternalServerError(
			"Internal Server Error: " + error.message
		);
	}
};

const createTodo = async (todoData) => {
	try {
		return await Todo.create(todoData);
	} catch (error) {
		throw new InternalServerError(
			"Internal Server Error: " + error.message
		);
	}
};

const updateTodo = async (id, todoData) => {
	try {
		const [affectedRows, updatedTodo] = await Todo.update(todoData, {
			where: { id },
			returning: true, // Only supported in PostgreSQL
		});

		// if (affectedRows === 0) {
		// 	throw new NotFoundError("Todo not found!");
		// }

		// updatedTodo is an array, return the first element
		return updatedTodo[0];
	} catch (error) {
		throw new InternalServerError(
			"Internal Server Error: " + error.message
		);
	}
};

const deleteTodo = async (id) => {
	try {
		return await Todo.destroy({ where: { id } }); // Return number of rows deleted
	} catch (error) {
		throw new InternalServerError(
			"Internal Server Error: " + error.message
		);
	}
};

const deleteMyTodos = async (ownerId) => {
	try {
		return await Todo.destroy({ where: { ownerId } }); // Return number of rows deleted
	} catch (error) {
		throw new InternalServerError(
			"Internal Server Error: " + error.message
		);
	}
};

module.exports = {
	getAllTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo,
	deleteMyTodos,
};
