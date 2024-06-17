const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Database connection configuration
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Sumit@2659',
  database: 'vinit',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define the route for user registration
app.post('/register', (req, res) => {
  const { name, username, email, password } = req.body;

  // Insert user data into the database
  const query = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, username, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting user data:', err);
      res.status(500).send('Error inserting user data');
      return;
    }
    console.log('User registered successfully');
    res.send('Registration successful');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
