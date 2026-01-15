import React from "react";
import {
    SiPython, SiReact, SiNodedotjs, SiAmazonwebservices, SiDocker,
    SiGithub, SiVite, SiPandas, SiNumpy, SiScikitlearn, SiJupyter,
    SiSqlite, SiTableau, SiGooglecloud, SiTerraform,
    SiLinux, SiArduino, SiRaspberrypi,
    SiKalilinux, SiWireshark, SiMetasploit, SiSelenium, SiSpringboot,
    SiHibernate, SiMysql, SiJavascript, SiHtml5, SiCss3, SiDjango,
    SiKubernetes, SiAnsible, SiJenkins, SiPostgresql, SiTensorflow,
    SiPytorch, SiKeras, SiOpencv, SiC, SiIntel,
    SiFigma, SiSketch, SiAdobe, SiInvision, SiMiro,
    SiApachespark, SiApachekafka, SiApacheairflow, SiSnowflake, SiStreamlit,
    SiRedux, SiMui, SiTypescript, SiAngular, SiApachemaven, SiSplunk,
    SiBurpsuite, SiPlotly, SiGraphql, SiMongodb, SiExpress, SiFlask,
    SiBootstrap, SiTailwindcss, SiNotion, SiCanva, SiBehance, SiHotjar
} from "react-icons/si";
import { FaJava, FaDatabase, FaBrain, FaRobot, FaLock, FaChartLine, FaEye, FaTable, FaMicrochip, FaAtom, FaNetworkWired, FaMicrosoft } from "react-icons/fa";
import { Logo } from "../components/ui/logo-carousel";

// Define the structure for tool metadata
export interface ToolMeta {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color: string;
}

