const path = require('path');
const express = require('express');
const routes = require('./backend/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', () => {
  console.log('Failed connection to MongoDB');
});

mongoose.connect(process.env.MONGODB_URI);

const app = express();

// This line makes the build folder publicly available.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.use(bodyParser.json());
app.use('/db', routes);

app.listen(port, () => {
  console.log(`Server for OVO App listening on port ${port}!!`);
});
