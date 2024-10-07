// Import dependencies
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Check connection to MySQL
db.connect((error) => {
    if (error) return console.log("Error connecting to MySQL:", error);
    console.log("Connected to MySQL with id:", db.threadId);
});

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Question 1
// Define the /patient route
app.get('/patient', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) => {
        if (err) {
            console.log("Error retrieving data:", err);
            return res.status(500).send('Error retrieving data');
        }
        res.render('patient', { results });
    });
});

// Question 2
// Define the /provider route
app.get('/provider', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, (err, results) => {
        if (err) {
            console.log("Error retrieving data:", err);
            return res.status(500).send('Error retrieving data');
        }
        res.render('provider', { results });
    });
});

// Question 3
// Define the /patient/first_name route
app.get('/patient/first_name', (req, res) => {
    const sql = 'SELECT first_name FROM patients';
    db.query(sql, (err, results) => {
        if (err) {
            console.log("Error retrieving data:", err);
            return res.status(500).send('Error retrieving data');
        }
        res.render('patient_first_name', { results });
    });
});

// Question 4
// Define the /provider/specialty route
app.get('/provider/specialty', (req, res) => {
    const sql = 'SELECT provider_specialty FROM providers';
    db.query(sql, (err, results) => {
        if (err) {
            console.log("Error retrieving data:", err);
            return res.status(500).send('Error retrieving data');
        }
        res.render('provider_specialty', { results });
    });
});

// Define the home route
app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
