require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./connection/connection');
const mainRouter = require('./routers/index');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up CORS options
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Use the main router
app.use('/api', mainRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
