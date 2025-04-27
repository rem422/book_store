import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log(req);
    res.status(200).send({msg: "Welcome to the Backend world!"});
});

app.use("/books", booksRoute);

mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`server is running on port: https://book-store-yrvb.onrender.com`);
        });
    })
    .catch((error) => {
        console.log(error);
        
    });