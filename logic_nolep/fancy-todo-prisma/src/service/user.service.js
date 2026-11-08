const prisma = require("../../prisma/client");

async function createUser({name, email, phone}) {
    return prisma.user.create({
        data: {
            name,
            email,
            phone
        }
    });
};

async function getUsers() {
    return prisma.user.findMany({});
}

async function getUserById(id) {
    return prisma.user.findUnique({
        where: {
            id
        }
    });
};

async function updateUser(id, data) {
    return prisma.user.update({
        where: {
            id
        },
        data
    });
};

async function deleteUser(id) {
    return prisma.user.delete({
        where: {
            id
        }
    });
};

module.exports = {createUser, getUsers, getUserById, updateUser, deleteUser};