const userService = require("../service/user.service");

async function createUser(req, res) {
    try {
        const {name, email, phone} = req.body;
        const newUser = await userService.createUser({name, email, phone});
        return res.status(201).json({message: `User baru berhasil ditambahkan!`, data: newUser});
    } catch (error) {
        return res.status(500).json({message: `Gagal menambahkan user baru!`, error: error.message});
    }
}

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers();
        return res.status(200).json({message: `Berhasil menampilkan data user!`, data: users});
    } catch (error) {
        return res.status(500).json({message: `Gagal menampilkan data user!`, error: error.message});
    }
}

async function getUserById(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID tidak valid"
            });
        }

        const user = await userService.getUserById(id);
        
        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }
        
        return res.status(200).json({message: `Berhasil mendapatkan data user!`, data: user});
    } catch (error) {
        return res.status(500).json({message: `Gagal mendapatkan data user!`, error: error.message});
    }
}

async function updateUser(req, res) {
    try {
        const id = Number(req.params.id);
        const data = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID tidak valid"
            });
        }

        const updatedUser = await userService.updateUser(id, data);        
        return res.status(200).json({message: `Berhasil megupdate data user!`, data: updatedUser});
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        };

        return res.status(500).json({message: `Gagal mengupdate data user!`, error: error.message});
    }
}

async function deleteUser(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID tidak valid"
            });
        }

        const deletedUser = await userService.deleteUser(id);
        return res.status(200).json({message: `Berhasil menghapus data user`, data: deletedUser});
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        };

        return res.status(500).json({message: `Gagal menghapus data user`, error: error.message});
    }
}

module.exports = {createUser, getUsers, getUserById, updateUser, deleteUser};