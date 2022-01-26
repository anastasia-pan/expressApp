require("dotenv").config();

const express = require("express");
const passport = require("passport");
const cors = require("cors");

const connection = require("./connection");

const { User, Book, Subscription } = require("./models/user");
const userRouter = require("./routes/user");
const {
  registerStrategy,
  loginStrategy,
  verifyStrategy,
} = require("./middleware/auth");

const app = express();

app.use(express.json());
// app.use(passport.initialize());

//cors provides a way for backend and front ent to run from the same port and therefore
//be single-origin (npm install cors)
app.use(cors());

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
  Book.sync({ alter: true });
  Subscription.sync({ alter: true });
  console.log("App is online");
});
