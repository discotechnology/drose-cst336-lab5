import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "blonze2d5mrbmcgf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "v4e3w6yhr383ikbh",
    password: "t18coasub4oc9hn8",
    database: "s7jmctxlgmkxgwx2",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', async (req, res) => {
    let sql = `SELECT authorId, firstName, lastName 
                FROM q_authors 
                ORDER BY lastName`;
    const [rows] = await pool.query(sql);
    res.render('index',{authors: rows});
});

app.get('/searchByKeyword', async (req, res) => {
    let userKeyword = req.query.keyword;
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM q_quotes
               JOIN q_authors USING (authorId)
               WHERE quote LIKE ?`;
    let params = [`%${userKeyword}%`];
    const [rows] = await pool.query(sql, params);
    console.log("User keyword: " + userKeyword);
    res.render('results', {quotes: rows});
});

app.get('/searchByAuthor', async (req, res) => {
    let userAuthorId = req.query.authorId;
    let sql = `SELECT authorId, firstName, lastName, quote
                FROM q_quotes
                JOIN q_authors USING (authorId)
                WHERE authorId = ?`;
    let params = [userAuthorId];
    const [rows] = await pool.query(sql, params);
    console.log("User author ID: " + userAuthorId);
    res.render('results', {quotes: rows});
});

app.get('/api/author/:authorId', async (req, res) => {
    let authorId = req.params.authorId;
    let sql = `SELECT *
                FROM q_authors
                WHERE authorId = ?`;
    let [rows] = await pool.query(sql, [authorId]);
    res.send(rows);
});

app.get("/dbTest", async(req, res) => {
   try {
        const [rows] = await pool.query(
            "SELECT * FROM q_authors");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error");
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})