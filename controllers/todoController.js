const { BadRequestError, ForbiddenError, NotFoundError } = require("../errors");
const todoRepository = require("../repository/todoRepository");
const { dataMissing } = require("../utils/commonUtils");

const getAllTodos = async (req, res) => {
	try {
		const todos = await todoRepository.getAllTodos();

		return res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Todos retrieved successfully!",
			data: todos,
		});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

const getTodoById = async (req, res) => {
	const { id } = req.params;

	try {
		const todo = await todoRepository.getTodoById(id);

		if (!todo) {
			throw new NotFoundError("Todo not found!");
		}

		return res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Todo retrieved successfully!",
			data: todo,
		});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

const createTodo = async (req, res) => {
	const { title, description } = req.body;

	try {
		if (dataMissing(title, description)) {
			throw new BadRequestError("All fields are required!");
		}

		const todo = await todoRepository.createTodo({
			title,
			description,
		});

		return res.status(201).json({
			success: true,
			statusCode: 201,
			message: "Todo created successfully!",
			data: todo,
		});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

const updateTodo = async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	try {
		if (dataMissing(title, description)) {
			throw new BadRequestError("All fields are required!");
		}

		const todo = await todoRepository.fillTodoById(id);

		if (!todo) {
			throw new NotFoundError("Todo not found!");
		}

		if (todo.ownerId !== req.user.id) {
			throw new ForbiddenError(
				"You are not allowed to update this todo!"
			);
		}

		const updatedTodo = await todoRepository.updateTodo(id, {
			title,
			description,
		});

		return res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Todo updated successfully!",
			data: updatedTodo,
		});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

const deleteTodo = async (req, res) => {
	const { id } = req.params;

	try {
		const todo = await todoRepository.fillTodoById(id);

		if (!todo) {
			throw new NotFoundError("Todo not found!");
		}

		if (todo.ownerId !== req.user.id) {
			throw new ForbiddenError(
				"You are not allowed to delete this todo!"
			);
		}

		await todoRepository.deleteTodo(id);

		return res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Todo deleted successfully!",
			deletedTodo: todo,
		});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

const deleteMyTodos = async (req, res) => {
	try {
		const deletedTodos = await todoRepository.deleteMyTodos(req.user.id);

		return res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Todos deleted successfully!",
			data: deletedTodos,
		});
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			statusCode: error.statusCode,
		});
	}
};

const completeTodo = async (req, res) => {
	const { id } = req.params;

	try {
		const todo = await todoRepository.fillTodoById(id);

		if (!todo) {
			throw new NotFoundError("Todo not found!");
		}

		if (todo.ownerId !== req.user.id) {
			throw new ForbiddenError(
				"You are not allowed to complete this todo!"
			);
		}

		const completedTodo = await todoRepository.updateTodo(id, {
			completed: true,
		});

		return res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Todo completed successfully!",
			data: completedTodo,
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
	getAllTodos,
	getTodoById,
	createTodo,
	updateTodo,
	completeTodo,
	deleteTodo,
	deleteMyTodos,
};
