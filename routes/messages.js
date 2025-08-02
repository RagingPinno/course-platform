const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Hämta chattmeddelanden
router.get("/:id/messages", async (req, res) => {
  const messages = await Message.find({ packageId: req.params.id }).populate("userId", "name");
  res.send(messages);
});

// Skicka chattmeddelande
router.post("/:id/messages", async (req, res) => {
  const { content, userId } = req.body;
  const newMessage = await Message.create({ packageId: req.params.id, userId, content });
  res.send(newMessage);
});

module.exports = router;