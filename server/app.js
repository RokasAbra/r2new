const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "books_shoop",
});


//Books Crud

//Create
app.post("/admin/book/", (req, res) => {
    const sql = `
    INSERT INTO book
    (genre)
    VALUES (?)
    `;
    con.query(sql, [req.body.genre], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new Cat was created', type: 'success' } });
    });
});

app.get("/admin/book/", (req, res) => {
    const sql = `
  SELECT *
  FROM book
  ORDER BY genre
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/admin/book/:id", (req, res) => {
    const sql = `
    DELETE FROM book
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, book gone', type: 'success' } });
    });
});

app.put("/admin/book/:id", (req, res) => {
    const sql = `
    UPDATE book
    SET genre = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.genre, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, book updated. Now it is as new', type: 'success' } });
    });
});

//About books

//Read
app.post("/admin/books_info", (req, res) => {
    const sql = `
    INSERT INTO books_info
    (title, price, in_stock, book_id, photo)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.title, req.body.price, req.body.inStock, req.body.book, req.body.photo], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new and shiny product was created', type: 'success' } });
    });
});

app.get("/admin/books_info", (req, res) => {
    const sql = `
  SELECT ab.id, price, ab.title, b.genre AS book, in_stock, last_update AS lu, photo
  FROM books_info AS ab
  LEFT JOIN book AS b
  ON b.id = ab.book_id
  ORDER BY title
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/admin/books_info/:id", (req, res) => {
    const sql = `
    DELETE FROM books_info
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Books gone', type: 'success' } });
    });
});

//Update
app.put("/admin/books_info/:id", (req, res) => {
    const sql = `
    UPDATE books_info
    SET title = ?, price = ?, last_update = ?, book_id = ?, in_stock = ?, photo = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.title, req.body.price, req.body.lu, req.body.book, req.body.in_stock, req.body.photo, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
    });
});
app.listen(port, () => { 
    console.log(`Bebras klauso porto Nr ${port}`);
});
