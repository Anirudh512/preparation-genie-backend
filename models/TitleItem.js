const mongoose = require('mongoose');

const TitleItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    colorType: { type: String, enum: ['blue', 'gold', 'red'], default: 'blue' } // Corresponds to rarity
});

module.exports = mongoose.model('TitleItem', TitleItemSchema);
