const express = require("express")
const routes = require("./routes/index")
const connectDB = require("./connect")
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json());
require("dotenv").config();


//Connecting to the database
connectDB();

// Using the routes
app.use("/", routes);

const server = app.listen(PORT, () =>
  console.log(`Server is up on Port ${PORT}`)
);

process.on('uncaughtException', err => {
    console.log(`Uncaught Exceptions ==> ${err.name} ${err.message}   `);
    console.log('Server is shutting down');
    process.exit();
  });