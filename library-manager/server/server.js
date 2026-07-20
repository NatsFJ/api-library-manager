const express = require ("express");
const app = express();
app.listen(3000);


app.get("/books", (req, res) => {
    res.send("Lista de livros");
});