export const ToolIcons: Record<string, ToolMeta> = {
    // Programming Languages
    "Python": { icon: SiPython, color: "#3776AB" },
    "Java": { icon: FaJava, color: "#007396" },
    "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
    "TypeScript": { icon: SiTypescript, color: "#3178C6" },
    "C": { icon: SiC, color: "#A8B9CC" },
    "C++": { icon: SiC, color: "#00599C" },
    "HTML5": { icon: SiHtml5, color: "#E34F26" },
    "CSS3": { icon: SiCss3, color: "#1572B6" },
    "SQL": { icon: SiSqlite, color: "#003B57" },

    // Web Frameworks & Libraries
    "React": { icon: SiReact, color: "#61DAFB" },
    "Angular": { icon: SiAngular, color: "#DD0031" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    "Express": { icon: SiExpress, color: "#000000" },
    "Django": { icon: SiDjango, color: "#092E20" },
    "Spring Boot": { icon: SiSpringboot, color: "#6DB33F" },
    "Redux": { icon: SiRedux, color: "#764ABC" },
    "Material UI": { icon: SiMui, color: "#007FFF" },
    "RxJS": { icon: SiJavascript, color: "#B7178C" }, // Fallback to JS icon
    "GraphQL": { icon: SiGraphql, color: "#E10098" },

    // Data Science & AI
    "Pandas": { icon: SiPandas, color: "#150458" },
    "NumPy": { icon: SiNumpy, color: "#013243" },
    "Scikit-Learn": { icon: SiScikitlearn, color: "#F7931E" },
    "Scikit": { icon: SiScikitlearn, color: "#F7931E" }, // Alias
    "TensorFlow": { icon: SiTensorflow, color: "#FF6F00" },
    "PyTorch": { icon: SiPytorch, color: "#EE4C2C" },
    "Keras": { icon: SiKeras, color: "#D00000" },
    "OpenCV": { icon: SiOpencv, color: "#5C3EE8" },
    "Jupyter": { icon: SiJupyter, color: "#F37626" },
    "NLTK": { icon: FaBrain, color: "#3776AB" }, // Fallback
    "Spacy": { icon: FaRobot, color: "#09A3D5" }, // Fallback
    "YOLO": { icon: FaEye, color: "#00FFFF" }, // Fallback
    "Matplotlib": { icon: FaChartLine, color: "#11557c" }, // Fallback
    "Seaborn": { icon: FaChartLine, color: "#11557c" }, // Fallback
    "Plotly": { icon: SiPlotly, color: "#3F4F75" },

    // Cloud & DevOps
    "AWS": { icon: SiAmazonwebservices, color: "#FF9900" },
    "Azure": { icon: FaMicrosoft, color: "#007FFF" }, // Using Microsoft icon
    "GCP": { icon: SiGooglecloud, color: "#4285F4" },
    "Docker": { icon: SiDocker, color: "#2496ED" },
    "Kubernetes": { icon: SiKubernetes, color: "#326CE5" },
    "Ansible": { icon: SiAnsible, color: "#EE0000" },
    "Terraform": { icon: SiTerraform, color: "#623CE4" },
    "Jenkins": { icon: SiJenkins, color: "#D24939" },
    "Linux": { icon: SiLinux, color: "#FCC624" },
    "Git": { icon: SiGithub, color: "#F05032" },
    "GitHub": { icon: SiGithub, color: "#181717" },
    "Maven": { icon: SiApachemaven, color: "#C71A36" },

    // Big Data
    "Spark": { icon: SiApachespark, color: "#E25A1C" },
    "Kafka": { icon: SiApachekafka, color: "#231F20" },
    "Airflow": { icon: SiApacheairflow, color: "#017CEE" },
    "Snowflake": { icon: SiSnowflake, color: "#29B5E8" },

    // Databases
    "MongoDB": { icon: SiMongodb, color: "#47A248" },
    "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
    "MySQL": { icon: SiMysql, color: "#4479A1" },
    "Hibernate": { icon: SiHibernate, color: "#59666C" },

    // Tools
    "Excel": { icon: FaTable, color: "#217346" }, // Fallback
    "Tableau": { icon: SiTableau, color: "#E97627" },
    "Power BI": { icon: FaMicrosoft, color: "#F2C811" }, // Microsoft icon
    "Streamlit": { icon: SiStreamlit, color: "#FF4B4B" },
    "Splunk": { icon: SiSplunk, color: "#000000" },
    "Figma": { icon: SiFigma, color: "#F24E1E" },
    "Adobe XD": { icon: SiAdobe, color: "#FF26BE" },
    "Sketch": { icon: SiSketch, color: "#F7B500" },
    "Miro": { icon: SiMiro, color: "#050038" },
    "InVision": { icon: SiInvision, color: "#FF3366" },

    // Security & Embedded
    "Kali Linux": { icon: SiKalilinux, color: "#557C94" },
    "Wireshark": { icon: SiWireshark, color: "#1679A7" },
    "Metasploit": { icon: SiMetasploit, color: "#111111" },
    "Nmap": { icon: FaNetworkWired, color: "#111111" },
    "Burp Suite": { icon: SiBurpsuite, color: "#FF6633" },
    "Nessus": { icon: FaLock, color: "#0076D6" },
    "Arduino": { icon: SiArduino, color: "#00979D" },
    "Raspberry Pi": { icon: SiRaspberrypi, color: "#C51A4A" },
    "ARM": { icon: SiIntel, color: "#0091BD" },
    "RTOS": { icon: FaMicrochip, color: "#000000" },

    // Quantum
    "Qiskit": { icon: FaAtom, color: "#6929C4" },
    "IBM Quantum": { icon: FaAtom, color: "#052FAD" }, // Fallback to Atom

    // UI/UX & Design Tools
    "Bootstrap": { icon: SiBootstrap, color: "#7952B3" },
    "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
    "Notion": { icon: SiNotion, color: "#000000" },
    "Canva": { icon: SiCanva, color: "#00C4CC" },
    "Behance": { icon: SiBehance, color: "#1769FF" },
    "Hotjar": { icon: SiHotjar, color: "#FD3A5C" },
    "Maze": { icon: FaEye, color: "#000000" }, // Fallback
    "Lookback": { icon: FaEye, color: "#2E5BFF" }, // Fallback
    "Flask": { icon: SiFlask, color: "#000000" },
    "Hugging Face": { icon: FaRobot, color: "#FFD21E" }, // Fallback to Robot
    "LangChain": { icon: FaNetworkWired, color: "#1C3C3C" }, // Fallback to Network
    "OpenAI": { icon: FaBrain, color: "#412991" }, // Fallback to Brain

    // Fallbacks
    "Vite": { icon: SiVite, color: "#646CFF" },
};

export const getCourseSpecificTools = (title: string, category: string = "") => {
    const tools: Record<string, string[]> = {
        "Data Science": ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Keras", "Tableau", "Power BI", "SQL", "Jupyter", "Streamlit"],
        "Data Engineering": ["Python", "SQL", "AWS", "Azure", "GCP", "Spark", "Kafka", "Airflow", "Snowflake", "Docker", "Terraform"],
        "Cloud Consulting": ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Docker", "Ansible", "Jenkins"],
        "Cloud Computing": ["AWS", "Azure", "GCP", "Docker", "Terraform", "Linux", "Ansible"],
        "Data Analytics": ["Excel", "SQL", "Tableau", "Power BI", "Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
        "DevOps (AWS/Azure)": ["Jenkins", "Docker", "Kubernetes", "Ansible", "Terraform", "GitHub", "Linux"],
        "Cyber Security": ["Kali Linux", "Wireshark", "Metasploit", "Nmap", "Burp Suite", "Splunk", "Nessus", "Python", "Linux"],
        "Python Full Stack": ["Python", "Django", "React", "PostgreSQL", "HTML5", "CSS3", "JavaScript"],
        "Java Full Stack": ["Java", "Spring Boot", "React", "MySQL", "Hibernate", "JavaScript", "HTML5"],
        "MERN Stack": ["MongoDB", "Express", "React", "Node.js", "Redux", "Material UI", "JavaScript"],
        "MEAN Stack": ["MongoDB", "Express", "Angular", "Node.js", "TypeScript", "RxJS", "Angular Material"],
        "QA Automation": ["Selenium", "Java", "Jenkins", "GitHub", "Maven"],
        "Embedded Systems": ["C", "C++", "ARM", "Arduino", "Raspberry Pi", "STM32", "ESP32", "RTOS", "Linux", "I2C", "SPI"],
        "Quantum Computing": ["Qiskit", "IBM Quantum", "Python", "Cirq", "PennyLane", "Quantum Algorithms", "Jupyter", "Linear Algebra"],
        "AI/Machine Learning": [
            "Python", "Pandas", "NumPy", "Matplotlib", "Seaborn",
            "Scikit-Learn", "TensorFlow", "Keras", "PyTorch", "OpenCV",
            "NLTK", "Spacy", "Hugging Face", "LangChain", "OpenAI", "YOLO",
            "Jupyter", "Streamlit", "Docker", "AWS", "Azure", "Git", "GitHub"
        ],
        "UI/UX Design": ["Figma", "Adobe XD", "Sketch", "Miro", "InVision", "Zeplin", "HTML5", "CSS3", "Bootstrap", "Tailwind", "JavaScript", "Maze", "Lookback", "Hotjar", "Git", "GitHub", "Notion", "Canva", "Behance"],
        "UI/UX Design Masterclass": ["Figma", "Adobe XD", "Sketch", "Miro", "InVision", "Zeplin", "HTML5", "CSS3", "Bootstrap", "Tailwind", "JavaScript", "Maze", "Lookback", "Hotjar", "Git", "GitHub", "Notion", "Canva", "Behance"]
    };

    // 1. Direct Lookup
    if (tools[title]) return tools[title];
    if (tools[category]) return tools[category];

    // 2. Smart Partial Matching
    const search = (title + " " + category).toLowerCase();

    if (search.includes("data science")) return tools["Data Science"];
    if (search.includes("data eng")) return tools["Data Engineering"];
    if (search.includes("data analy")) return tools["Data Analytics"];
    if (search.includes("ai") || search.includes("machine") || search.includes("intelligence")) return tools["AI/Machine Learning"];
    if (search.includes("design") || search.includes("ui") || search.includes("ux")) return tools["UI/UX Design"];
    if (search.includes("cyber") || search.includes("security")) return tools["Cyber Security"];
    if (search.includes("cloud")) return tools["Cloud Computing"];
    if (search.includes("devops")) return tools["DevOps (AWS/Azure)"];
    if (search.includes("java")) return tools["Java Full Stack"];
    if (search.includes("python") && (search.includes("stack") || search.includes("web"))) return tools["Python Full Stack"];
    if (search.includes("mern")) return tools["MERN Stack"];
    if (search.includes("mean")) return tools["MEAN Stack"];
    if (search.includes("embedded") || search.includes("iot")) return tools["Embedded Systems"];
    if (search.includes("qa") || search.includes("testing") || search.includes("automation")) return tools["QA Automation"];
    if (search.includes("quantum")) return tools["Quantum Computing"];

    // Generic Full Stack Fallback
    if (search.includes("full stack")) return tools["MERN Stack"];

    // 3. Ultimate Fallback (Basic Web)
    return ["HTML5", "CSS3", "JavaScript", "React", "Git"];
};

export const getCourseSpecificLogos = (title: string, category: string = ""): Logo[] => {
    const tools = getCourseSpecificTools(title, category);
    return tools.map((tool, index) => {
        const toolData = ToolIcons[tool] || { icon: SiJavascript, color: "#666" }; // Fallback
        const Icon = toolData.icon;
        return {
            name: tool,
            id: index,
            // Create a wrapper component that applies the color using style
            img: (props: React.ComponentProps<'svg'>) => <Icon {...props} style={{ ...props.style, color: toolData.color }} />
        };
    });
};

export const getProgramDetails = (category: string) => {
    const defaultProgram = {
        duration: "90",
        unit: "Days",
        learning: "75 Days Learning",
        project: "15 Days Project",
        learningText: "Comprehensive module-based learning",
        projectText: "Real-world capstone project implementation",
        gradient: "bg-[conic-gradient(#3B82F6_0%_75%,#10B981_75%_100%)]",
        legend: [
            { label: "75 Days Learning", color: "bg-blue-500" },
            { label: "15 Days Project", color: "bg-emerald-500" }
        ],
        roles: ["Software Developer", "Full Stack Engineer", "Backend Developer", "Frontend Developer"],
        activity: "Practical Labs, Live Projects, Mock Tests",
        mode: "Online + Offline (Hybrid)",
        eligibility: "Open to Undergraduates, Graduates & Working Professionals"
    };

    const programs: Record<string, typeof defaultProgram> = {
        "Data Science": {
            duration: "90", unit: "Days",
            learning: "75 Days Learning", project: "15 Days Project",
            learningText: "Statistics, Python, ML Algorithms", projectText: "End-to-end Data Science Lifecycle",
            gradient: "bg-[conic-gradient(#8B5CF6_0%_83%,#F59E0B_83%_100%)]",
            legend: [{ label: "75 Days Learning", color: "bg-violet-500" }, { label: "15 Days Project", color: "bg-amber-500" }],
            roles: ["Data Scientist", "ML Engineer", "Data Analyst", "AI Researcher"],
            activity: "Hackathons, Research Paper Reading, Model Optimization",
            mode: "Hybrid (Online Lectures + Offline Lab Access)",
            eligibility: "STEM Background preferred, Statistics knowledge helpful"
        },
        "AI/Machine Learning": {
            duration: "90", unit: "Days",
            learning: "75 Days Learning", project: "15 Days Project",
            learningText: "Deep Learning, NLP, Computer Vision", projectText: "AI Model Deployment",
            gradient: "bg-[conic-gradient(#EC4899_0%_83%,#3B82F6_83%_100%)]",
            legend: [{ label: "75 Days Learning", color: "bg-pink-500" }, { label: "15 Days Project", color: "bg-blue-500" }],
            roles: ["AI Engineer", "ML Ops Engineer", "NLP Specialist", "Computer Vision Engineer"],
            activity: "Hackathons, Research Paper Reading, Model Optimization.",
            mode: "Hybrid (Online Lectures + Offline Lab Access).",
            eligibility: "STEM Background preferred, Python knowledge helpful."
        },
        "UI/UX Design": {
            duration: "90", unit: "Days",
            learning: "75 Days Learning", project: "15 Days Project",
            learningText: "Design Systems, Wireframing, Prototyping", projectText: "Complete Product Design Portfolio",
            gradient: "bg-[conic-gradient(#10B981_0%_83%,#3B82F6_83%_100%)]",
            legend: [{ label: "75 Days Learning", color: "bg-emerald-500" }, { label: "15 Days Project", color: "bg-blue-500" }],
            roles: ["UI/UX Designer", "Product Designer", "UX Researcher", "Interaction Designer"],
            activity: "Every Saturday Free Aptitude classes, Mock Interviews, Technical Tests.",
            mode: "Classroom + Lab Practice + Simulations + Projects + Mock Interviews.",
            eligibility: "B.Tech, B.Sc, BCA, M.Tech, MCA Students, Job seekers, Switchers."
        },
        "UI/UX Design Masterclass": {
            duration: "90", unit: "Days",
            learning: "75 Days Learning", project: "15 Days Project",
            learningText: "Design Systems, Wireframing, Prototyping", projectText: "Complete Product Design Portfolio",
            gradient: "bg-[conic-gradient(#10B981_0%_83%,#3B82F6_83%_100%)]",
            legend: [{ label: "75 Days Learning", color: "bg-emerald-500" }, { label: "15 Days Project", color: "bg-blue-500" }],
            roles: ["UI/UX Designer", "Product Designer", "UX Researcher", "Interaction Designer"],
            activity: "Every Saturday Free Aptitude classes, Mock Interviews, Technical Tests.",
            mode: "Classroom + Lab Practice + Simulations + Projects + Mock Interviews.",
            eligibility: "B.Tech, B.Sc, BCA, M.Tech, MCA Students, Job seekers, Switchers."
        },
        "Full Stack": { // Generic for MERN/MEAN/Java/Python if not specific
            duration: "90", unit: "Days",
            learning: "75 Days Learning", project: "15 Days Project",
            learningText: "Frontend, Backend, Database, Cloud", projectText: "Full Stack Application Development",
            gradient: "bg-[conic-gradient(#EF4444_0%_80%,#3B82F6_80%_100%)]",
            legend: [{ label: "75 Days Learning", color: "bg-red-500" }, { label: "15 Days Project", color: "bg-blue-500" }],
            roles: ["Full Stack Developer", "Backend Developer", "Frontend Architect", "API Specialist"],
            activity: "Live Coding Sessions, Hackathons, Project Reviews",
            mode: "Online Live Classes + Recorded Sessions + Support",
            eligibility: "Any Graduate / Under-graduate with passion for coding"
        },
        "Cyber Security": {
            duration: "90", unit: "Days",
            learning: "75 Days Learning", project: "15 Days Project",
            learningText: "Network Security, Ethical Hacking", projectText: "Vulnerability Assessment & Penetration Testing",
            gradient: "bg-[conic-gradient(#10B981_0%_75%,#EF4444_75%_100%)]",
            legend: [{ label: "75 Days Learning", color: "bg-emerald-500" }, { label: "15 Days Project", color: "bg-red-500" }],
            roles: ["Ethical Hacker", "Security Analyst", "Penetration Tester", "SOC Analyst"],
            activity: "CTF Challenges, Lab Simulations, Hackathons",
            mode: "Hybrid (Online + Labs)",
            eligibility: "Networking Basics, Linux Interest"
        }
    };

    // Mapping specific courses to generic types if needed
    if (category.includes("Full Stack") || category.includes("MERN") || category.includes("MEAN")) {
        return { ...programs["Full Stack"], roles: category.includes("Java") ? ["Java Developer", "Spring Boot Engineer", "Full Stack Dev"] : category.includes("Python") ? ["Python Developer", "Django Engineer", "Full Stack Dev"] : ["MERN/MEAN Stack Dev", "Frontend Lead", "Backend Engineer"] };
    }

    return programs[category] || defaultProgram;
};

export const getCourseOutcomes = (category: string) => {
    const outcomes: Record<string, string[]> = {
        "Data Science": [
            "Customer Churn Prediction: Logistic Regression / Random Forest.",
            "Stock Market Price Prediction: Time Series Analysis + LSTM.",
            "Sentiment Analysis: NLP on Twitter Data.",
            "Sales Forecasting Dashboard: Power BI + Regression.",
            "Movie Recommendation System: Collaborative Filtering + ML.",
            "Disease Prediction System: Classification + Streamlit Deployment.",
            "E-Commerce Product Analytics: Pandas + Plotly + Tableau."
        ],
        "Data Analytics": [
            "Sales Performance Dashboard: Power BI / Tableau + Excel + SQL.",
            "Customer Churn Analysis: Python + ML + Visualization.",
            "Financial Data Analytics: Budget vs actual comparison & forecasting.",
            "HR Analytics: Employee attrition & performance analysis.",
            "Marketing Campaign Effectiveness: ROI impact using Power BI."
        ],
        "DevOps": [
            "Multi-Cloud CI/CD Pipeline: Jenkins + Docker + Terraform + AWS + Azure.",
            "Kubernetes Microservices: Deploy Node.js/Flask apps on EKS/GKE.",
            "Infrastructure Automation: Terraform + Ansible for EC2 clusters.",
            "E-Commerce Pipeline: GitHub → Jenkins → Docker → AWS → K8s.",
            "Cloud-Native Monitoring Dashboard: Multi-cloud metrics with Grafana."
        ],
        "AI/Machine Learning": [
            "AI Chatbot for Customer Support: NLP + Flask + OpenAI API.",
            "Real-Time Object Detection: OpenCV + YOLO.",
            "Credit Card Fraud Detection: Logistic Regression + Random Forest.",
            "AI-based Resume Screener: NLP + Machine Learning.",
            "Stock Price Prediction: LSTM + Time Series.",
            "Emotion Detection: CNN + Transfer Learning.",
            "Medical Image Classification: TensorFlow + Streamlit."
        ],
        "UI/UX Design": [
            "E-Learning Platform Redesign: Focus on user flow optimization, course browsing, and accessibility.",
            "Food Delivery App Interface: Build wireframes to prototypes with user onboarding and cart design.",
            "Hospital Management Portal UX: Improve appointment booking and patient navigation.",
            "E-Commerce Store UI/UX: End-to-end responsive web store with checkout experience.",
            "Travel Planning Mobile App: Focus on visual hierarchy, usability, and journey design."
        ],
        "UI/UX Design Masterclass": [
            "E-Learning Platform Redesign: Focus on user flow optimization, course browsing, and accessibility.",
            "Food Delivery App Interface: Build wireframes to prototypes with user onboarding and cart design.",
            "Hospital Management Portal UX: Improve appointment booking and patient navigation.",
            "E-Commerce Store UI/UX: End-to-end responsive web store with checkout experience.",
            "Travel Planning Mobile App: Focus on visual hierarchy, usability, and journey design."
        ],
        "Quantum Computing": [
            "Quantum Cryptography Simulation: BB84 Protocol implementation.",
            "Quantum Machine Learning: Handwritten Digit Recognition.",
            "Grover’s Algorithm: Search Engine Demo.",
            "Quantum Chemistry Simulation: Using Qiskit Nature.",
            "Quantum Finance: Portfolio Optimization Model.",
            "Quantum Cloud Integration: Using AWS Braket."
        ],
        "Python Full Stack": [
            "Online Course Management System: Django + React + MySQL (Admin/Student Dashboards).",
            "E-Commerce Platform: Flask + React + REST API (Cart, Payment).",
            "Hospital Appointment App: Django REST + React (Scheduling, Role-based Access).",
            "Expense Tracker App: Flask + SQLite (Analytics with Chart.js).",
            "Job Portal System: Django + MySQL (Recruiter/Candidate Dashboards)."
        ],
        "Data Engineering": [
            "End-to-End Data Pipeline: AWS S3, Glue, Redshift, Power BI.",
            "Real-Time Data Streaming: Kafka + Spark (Twitter/IoT data).",
            "Data Warehouse: Build on Snowflake / BigQuery.",
            "Multi-Cloud Data Lake: AWS S3 + Azure Data Lake + GCP BigQuery.",
            "Sales Analytics Dashboard: Python ETL + Airflow + PostgreSQL + Tableau."
        ],
        "Cloud Consulting": [
            "Multi-Cloud Disaster Recovery Solution: Strategies for high availability.",
            "Cloud Cost Optimization Dashboard: Monitoring and reporting tools.",
            "Hybrid E-Commerce Platform: Integrated AWS + Azure + GCP architecture.",
            "AI-Powered Multi-Cloud Monitoring System: Unified observability."
        ],
        "Cyber Security": [
            "Vulnerability Assessment & Penetration Test Report: Simulated enterprise network.",
            "Web Application Security Audit: OWASP framework.",
            "Intrusion Detection System (IDS): Python + open-source tools.",
            "Incident Response Plan: Ransomware attack scenario.",
            "Phishing Simulation & Awareness Dashboard.",
            "Log Analysis & Threat Intelligence Dashboard: ELK Stack."
        ],
        "MERN Stack": [
            "E-Learning Platform: MERN + JWT + MongoDB + Admin Dashboard.",
            "E-Commerce Website: Product Catalog + Cart + Payment Gateway.",
            "Job Portal System: Recruiter & Candidate Modules.",
            "Chat Application: Real-time Messaging using Socket.io.",
            "Expense Tracker: Graph Analytics using Chart.js.",
            "College Event Management System: Role-based Access & Notifications."
        ],
        "MEAN Stack": [
            "E-Commerce Web App: Angular + Express + MongoDB (Cart, Orders, Payment).",
            "Job Portal Application: Admin & User Roles, Resume Upload, Filters.",
            "Hospital Management System: Patient & Doctor modules, Appointments.",
            "Learning Management System (LMS): Courses, Enrollments, Tracking.",
            "Chat Application: Real-time Communication using Socket.io."
        ],
        "Java Full Stack": [
            "Online Learning Management System: Spring Boot + React + MySQL.",
            "E-Commerce Web Application: Spring Boot + React + REST API.",
            "Hospital Appointment Booking System: Role-based auth + Email Notifications.",
            "Expense Tracker Web App: Java + Spring Boot + MongoDB + Analytics.",
            "Job Portal System: Recruiter & Candidate Dashboards with Spring Boot."
        ],
        "Embedded Systems": [
            "Smart Home Automation System: Arduino + IoT + Cloud Dashboard.",
            "IoT-Based Weather Monitoring Station: ESP32 + DHT11 + Firebase Integration.",
            "Obstacle Avoidance Robot: Ultrasonic Sensors + Motor Control + Arduino.",
            "Smart Energy Meter: Raspberry Pi + Current Sensor + Cloud Logging.",
            "Industrial Safety Monitoring System: Embedded C + Sensor Network + Buzzer Alerts.",
            "Health Monitoring Wearable: Biosensors + Bluetooth LE."
        ]
    };
    const defaultOutcomes = [
        "Practical Mastery: Gain hands-on experience through 20+ live projects.",
        "Industry Standards: Learn best practices used by tech leaders.",
        "Problem Solving: Develop a mindset to tackle complex challenges.",
        "Job Readiness: Clear interviews with our expert training."
    ];
    return outcomes[category] || defaultOutcomes;
};

export const getCourseTheme = (category: string) => {
    if (!category) {
        return {
            color: "#FF6B35",
            image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2706&auto=format&fit=crop",
        };
    }
    if (category.includes("Data") || category.includes("AI") || category.includes("Machine")) {
        return {
            color: "#3b82f6", // Blue-500
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", // Data Visualization
        };
    }
    if (category.includes("Cloud") || category.includes("DevOps")) {
        return {
            color: "#0ea5e9", // Sky-500
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop", // Global Network
        };
    }
    if (category.includes("Security") || category.includes("Cyber")) {
        return {
            color: "#10b981", // Emerald-500
            image: "https://images.unsplash.com/photo-1563206767-5b1d97289374?q=80&w=2541&auto=format&fit=crop", // Matrix/Code
        };
    }
    if (category.includes("Design") || category.includes("UI/UX")) {
        return {
            color: "#EC4899", // Pink-500
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop", // Design/Abstract
        };
    }
    // Default Web/Full Stack (AOTMS Blue)
    return {
        color: "#FF6B35",
        image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2706&auto=format&fit=crop", // Clean Coding Workspace
    };
};
