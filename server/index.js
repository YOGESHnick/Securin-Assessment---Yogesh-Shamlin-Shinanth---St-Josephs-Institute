const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// M O N G O   DB
mongoose.connect('mongodb://localhost:27017/nvd_cves')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// R O U T E S
// one time only, to store in local db. DON'T SEND REQUEST TO THIS ENDPOINT!!!!!
const fetchCvesRoute = require('./routes/fetchCves');

// Working route
const cvesRoute = require('./routes/cves');

app.use('/api', fetchCvesRoute);
app.use('/api', cvesRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
