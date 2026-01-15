const express = require('express');
const router = express.Router();
const HackathonWinner = require('../models/HackathonWinner');

// Get winners for a specific event
router.get('/:eventId', async (req, res) => {
    try {
        const winners = await HackathonWinner.findOne({ eventId: req.params.eventId });
        res.json(winners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed winners
router.post('/seed', async (req, res) => {
    const dummyWinners = [
        {
            eventId: "h1",
            eventName: "Global UI/UX Design Hackathon",
            winners: [
                {
                    rank: 1,
                    teamName: "Pixel Pioneers",
                    collegeName: "MIT Institute of Design",
                    members: ["Alice", "Bob"],
                    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60"
                },
                {
                    rank: 2,
                    teamName: "Design Dynamos",
                    collegeName: "National Institute of Design",
                    members: ["Charlie", "Diana"],
                    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60"
                },
                {
                    rank: 3,
                    teamName: "Creative Coders",
                    collegeName: "IIT Bombay",
                    members: ["Eve", "Frank"],
                    imageUrl: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&auto=format&fit=crop&q=60"
                }
            ]
        },
        {
            eventId: "h2",
            eventName: "Full-Stack Innovation Hack",
            winners: [
                {
                    rank: 1,
                    teamName: "Code Crusaders",
                    collegeName: "IIT Delhi",
                    members: ["Rohan", "Suresh", "Priya"],
                    imageUrl: "https://images.unsplash.com/photo-1504384308090-c54be3855833?w=500&auto=format&fit=crop&q=60"
                },
                {
                    rank: 2,
                    teamName: "MERN Stack Masters",
                    collegeName: "BITS Pilani",
                    members: ["Ananya", "Vikram"],
                    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60"
                }
            ]
        }
    ];

    try {
        await HackathonWinner.deleteMany({});
        const newWinners = await HackathonWinner.insertMany(dummyWinners);
        res.json(newWinners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
