const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const qrRoutes = require('/routes/qr');
app.use('/api/qr', qrRoutes);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes Placeholder
app.get('/', (req, res) => res.send('API is working!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
