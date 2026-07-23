import client from "./config/database.js";
import express from "express";
const app = express();
app.listen(3000);
console.log("server is running on port 3000");
app.use(express.json());

// Get - Cadastrar Livros
app.get("/books", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM books");
        res.json(result.rows);
    }
    catch (error) {
        console.log("Database connection failed");
        res.status(500).json({ mensagem: "Erro" });
    }
});


app.post("/books", async (req, res) => {
    const { title, author } = req.body;
    await client.query("INSERT INTO books (title, author) VALUES ($1, $2)", [title, author]);
    res.status(201).json({
        mensagem: "Book successfully registered"
    })
});
