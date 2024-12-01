const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const qrRoutes = require('./routes/qr');
const franchiseRoutes = require('./routes/franchise');

dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/qr', qrRoutes);

app.use('/', franchiseRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Test Route for MongoDB
app.get('/api/test-db', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.status(200).json({ message: 'Database connected!', collections });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    .on('error', (err) => {
        console.error('Failed to start server:', err.message);
    });

