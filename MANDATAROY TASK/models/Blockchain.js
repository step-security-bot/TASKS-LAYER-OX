// models/Blockchain.js
const mongoose = require('mongoose');

const blockchainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rpcEndpoint: { type: String, required: true },
  isRunning: { type: Boolean, default: false },
  blockHeight: { type: Number, default: 0 },
});

const Blockchain = mongoose.model('Blockchain', blockchainSchema);

module.exports = Blockchain;
