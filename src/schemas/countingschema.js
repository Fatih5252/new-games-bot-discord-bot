const mongoose = require('mongoose');

const countingSchema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Count: Number,
    MaxCount: Number,
    LastUserId: {
        type: String,
        default: null
    },
    AlternateTurn: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('counting', countingSchema);
