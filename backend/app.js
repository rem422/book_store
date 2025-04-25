import express from 'express';
import  { PORT, mongoDBURL }  from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'
// import cors from 'cors';

const app = express();
// Middleware for parsing request body
app.use(express.json());


app.get("/", (req, res) => {
    console.log(req);
    res.status(200).send({msg: "Welcome to the Backend world!"});
});

// Route for save a new Book
app.post("/books", async(req, res) => {
    try {
        if (!req.body.cover || !req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                msg: 'Fill all the required fileds: cover, title, author, publishYear',
            });
        }
        const newBook = {
            cover: req.body.cover,
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({msg: error.message});
    }
});

//Route for Get All Books from database
app.get("/books", async(req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
});

//Route for Get a single Books from database by id
app.get("/books/:id", async(req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
});




mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`server is running on port:http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
        
    });