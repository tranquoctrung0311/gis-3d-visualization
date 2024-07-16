const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./router/auth");
const faceRoute = require("./router/face");
const nodeRoute = require("./router/node");
const lineRouter = require("./router/line");
const cylinderRouter = require("./router/cylinder");
const pointRoute = require("./router/point");
const curveRoute = require("./router/curve");
const polygonRoute = require("./router/polygon");
const prismRoute = require("./router/prism");



// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    });

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/face", faceRoute);
app.use("/v1/node", nodeRoute);
app.use("/v1/line", lineRouter);
app.use("/v1/point", pointRoute);
app.use("/v1/cylinder", cylinderRouter);
app.use("/v1/curve", curveRoute);
app.use("/v1/polygon", polygonRoute);
app.use("/v1/prism", prismRoute);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
