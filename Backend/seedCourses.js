const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Course = require('./models/Course');

const courses = [
    {
        id: 1,
        slug: "full-stack-development",
        title: "Full Stack Development",
        category: "Web Development",
        image: "/images/courses/fullstack.jpg",
        description: "Master both frontend and backend development with MERN stack",
        fullDescription: "Comprehensive full stack development course covering MongoDB, Express.js, React, and Node.js. Build production-ready web applications from scratch.",
        duration: "6 Months",
        level: "Beginner to Advanced",
        trainer: "Industry Experts",
        price: "₹45,000",
        originalPrice: "₹60,000",
        rating: 4.9,
        themeColor: "#0EA5E9"
    },
    {
        id: 2,
        slug: "ai-machine-learning",
        title: "AI & Machine Learning",
        category: "Artificial Intelligence",
        image: "/images/courses/ai-ml.jpg",
        description: "Learn AI, ML, Deep Learning, and Neural Networks with hands-on projects",
        fullDescription: "Comprehensive AI and Machine Learning course covering Python, TensorFlow, PyTorch, and real-world AI applications. Build intelligent systems and predictive models.",
        duration: "6 Months",
        level: "Intermediate to Advanced",
        trainer: "AI Specialists",
        price: "₹50,000",
        originalPrice: "₹70,000",
        rating: 4.9,
        themeColor: "#8B5CF6"
    },
    {
        id: 3,
        slug: "data-science",
        title: "Data Science & Analytics",
        category: "Data Science",
        image: "/images/courses/data-science.jpg",
        description: "Master data analysis, visualization, and machine learning with Python",
        fullDescription: "Complete data science bootcamp covering Python, Pandas, NumPy, Matplotlib, Seaborn, and machine learning algorithms. Work on real-world datasets.",
        duration: "5 Months",
        level: "Beginner to Advanced",
        trainer: "Data Scientists",
        price: "₹48,000",
        originalPrice: "₹65,000",
        rating: 4.8,
        themeColor: "#10B981"
    },
    {
        id: 4,
        slug: "cloud-computing-devops",
        title: "Cloud Computing & DevOps",
        category: "Cloud & DevOps",
        image: "/images/courses/cloud-devops.jpg",
        description: "Master AWS, Azure, Docker, Kubernetes, and CI/CD pipelines",
        fullDescription: "Comprehensive cloud and DevOps training covering AWS, Azure, Docker, Kubernetes, Jenkins, and modern deployment practices.",
        duration: "4 Months",
        level: "Intermediate",
        trainer: "Cloud Architects",
        price: "₹42,000",
        originalPrice: "₹58,000",
        rating: 4.7,
        themeColor: "#F59E0B"
    },
    {
        id: 5,
        slug: "python-programming",
        title: "Python Programming",
        category: "Programming",
        image: "/images/courses/python.jpg",
        description: "Learn Python from basics to advanced with real-world applications",
        fullDescription: "Complete Python programming course covering fundamentals, OOP, web development, data analysis, and automation.",
        duration: "3 Months",
        level: "Beginner to Intermediate",
        trainer: "Python Experts",
        price: "₹25,000",
        originalPrice: "₹35,000",
        rating: 4.8,
        themeColor: "#3B82F6"
    },
    {
        id: 6,
        slug: "digital-marketing",
        title: "Digital Marketing",
        category: "Marketing",
        image: "/images/courses/digital-marketing.jpg",
        description: "Master SEO, SEM, Social Media Marketing, and Content Strategy",
        fullDescription: "Comprehensive digital marketing course covering SEO, Google Ads, Facebook Ads, content marketing, and analytics.",
        duration: "3 Months",
        level: "Beginner to Advanced",
        trainer: "Marketing Professionals",
        price: "₹30,000",
        originalPrice: "₹45,000",
        rating: 4.7,
        themeColor: "#EC4899"
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB Connected');

        // Clear existing courses
        await Course.deleteMany({});
        console.log('🗑️  Cleared existing courses');

        // Insert new courses
        await Course.insertMany(courses);
        console.log('✅ Successfully seeded', courses.length, 'courses');

        // Display seeded courses
        console.log('\n📚 Seeded Courses:');
        courses.forEach(course => {
            console.log(`  - ${course.title} (${course.slug})`);
        });

        console.log('\n✨ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
