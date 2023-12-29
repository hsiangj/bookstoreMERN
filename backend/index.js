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

// Route to get all books 
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to get one book by id
app.get('/books/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to update a book
app.put('/books/:id', async (req, res) => {
  try {
    if(
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) 
    return res.status(400).send({
      message: 'Send all required fields: title, author, publishYear',
    })
    
    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if(!result) return res.status(404).json({ message: 'Book not found'});
    return res.status(200).send({ message: 'Book updated successfully', result})

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const result = await Book.findByIdAndDelete(id);
    if(!result) return res.status(404).json({ message: 'Book not found'});

    return res.status(200).send({ message: 'Book deleted successfully'});
     
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
})

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