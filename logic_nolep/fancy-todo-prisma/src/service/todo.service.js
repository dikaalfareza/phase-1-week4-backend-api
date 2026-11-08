const prisma = require("../../prisma/client");

async function createTodo({title, description, userId}) {
    return prisma.todo.create({
        data: {
            title,
            description,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
};

async function getTodos() {
    return prisma.todo.findMany({
        orderBy: {
            id: "desc"
        }
    });
}

async function getTodosByUserId(userId) {
    return prisma.todo.findMany({
        where: {
            userId
        },
        orderBy: {
            id: "desc"
        }
    });
};

async function updateTodo(id, data) {
    return prisma.todo.update({
        where: {
            id
        },
        data
    });
};

async function deleteTodo(id) {
    return prisma.todo.delete({
        where: {
            id
        }
    });
};

module.exports = {createTodo, getTodos, getTodosByUserId, updateTodo, deleteTodo};