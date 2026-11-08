const app = require('./app');
const prisma = require('../prisma/client');

let server;
let port = 3000

async function startServer() {
  try {
    await prisma.$connect();

    console.log("Connected to Database");

    server = app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exitCode = 1;
  }
}

const exitHandler = async (exitCode = 1) => {
  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      console.log("Server closed");
      server = undefined;
    }

    await prisma.$disconnect();
    console.log("Prisma disconnected");
  } catch (error) {
    console.error("Shutdown error:", error);
    process.exitCode = 1;
    return;
  }

  process.exitCode = exitCode;
};

const unexpectedErrorHandler = async (error) => {
  console.log(error);
  await exitHandler(1);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.once("SIGTERM", () => {
  void exitHandler(0);
});

process.once("SIGINT", () => {
  void exitHandler(0);
});

startServer();