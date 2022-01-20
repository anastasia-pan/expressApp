require("dotenv").config();

const express = require("express");
const passport = require("passport");

const connection = require("./connection");

const User = require("./models/user");
const userRouter = require("./routes/user");
const {
  registerStrategy,
  loginStrategy,
  verifyStrategy,
} = require("./middleware/auth");

const app = express();

app.use(express.json());
// app.use(passport.initialize());

//provides routes
app.use("/user", userRouter);

//require string and registersstrategy
passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  connection.authenticate();
  User.sync({ alter: true });
  console.log("App is online");
});
