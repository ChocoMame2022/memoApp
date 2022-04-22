const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root2022',
    port: 3308,
    database: 'memo_app' /* あらかじめdatabaseを作成しておくこと */
});

connection.connect( (err) => {
    console.log('Connection start!');
    if( err ) throw err;
    console.log('接続完了');
//    connection.query('CREATE TABLE booklog(')
});
  
app.get('/', (req, res) => {
    console.log("Hello!");
    res.render('top.ejs');
});

app.get('/index', (req, res) => {
    connection.query(
      'SELECT * FROM items',
      (error, results) => {
        res.render('index.ejs', {items: results});
      }
    );
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});
  
app.post('/create', (req, res) => {
    connection.query(
      'INSERT INTO items (name) VALUES (?)',
      [req.body.itemName],
      (error, results) => {
        res.redirect('/index');
      }
    );
});
  
app.post('/delete/:id', (req, res) => {
    connection.query(
      'DELETE FROM items WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.redirect('/index');
      }
    );
});
  
app.get('/edit/:id', (req, res) => {
    connection.query(
      'SELECT * FROM items WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.render('edit.ejs', {item: results[0]});
      }
    );
});
  
app.post('/update/:id', (req, res) => {
    // 選択されたメモを更新する処理を書いてください
    connection.query(
      'UPDATE items SET name=? WHERE id=?',
      [req.body.itemName, req.params.id],
      (error, results) => {
        res.redirect('/index');
      }
    );
});
  
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
