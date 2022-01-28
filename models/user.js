const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../connection");
const { setLower, firstUpper } = require("./modelHelpers");

//User schema, table of users with passwords
const User = connection.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("name");
        return firstUpper(rawValue);
      },
      set(value) {
        this.setDataValue("name", setLower(value));
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { indexed: [{ unique: true, fields: ["name"] }] }
);
//Book schema, table of books with passwords
const Book = connection.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("title");
        return firstUpper(rawValue);
      },
      set(value) {
        this.setDataValue("title", setLower(value));
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { indexed: [{ unique: true, fields: ["title"] }] }
);
//User id, and book id?
const Subscription = connection.define(
  "Subscription",
  {
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { indexed: [{ unique: true, fields: ["book_id", "user_id"] }] }
);

module.exports = { User, Book, Subscription };
