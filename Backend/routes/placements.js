const express = require('express');
const router = express.Router();
const Placement = require('../models/Placement');

// Get all student placements
router.get('/students', async (req, res) => {
    try {
        const placements = await Placement.find({ type: 'student' });
        res.json(placements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all detailed placements
router.get('/detailed', async (req, res) => {
    try {
        const placements = await Placement.find({ type: 'detailed' });
        res.json(placements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Placements
router.post('/seed', async (req, res) => {
    const studentPlacementsData = [
        { type: 'student', name: "Sangeetha Detne", jobTitle: "Big Data Developer", companies: ["Walmart"], image: "https://ui-avatars.com/api/?name=Sangeetha+Detne&background=random&color=fff&size=128" },
        { type: 'student', name: "Sravani Pilli", jobTitle: "Java Full Stack Developer", companies: ["USAA"], image: "https://ui-avatars.com/api/?name=Sravani+Pilli&background=random&color=fff&size=128" },
        { type: 'student', name: "Bharathy Govindaswamy", jobTitle: "Hadoop Developer", companies: ["TIAA"], image: "https://ui-avatars.com/api/?name=Bharathy+Govindaswamy&background=random&color=fff&size=128" },
        { type: 'student', name: "Nimitha Srireddy", jobTitle: "Java Developer", companies: ["AT&T"], image: "https://ui-avatars.com/api/?name=Nimitha+Srireddy&background=random&color=fff&size=128" },
        { type: 'student', name: "Mahesh Babu Pasupulati", jobTitle: "Data Analyst", companies: ["NMIC"], image: "https://ui-avatars.com/api/?name=Mahesh+Babu+Pasupulati&background=random&color=fff&size=128" },
        { type: 'student', name: "Hima Bindu Ande", jobTitle: "Java Full Stack Developer", companies: ["American Express"], image: "https://ui-avatars.com/api/?name=Hima+Bindu+Ande&background=random&color=fff&size=128" },
        { type: 'student', name: "Avishma Bhimarasetty", jobTitle: "Java UI Developer", companies: ["I Credit Works"], image: "https://ui-avatars.com/api/?name=Avishma+Bhimarasetty&background=random&color=fff&size=128" },
        { type: 'student', name: "Bindu Malini Kagita", jobTitle: "Java Developer", companies: ["PayPal"], image: "https://ui-avatars.com/api/?name=Bindu+Malini+Kagita&background=random&color=fff&size=128" },
        { type: 'student', name: "Satya Sriprada Cherukupalli", jobTitle: "Java Full Stack Developer", companies: ["Cardinal Health"], image: "https://ui-avatars.com/api/?name=Satya+Sriprada+Cherukupalli&background=random&color=fff&size=128" },
        { type: 'student', name: "Dona Chakraborty", jobTitle: "ETL Tester", companies: ["Southern Wines"], image: "https://ui-avatars.com/api/?name=Dona+Chakraborty&background=random&color=fff&size=128" },
        { type: 'student', name: "Udayini Vidiyala", jobTitle: "Java Engineer", companies: ["State Farm"], image: "https://ui-avatars.com/api/?name=Udayini+Vidiyala&background=random&color=fff&size=128" },
        { type: 'student', name: "Bhavana Penumetcha", jobTitle: "Front End Developer", companies: ["BCBS"], image: "https://ui-avatars.com/api/?name=Bhavana+Penumetcha&background=random&color=fff&size=128" },
        { type: 'student', name: "Kalpana Bandi", jobTitle: ".NET Developer", companies: ["Pfizer"], image: "https://ui-avatars.com/api/?name=Kalpana+Bandi&background=random&color=fff&size=128" },
        { type: 'student', name: "Sirisha Sirigiri", jobTitle: "Java UI Developer", companies: ["United Airlines"], image: "https://ui-avatars.com/api/?name=Sirisha+Sirigiri&background=random&color=fff&size=128" },
        { type: 'student', name: "Niharika Vajje", jobTitle: "Business System Analyst", companies: ["Verizon"], image: "https://ui-avatars.com/api/?name=Niharika+Vajje&background=random&color=fff&size=128" },
        { type: 'student', name: "Kunal Tadkamadla", jobTitle: "Angular / NodeJS Developer", companies: ["First Republic Bank"], image: "https://ui-avatars.com/api/?name=Kunal+Tadkamadla&background=random&color=fff&size=128" },
        { type: 'student', name: "Ramakrishna Kotlo", jobTitle: "Informatica MDM Developer", companies: ["Blue Yonder"], image: "https://ui-avatars.com/api/?name=Ramakrishna+Kotlo&background=random&color=fff&size=128" },
        { type: 'student', name: "Suman Reddy Mallipeddi", jobTitle: "Java Full Stack Developer", companies: ["T-Mobile"], image: "https://ui-avatars.com/api/?name=Suman+Reddy+Mallipeddi&background=random&color=fff&size=128" },
        { type: 'student', name: "Satya Vani Mamidi", jobTitle: "Machine Learning Data Scientist", companies: ["Apple"], image: "https://ui-avatars.com/api/?name=Satya+Vani+Mamidi&background=random&color=fff&size=128" },
        { type: 'student', name: "Medha Chugh", jobTitle: "Project Manager", companies: ["NYS – Office of Mental Health"], image: "https://ui-avatars.com/api/?name=Medha+Chugh&background=random&color=fff&size=128" }
    ];

    try {
        await Placement.deleteMany({});
        await Placement.insertMany(studentPlacementsData);
        res.json({ message: 'Placements seeded successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
