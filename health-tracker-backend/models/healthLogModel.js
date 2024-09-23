const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    weight: { type: Number },
    exercise: { type: String },
    sleep: { type: Number }, // in hours
    mood: { type: String },
    calories: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HealthLog', healthLogSchema);
