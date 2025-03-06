const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/notes', noteRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;