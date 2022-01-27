const { User, Book, Subscription } = require("../models/user");
const router = require("express").Router();

//===================================== add one subscription ======================================//
router.post("/:id/:title", async (req, res) => {
  const desiredbook = await Book.findOne({
    where: { title: req.body.title },
  });
  const subscription = await Subscription.create({
    user_id: req.params.id,
    book_id: desiredbook.id,
    book_title: desiredbook.title,
    book_author: desiredbook.author,
  });
  res.status(201).json({ subscription });
});

//===================================== find all subscriptions  ======================================//
router.get("/:id", async (req, res) => {
  const allsubs = await Subscription.findAll({
    where: { user_id: req.params.id },
  });
  res.status(200).json(allsubs);
});

//===================================== delete one subscription ======================================//
router.delete("/:id/:bookid", async (req, res) => {
  await Subscription.destroy({
    where: { book_id: req.params.bookid },
  });

  res.status(200).json({ msg: "done" });
});

module.exports = router;
