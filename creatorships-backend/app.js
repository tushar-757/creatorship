// index.js
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const { BusinessRoute, CreatorRoute, PartnershipRoute, UserRoute } = require('./routes');
require('dotenv').config();

app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/business', BusinessRoute);
app.use('/api/creator', CreatorRoute);
app.use('/api/partnership', PartnershipRoute);
app.use('/api/user', UserRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
