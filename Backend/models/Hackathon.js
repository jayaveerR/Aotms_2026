const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String },
    mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], required: true },
    date: { type: String, required: true },
    duration: { type: String, required: true },
    bannerUrl: { type: String },
    thumbnailUrl: { type: String },
    logoUrl: { type: String },
    description: { type: String, required: true },
    eligibility: { type: String },
    teamSize: { type: String },
    level: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    registrationStatus: { type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN' },
    showRegisterButton: { type: Boolean, default: true },
    whatYouWillLearn: [{ type: String }],
    themes: [{ type: String }],
    challengeOverview: [{ type: String }],
    rewards: [mongoose.Schema.Types.Mixed],
    eventDetails: { type: Object },
    importantDates: [{
        event: { type: String },
        date: { type: String }
    }],
    registrationLink: { type: String },
    buttonText: { type: String, default: "winners" },
    type: { type: String, default: "hackathon" }
}, { timestamps: true });

module.exports = mongoose.model('Hackathon', hackathonSchema);
