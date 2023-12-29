const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");


// Route to save a new book
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    if(!book) return res.status(404).json({ message: 'Book not found'});
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to update a book
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;