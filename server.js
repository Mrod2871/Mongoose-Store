const express = require('express');
const mongoose = require("mongoose")
const products = require('./models/products')
const app = express();
require('dotenv').config();

mongoose.connect('mongodb+srv://Mario2603:Mrod2871@cluster0.wnbmeij.mongodb.net/?retryWrites=true&w=majority');

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: false }));

//Index /Get

//New /Get

//Destroy /Delete

//Update /Put

//Create / Post

//Edit /Get

// Show /Get

//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));