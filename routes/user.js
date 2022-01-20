const router = require("express").Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
// const hash = require("../hash.js");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const session = { session: false };

//===================================== verify user ======================================//

const profile = (req, res, next) => {
  res.status(200).json({
    message: "profile",
    user: req.user,
    token: req.query.secret_token,
  });
};

router.get("/", passport.authenticate("jwt", session), profile);

//===================================== register user ======================================//

//takes the authenticated req and returns a response
const register = async (req, res, next) => {
  try {
    req.user.name
      ? res.status(201).json({ msg: "user registered", user: req.user })
      : res.status(401).json({ msg: "User already exists" });
  } catch (error) {}
};

// create a user
//http://localhost/user/createuser
//register router - authenticate using registerStrategy (name, 'register) and
//passes on the register function define above
router.post(
  "/registeruser",
  passport.authenticate("register", session),
  register
);

//================================================= login =====================================================//
const login = async (req, res, next) => {
  passport.authenticate("login", (error, user) => {
    try {
      if (error) {
        res.status(500).json({ message: "Internal Server Error" });
      } else if (!user) {
        res.status(401).json(info);
      } else {
        const loginFn = (error) => {
          if (error) {
            return next(error);
          } else {
            const userData = { id: user.id, name: user.name };
            const data = {
              user,
              token: jwt.sign({ user: userData }, process.env.SECRET_KEY),
            };
            res.status(200).json(data);
          }
        };
        //req comes from express, login comes from passport, adding constructors using prototype methodology
        //options and callback
        req.login(user, session, loginFn);
      }
    } catch (error) {
      return next(error);
    }
  })(req, res, next); //IFFY Immediately invoked function expression
};

router.post("/userlogin", login);

//=============================================== tbd ============================================//

// get all users
router.get("/getallusers", async (req, res) => {
  const allUsers = await User.findAll({});
  res.status(200).json({ msg: "worked", data: allUsers });
});

// // OLD CREATE USER
// router.post("/", async (req, res) => {
//   const user = await User.create({
//     name: req.body.name,
//     passwordHash: req.body.password,
//   });
//   res
//     .status(201)
//     .json({ msg: `${req.body.name} has been added to the database` });
// });

// delete one user
router.delete("/:name", async (req, res) => {
  const user = await User.destroy({ name: req.body.name });
  res
    .status(200)
    .json({ msg: `${req.body.name} has been deleted from the database` });
});

// get a single user
router.get("/:id", async (req, res) => {
  const user = await User.findOne({ where: { name: req.body.id } });
  res.status(200).json({ msg: `Here is ${req.body.name}, ${req.body.id}` });
});

// update a single user
router.put("/:id", async (req, res) => {
  const user = await User.findOne({ name: req.body.id });

  //alter id?
  res.status(200).json({ msg: "worked" });
});

// delete all users
router.delete("/:id", async (req, res) => {
  res.status(200).json({ msg: "worked" });
});

module.exports = router;
