import express from "express";
const app = express();
app.listen(3000);
console.log("server is running on port 3000");


app.get("/books", (req, res) => {
    const books = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald"
        },
        {
            id: 2,
            title: "Antifragil",
            author: "Nassim Nicholas Taleb"
        },
        {
            id:3,
            title: "A arte da guerra",
            author: "Sun Tzu"
        }

    ]

    res.json(books);


});