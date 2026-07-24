import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import client from "./config/database.js";
import express from "express";
const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Manager API",
      version: "1.0.0",
      description:
        "API REST para gerenciamento de livros desenvolvida com Node.js, Express e PostgreSQL.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
      {
        url: "https://api-library-manager-0h69.onrender.com",
        description: "Servidor Produção",
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Get - Buscar Livros
/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Lista todos os livros
 *     description: Retorna todos os livros cadastrados no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Código Limpo
 *                   author:
 *                     type: string
 *                     example: Robert C. Martin
 *       500:
 *         description: Erro interno do servidor.
 */
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
/**
 * @openapi
 * /books:
 *   post:
 *     tags:
 *       - Livros
 *     summary: Cadastra um novo livro
 *     description: Adiciona um novo livro ao banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: Dom Casmurro
 *               author:
 *                 type: string
 *                 example: Machado de Assis
 *     responses:
 *       201:
 *         description: Livro cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Book successfully registered
 *       500:
 *         description: Erro interno do servidor.
 */
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
/**
 * @openapi
 * /books/{id}:
 *   put:
 *     tags:
 *       - Livros
 *     summary: Atualiza um livro
 *     description: Atualiza o título e o autor de um livro existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: O Hobbit
 *               author:
 *                 type: string
 *                 example: J. R. R. Tolkien
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso.
 *       404:
 *         description: Livro não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
app.put("/books/:id", async (req, res) => {
  try {
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
/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Livros
 *     summary: Remove um livro
 *     description: Exclui um livro do banco de dados pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro a ser removido.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Livro removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Book deleted successfully
 *       404:
 *         description: Livro não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
