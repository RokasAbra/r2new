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

app.listen(port, () => {
    console.log(`Bebras klauso porto Nr ${port}`);
});
