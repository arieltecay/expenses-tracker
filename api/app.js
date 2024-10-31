const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const errorHandlerMiddle = require('./middlewares/errorHandlerMiddle');
const app = express();
const dotenv = require('dotenv');

//Load env variables
dotenv.config();

//Connect to MongoDB
// const url = "mongodb+srv://arieltecay:3aW0kVyj2HSgZvEN@onlyinfo.ws89f.mongodb.net/?retryWrites=true&w=majority&appName=OnlyInfo"
const url = process.env.MONGO_URI || "mongodb+srv://arieltecay:3aW0kVyj2HSgZvEN@onlyinfo.ws89f.mongodb.net/?retryWrites=true&w=majority&appName=OnlyInfo"
mongoose.connect(process.env.URL_BASE).then(() => {
    console.log("Connected to the database");
}).catch((error) => {
    console.log("Error: ", error);
});

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//Middlewares
app.use(express.json());
//routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
app.use(errorHandlerMiddle);

//start server

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
