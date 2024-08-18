const experess = require("express");
const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handle uncaught error
process.on("uncaughtException", (err) =>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to uncaught exception`);
  process.exit(1);
})

// config dotenv
dotenv.config({ path: "backend/config/config.env" });

// connect to db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// unhandled promise error
process.on("unhandledRejection", (err) => {
console.log(`Error: ${err.message}`);
console.log(`Shutting down server due to unhandled promise Rejection`);

server.close(() => {
  process.exit(1)
})

})

