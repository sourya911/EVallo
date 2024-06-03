// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  participants: { type: [String], required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  sessionNotes: { type: String, required: true },
  googleEventId: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);
