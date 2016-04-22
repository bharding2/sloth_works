const mongoose = require('mongoose');

var slothSchema = new mongoose.Schema({
  name: String,
  toes: { type: Number, default: 3 },
  strength: { type: Number, default: 50 }
});

module.exports = mongoose.model('Sloth', slothSchema);
