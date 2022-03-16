const mongoose = require('mongoose');
require('dotenv').config();
const mongoDB = process.env.DB_URI;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTOpology: true});
const db = mongoose.connection;

db.on('connected', e => { console.log('DB connected.'); });
db.on('error', console.error.bind(console, 'MongoDB connection error'));