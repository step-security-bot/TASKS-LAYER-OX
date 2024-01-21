// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blockchainRoutes = require('./routes/blockchainRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/blockchainMonitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/api', blockchainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
