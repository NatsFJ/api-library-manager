import client from "./config/database.js";
import express from "express";
const app = express();
app.listen(3000);
console.log("server is running on port 3000");
app.use(express.json());

// Get - Buscar Livros
app.get("/books", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (error) {
    console.log("Database connection failed");
    res.status(500).json({mensagem: "Database Error",
    });
  }
});

// Post - Cadastrar Livros
app.post("/books", async (req, res) => {
  try {
    const { title, author } = req.body;
    await client.query("INSERT INTO books (title, author) VALUES ($1, $2)", [
      title,
      author,
    ]);
    res.status(201).json({
      mensagem: "Book successfully registered",
    });
  } catch (error) {
    console.log("Failed to register book", error);
    res.status(500).json({ mensagem: "Database Error" });
  }
});

// Put - Editar Livros
app.put("/books/:id", async (req, res) => {
  try {
    z;
    const { id } = req.params;
    const { title, author } = req.body;
    const result = await client.query(
      `UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *`,
      [title, author, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Book not Found",
      });
    }
    res.status(200).json({
      mensagem: "Edited sucessfully book",
      book: result.rows[0],
    });
  } catch (error) {
    console.log("The book's editing failed", error);
    res.status(500).json({ mensagem: "Database Error" });
  }
});

// Delete - Deletar Livros
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "DELETE FROM books WHERE id = $1 RETURNING*",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Book not found",
      });
    }
    res.status(200).json({
      mensagem: "Book deleted successfully",
      book: result.rows[0],
    });
  } catch (error) {
    console.log("Failed to delete book", error);
    res.status(500).json({ mensagem: "Database Error" });
  }
});
