require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");


const app = express();
const mongoDB = process.env.mongoDBURL;

const booksRoutes = require("./routes/booksRoute");

// Middleware for parsing request body
app.use(express.json());
app.use('/books', booksRoutes);

app.get('/', (req, res) => {
  return res.status(234).send('Welcome to bookstore')
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