import express from 'express';
// import cors from 'cors';

const app = express();

// app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).send({msg: "Welcome to the Backend world!"})
})


app.listen(PORT, () => {
    console.log(`server is running on port:http://localhost:${PORT}`);
    
})