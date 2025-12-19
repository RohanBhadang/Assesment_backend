const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const clients = require('./routes/clients');
const projects = require('./routes/projects');
const contacts = require('./routes/contacts');
const subscribers = require('./routes/subscribers');
const upload = require('./routes/upload');

app.use('/api/clients', clients);
app.use('/api/projects', projects);
app.use('/api/contacts', contacts);
app.use('/api/subscribers', subscribers);
app.use('/api/upload', upload);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flipr';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

