const todoService = require("../service/todo.service");

async function createTodo(req, res) {
    try {
        const {title, description, userId} = req.body;
        const newTodo = await todoService.createTodo({title, description, userId: Number(userId)});
        return res.status(201).json({message: `Berhasil menambahkan todo baru!`, data: newTodo});
    } catch (error) {
        return res.status(500).json({message: `Gagal menambahkan todo baru!`, error: error.message});
    }
}

async function getTodos(req, res) {
    try {
        const todos = await todoService.getTodos();
        return res.status(200).json({message: `Berhasil menampilkan data todo!`, data: todos});
    } catch (error) {
        return res.status(500).json({message: `Gagal menampilkan data todo!`, error: error.message});
    }
}

async function getTodosByUserId(req, res) {
    try {
        const userId = Number(req.params.userId);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                message: "userId tidak valid"
            });
        }

        const todos = await todoService.getTodosByUserId(userId);
        return res.status(200).json({message: `Berhasil menampilkan data todo!`, data: todos});
    } catch (error) {
        return res.status(500).json({message: `Gagal menampilkan data todo!`, error: error.message});
    }
}

async function updateTodo(req, res) {
    try {
        const id = Number(req.params.id);
        const data = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID tidak valid"
            });
        }

        const updatedTodo = await todoService.updateTodo(id, data);
        return res.status(200).json({message: `Berhasil mengupdate data todo!`, data: updatedTodo});
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        };

        return res.status(500).json({message: `Gagal mengupdate data todo!`, error: error.message});
    }
}

async function deleteTodo(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID tidak valid"
            });
        }
        
        const deletedTodo = await todoService.deleteTodo(id);        
        return res.status(200).json({message: `Berhasil meghapus data todo!`, data: deletedTodo});
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        };

        return res.status(500).json({message: `Gagal menghapus data todo!`, error: error.message});
    }
}

module.exports = {createTodo, getTodos, getTodosByUserId, updateTodo, deleteTodo};