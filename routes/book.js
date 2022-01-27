const { User, Book, Subscription } = require("../models/user");
const router = require("express").Router();

//===================================== add book ======================================//
//a route to add a book to books table
router.post("/addbook", async (req, res) => {
  const book = await Book.create({
    title: req.body.title,
    author: req.body.author,
  });
  res.status(200).json({ msg: book });
});

//===================================== get one book ======================================//
router.get("/:title", async (req, res) => {
  const book = await Book.findOne({ where: { title: req.params.title } });
  res.status(200).json(book);
});

// ===============================delete one book ==================================================
router.delete("/:id", async (req, res) => {
  // const user = await User.destroy({ where: { id: req.params.id } });
  const book = await Book.destroy({ where: { id: req.params.id } });

  res
    .status(200)
    .json({ msg: `${req.params.id} has been deleted from the database` });
});
//===================================== find all books ======================================//
router.get("/getall", async (req, res) => {
  const allBooks = await Book.findAll({});
  res.status(200).json(allBooks);
});

module.exports = router;
