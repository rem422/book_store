import express from 'express';
import { Book } from "../models/bookModel.js"

const router = express.Router();


// Route for saving a new Book in the database
router.post("/", async(req, res) => {
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
router.get("/", async(req, res) => {
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
router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
});

//Route for Updating a Books from database
router.put("/:id", async(req, res) => {
    try {
        if (!req.body.cover || !req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                msg: 'Fill all the required fileds: cover, title, author, publishYear',
            });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        
        if(!result) {
            return res.status(404).json({msg: "Book not found"});
        }

        return res.status(200).send({msg: "Book updated successfully"});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({msg: error.message});
    }
});

//Route for Deleting a Books from database
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        
        if(!result) {
            return res.status(404).json({msg: "Book not found"});
        }

        return res.status(200).send({msg: "Book deleted successfully"});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({msg: error.message});
    }
});

export default router;