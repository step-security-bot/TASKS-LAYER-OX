// routes/blockchainRoutes.js
const express = require('express');
const router = express.Router();
const Blockchain = require('../models/Blockchain');
const axios = require('axios');

// Create a new blockchain
router.post('/blockchains', async (req, res) => {
  try {
    const blockchain = new Blockchain(req.body);
    await blockchain.save();
    res.status(201).json(blockchain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blockchains
router.get('/blockchains', async (req, res) => {
  try {
    const blockchains = await Blockchain.find();
    res.json(blockchains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific blockchain by ID
router.get('/blockchains/:id', async (req, res) => {
  try {
    const blockchain = await Blockchain.findById(req.params.id);
    if (!blockchain) {
      return res.status(404).json({ error: 'Blockchain not found' });
    }
    res.json(blockchain);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blockchain by ID
router.put('/blockchains/:id', async (req, res) => {
  try {
    const blockchain = await Blockchain.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blockchain) {
      return res.status(404).json({ error: 'Blockchain not found' });
    }

    res.json(blockchain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a blockchain by ID
router.delete('/blockchains/:id', async (req, res) => {
  try {
    const blockchain = await Blockchain.findByIdAndDelete(req.params.id);
    if (!blockchain) {
      return res.status(404).json({ error: 'Blockchain not found' });
    }
    res.json(blockchain);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Status endpoint
router.get('/status', async (req, res) => {
  try {
    const blockchains = await Blockchain.find();
    const statusInfo = [];

    for (const blockchain of blockchains) {
      try {
        const response = await axios.post(blockchain.rpcEndpoint, {
          jsonrpc: '2.0',
          method: 'getblockchaininfo',
          id: 1,
        });

        const blockHeight = response.data.result.blocks;
        const status = { running: true, blockHeight };

        statusInfo.push({ name: blockchain.name, status });
      } catch (error) {
        // Handle RPC request errors
        const status = { running: false, blockHeight: 0 };
        statusInfo.push({ name: blockchain.name, status });
      }
    }

    res.json({ success: true, result: statusInfo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
