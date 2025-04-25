import express from 'express';
import  { PORT, mongoDBURL }  from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// // Option 2: Allow Custom Origin
// app.use(cors({
//     origin: "http://localhost:5173/",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));


app.get("/", (req, res) => {
    console.log(req);
    res.status(200).send({msg: "Welcome to the Backend world!"});
});

app.use("/books", booksRoute);

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