const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import the Contact model

const verifyRecaptcha = require('../utils/recaptcha');

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message, recaptchaToken } = req.body;

        // Verify Recaptcha
        const recaptchaResult = await verifyRecaptcha(recaptchaToken);
        if (!recaptchaResult.success) {
            return res.status(400).json({ msg: recaptchaResult.message });
        }

        // Basic validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Create new contact message
        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });

        const savedContact = await newContact.save();

        res.status(201).json({
            msg: 'Message sent successfully',
            contact: savedContact
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
