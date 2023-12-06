require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");

const app = express();
const mongoDB = process.env.mongoDBURL;

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(234).send('Welcome to bookstore')
})


// Route to save a new book
app.post('/books', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.send(400).send({
        message: 'Provide all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

mongoose 
  .connect(mongoDB)
  .then(() => {
  console.log('App connected to database');

  //run server only if DB connection is successful
  app.listen(3001, () => {
    console.log(`App is listening to port: 3001`);
  })
 
  })
  .catch((err) => {
  console.log(err);
  })