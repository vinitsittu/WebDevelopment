
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9001;

app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/fas.html');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users1 (username, email, password) VALUES (?, ?, ?)';
  const values = [username, email, password];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.json({ success: false, error: err.message });
    } else {
      console.log('User registered successfully:', result);
      res.json({ success: true, user: result });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
