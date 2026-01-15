const mongoose = require('mongoose');

const weeklyEventSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String },
    mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], required: true },
    date: { type: String, required: true },
    duration: { type: String, required: true },
    bannerUrl: { type: String },
    thumbnailUrl: { type: String },
    description: { type: String, required: true },
    eligibility: { type: String },
    level: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    registrationStatus: { type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN' },
    showRegisterButton: { type: Boolean, default: true },
    whatYouWillLearn: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('WeeklyActivity', weeklyEventSchema);
