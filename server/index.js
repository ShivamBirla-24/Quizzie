const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

//importing register and login route
const authRoutes = require("./routes/auth");

//
const quizRoutes = require("./routes/quiz");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mouting login and register routes
app.use("/api/auth", authRoutes);

app.use("/api/quiz", quizRoutes);

//Checking Health Route
app.get("/", (req, res) => {
  res.json({
    message: "Checking Health Route",
  });
});

const port = process.env.PORT || 3000;

//Listening the port and conecting the Mongo DB as well
app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Mongo Db connected");
      console.log(`Server running successfully at port ${port}`);
    })
    .catch(() => {
      console.log("Error in connecting Mongo Db");
    });
});
