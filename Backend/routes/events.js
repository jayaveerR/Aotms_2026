const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop');
const Hackathon = require('../models/Hackathon');
const WeeklyActivity = require('../models/WeeklyActivity');

// Get events based on type
router.get('/', async (req, res) => {
    try {
        const { type } = req.query;
        let events = [];

        const processEvents = (evs) => {
            const now = new Date();
            return evs.map(e => {
                const event = e.toObject();
                // Logic: Open if status is OPEN and current date is before/on endDate (if endDate exists)
                const isStatusOpen = event.registrationStatus === 'OPEN';
                const isDateValid = !event.endDate || new Date(event.endDate) >= now;
                event.isRegistrationOpen = isStatusOpen && isDateValid;
                return event;
            });
        };

        if (type === 'workshop') {
            const data = await Workshop.find({});
            events = processEvents(data);
        } else if (type === 'hackathon') {
            const data = await Hackathon.find({});
            events = processEvents(data);
        } else if (type === 'event' || type === 'weekly-activity') {
            const data = await WeeklyActivity.find({});
            events = processEvents(data);
        } else {
            const w = await Workshop.find({});
            const h = await Hackathon.find({});
            const a = await WeeklyActivity.find({});
            events = processEvents([...w, ...h, ...a]);
        }
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
