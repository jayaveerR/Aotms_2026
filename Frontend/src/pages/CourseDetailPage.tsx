import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Clock, Users, BookOpen, ArrowRight, Star, CheckCircle2, ChevronDown,
    Award, Monitor, Briefcase, TrendingUp, MessageSquare, ChevronLeft,
    Linkedin, Megaphone, FileText, MessageCircle, Unlock, Video, Handshake, Globe
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { useCourseBySlug, useCourses } from "@/hooks/useCourses";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseDetailHero } from "./CourseDetailsHero";
import { useCartStore } from "@/store/cartStore";
import {
    getCourseSpecificLogos,
    getProgramDetails,
    getCourseOutcomes,
    getCourseCustomContent,
    getCourseFeatures,
    getCourseTheme,
    getCourseToolsAndTechnologies,
    getCourseObjectives,
    getCourseCapstoneProjects,
    getCourseLearningOutcomes,
    getCourseCertifications,
    getCourseCareerRoles,
    getCourseHiringCompanies,
} from "../data/courseMetadata";

// Simple ShowMore Component
interface ShowMoreProps {
    children: React.ReactNode;
    initialHeight?: string;
}

const ShowMore = ({ children, initialHeight = "300px" }: ShowMoreProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="relative">
            <div
                className={cn("overflow-hidden transition-all duration-500")}
                style={{ maxHeight: isExpanded ? "2000px" : initialHeight }}
            >
                {children}
            </div>
            {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
            <div className="mt-4 text-center">
                <Button
                    variant="ghost"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold"
                >
                    {isExpanded ? "Show Less" : "Show More"}
                    <ChevronDown className={cn("ml-2 w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                </Button>
            </div>
        </div>
    );
};

export default function CourseDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const addToCart = useCartStore((state) => state.addToCart);
    const { data: course, isLoading } = useCourseBySlug(slug || "");
    const { data: allCourses } = useCourses();
    const [activeModule, setActiveModule] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const handleEnroll = async () => {
        if (course) {
            // Transform Course to CartItem
            addToCart({
                id: course._id,
                name: course.title,
                price: parseFloat(course.price.replace(/[^0-9.-]+/g, "")),
                image: course.image
            });
            toast.success("Course added to cart!");
            navigate("/cart");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Course not found</h2>
                    <Link to="/courses">
                        <Button>Browse All Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const programDetails = getProgramDetails(course.category || course.title);
    const outcomes = getCourseOutcomes(course.category || course.title);
    const logos = getCourseSpecificLogos(course.category || course.title);
    const customSections = getCourseCustomContent(course.title, course.category || "");
    const features = getCourseFeatures(course.category || course.title);
    const theme = getCourseTheme(course.category || course.title);
    const toolsData = getCourseToolsAndTechnologies(course.title, course.category || "");
    const objectives = getCourseObjectives(course.title, course.category || "");
    const capstoneProjects = getCourseCapstoneProjects(course.title, course.category || "");
    const learningOutcomes = getCourseLearningOutcomes(course.title, course.category || "");
    const certifications = getCourseCertifications(course.title, course.category || "");
    const careerRoles = getCourseCareerRoles(course.title, course.category || "");
    const hiringCompanies = getCourseHiringCompanies(course.title, course.category || "");

    // Icon mapping matching metadata feature icon strings
    const IconMap: any = {
        Award, Linkedin, Briefcase, Megaphone, FileText, MessageSquare,
        MessageCircle, Unlock, Video, Handshake, TrendingUp, Globe
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            {/* SEO Meta Tags */}
            <Helmet>
                <title>{course.title} Course | Academy of Tech Masters</title>
                <meta name="description" content={`Learn ${course.title} with expert training. ${course.duration} course with placement assistance and certification.`} />
                <meta property="og:title" content={`${course.title} | AOTMS`} />
                <meta property="og:image" content={course.image} />
                <link rel="canonical" href={`https://aotms.in/course/${slug}`} />
            </Helmet>

            {/* Hero */}
            <CourseDetailHero
                course={{
                    title: course.title,
                    category: course.category || "Professional Training",
                    image: course.image,
                    duration: `${programDetails.duration} Days`
                }}
                handleEnroll={handleEnroll}
            />

            {/* Main Content Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. ABOUT US Section (UI/UX only) */}
                        {customSections.filter((s: any) => s.type === "about_us").map((section: any, idx: number) => (
                            <section key={`about-${idx}`} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="flex-shrink-0">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b-4 border-blue-600 pb-2 inline-block">
                                            {section.title}
                                        </h2>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-6 sm:p-8 border border-blue-100">
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                                        {section.content.heading}
                                    </h3>
                                    <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                                        {section.content.text}
                                    </p>
                                </div>
                            </section>
                        ))}

                        {/* 2. UI/UX DESIGN Introduction (UI/UX only) */}
                        {customSections.filter((s: any) => s.type === "ui_ux_highlight").map((section: any, idx: number) => (
                            <section key={`uiux-${idx}`} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                        <div className="relative">
                                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#8B3A3A] leading-tight whitespace-pre-line">
                                                {section.title}
                                            </h2>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                                                <Monitor className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                                            <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-600 animate-spin-slow"></div>
                                            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 overflow-hidden shadow-2xl">
                                                <div className="w-full h-full flex items-center justify-center text-white text-6xl sm:text-7xl font-black">
                                                    {section.content.badge}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                        {section.content.description}
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {section.content.keyPoints.map((point: any, kIdx: number) => (
                                            <div key={kIdx} className={`bg-gradient-to-br ${point.bgGradient} rounded-xl p-5 border ${point.borderColor}`}>
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${point.iconColor} flex items-center justify-center flex-shrink-0`}>
                                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 mb-1">{point.title}</h4>
                                                        <p className="text-sm text-slate-600">{point.sub}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ))}

                        {/* 3. TOOLS & TECHNOLOGIES Section */}
                        {toolsData && toolsData.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0075CF] mb-8">
                                    Tools & Technologies
                                </h2>

                                {/* Decorative background with UI icon */}
                                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-2xl p-6 sm:p-8 overflow-hidden mb-6">
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

                                    {/* Table */}
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="border-b-2 border-slate-600">
                                                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-white font-bold text-sm sm:text-base">
                                                        Category
                                                    </th>
                                                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-white font-bold text-sm sm:text-base">
                                                        Tools/Technologies
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {toolsData.map((row: any, idx: number) => (
                                                    <tr
                                                        key={idx}
                                                        className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
                                                    >
                                                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-white font-semibold text-xs sm:text-sm">
                                                            {row.category}
                                                        </td>
                                                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-slate-300 text-xs sm:text-sm">
                                                            {row.tools}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* 4. COURSE OBJECTIVES Section */}
                        {objectives && objectives.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0075CF] mb-6">
                                    Course Objective
                                </h2>

                                <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6 sm:p-8 border border-slate-100">
                                    <p className="text-slate-700 text-base sm:text-lg font-medium mb-6">
                                        By the end of this course, students will:
                                    </p>

                                    <ul className="space-y-4">
                                        {objectives.map((objective: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 group">
                                                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                                <span className="text-slate-700 text-sm sm:text-base leading-relaxed flex-1">
                                                    {objective}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}

                        {/* 4b. CAPSTONE PROJECT IDEAS Section */}
                        {capstoneProjects && capstoneProjects.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0075CF] mb-8">
                                    Capstone Project Ideas
                                </h2>

                                <div className="space-y-4">
                                    {capstoneProjects.map((project: any, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 group hover:bg-slate-50 p-4 rounded-xl transition-colors">
                                            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-800 flex items-center justify-center mt-0.5 group-hover:bg-blue-600 transition-colors">
                                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                                                    {project.title}
                                                </h3>
                                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 4c. LEARNING OUTCOMES Section */}
                        {learningOutcomes && learningOutcomes.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0075CF] mb-6">
                                    Learning Outcomes
                                </h2>

                                <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6 sm:p-8 border border-slate-100">
                                    <p className="text-slate-700 text-base sm:text-lg font-medium mb-6">
                                        After completing the course, students will be able to:
                                    </p>

                                    <ul className="space-y-4">
                                        {learningOutcomes.map((outcome: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 group">
                                                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-800 flex items-center justify-center mt-0.5 group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                                <span className="text-slate-700 text-sm sm:text-base leading-relaxed flex-1">
                                                    {outcome}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}

                        {/* 5. CURRICULUM Section */}
                        <section id="curriculum" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Curriculum</h2>
                            </div>

                            <div className="space-y-3">
                                {course.curriculum.map((module, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "border rounded-xl transition-all overflow-hidden",
                                            activeModule === idx ? "border-blue-300 bg-blue-50/50" : "border-slate-200"
                                        )}
                                    >
                                        <button
                                            onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                                                    {idx + 1}
                                                </span>
                                                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{module.title}</h3>
                                            </div>
                                            <ChevronDown className={cn(
                                                "w-5 h-5 text-slate-400 transition-transform shrink-0",
                                                activeModule === idx && "rotate-180"
                                            )} />
                                        </button>

                                        <div className={cn(
                                            "grid transition-all duration-300",
                                            activeModule === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        )}>
                                            <div className="overflow-hidden">
                                                <ul className="space-y-2 px-4 sm:px-5 pb-4 sm:pb-5 pt-2">
                                                    {module.lessons.map((lesson, lIdx) => (
                                                        <li key={lIdx} className="flex items-start gap-2">
                                                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                                            <span className="text-slate-600 text-sm sm:text-base">{lesson}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 6. WHAT YOU WILL GET Section (Features) */}
                        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b-4 border-blue-600 pb-2 inline-block mb-8 uppercase">
                                What You Will Get After Completion of This Course
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                                {features.map((feature: any, idx: number) => {
                                    const IconExp = IconMap[feature.icon] || Star;
                                    return (
                                        <div key={idx} className="flex flex-col items-center text-center p-2">
                                            <div className={cn("w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 border-2", feature.bgColor, feature.color.replace('text', 'border'))}>
                                                <IconExp className={cn("w-7 h-7 sm:w-8 sm:h-8", feature.color)} />
                                            </div>
                                            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                                                {feature.title}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* 6b. Course Duration & Details (Sub-section) */}
                            <div className="mt-12 pt-8 border-t border-slate-100">
                                <h3 className="text-xl sm:text-2xl font-bold text-blue-600 text-center underline decoration-blue-600 underline-offset-4 mb-6">
                                    Course Duration: {programDetails.duration || "90"} Days
                                </h3>

                                <ul className="space-y-4">
                                    {/* Custom formatted list based on screenshot */}
                                    {programDetails.learning && (
                                        <li className="flex items-start gap-3">
                                            <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                            <span className="text-slate-700 font-medium">
                                                <span className="font-bold text-slate-900">75 Days</span> ({programDetails.learningText})
                                            </span>
                                        </li>
                                    )}
                                    {programDetails.project && (
                                        <li className="flex items-start gap-3">
                                            <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                            <span className="text-slate-700 font-medium">
                                                <span className="font-bold text-slate-900">15 Days</span> ({programDetails.projectText})
                                            </span>
                                        </li>
                                    )}

                                    {programDetails.activity && (
                                        <li className="flex items-start gap-3">
                                            <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                            <span className="text-slate-700">
                                                <span className="font-bold text-slate-900">Activity:</span> {programDetails.activity}
                                            </span>
                                        </li>
                                    )}

                                    <li className="flex items-start gap-3">
                                        <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                        <span className="text-slate-700">
                                            <span className="font-bold text-slate-900">Benefits:</span> Includes lectures, hands-on coding, mini-projects, and one final capstone project.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                        <span className="text-slate-700">
                                            <span className="font-bold text-slate-900">Difficulty:</span> Beginner → Intermediate → Advanced
                                        </span>
                                    </li>

                                    {programDetails.mode && (
                                        <li className="flex items-start gap-3">
                                            <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                            <span className="text-slate-700">
                                                <span className="font-bold text-slate-900">Mode:</span> {programDetails.mode}
                                            </span>
                                        </li>
                                    )}

                                    {programDetails.eligibility && (
                                        <li className="flex items-start gap-3">
                                            <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                            <span className="text-slate-700">
                                                <span className="font-bold text-slate-900">Education Eligibility:</span> {programDetails.eligibility}
                                            </span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </section>

                        {/* 7. CERTIFICATIONS & CAREER PREPARATION Section */}
                        {certifications && certifications.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0075CF] mb-8 underline decoration-[#0075CF] underline-offset-8">
                                    Certifications & Career Preparation
                                </h2>

                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                                            Certifications Covered / Recommended:
                                        </h3>
                                    </div>

                                    <ul className="space-y-3 ml-11">
                                        {certifications.map((cert: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm sm:text-base">
                                                <span className="text-orange-500 font-bold mt-1">✦</span>
                                                <span>{cert}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}

                        {/* 8. CAREER OPPORTUNITIES / JOB ROLES Section */}
                        {careerRoles && careerRoles.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0075CF] mb-8 underline decoration-[#0075CF] underline-offset-8">
                                    Career Opportunities / Job Roles
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {careerRoles.map((role: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-slate-900 font-semibold text-sm sm:text-base">
                                                {role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 9. WHO WILL HIRE YOU Section */}
                        {hiringCompanies && hiringCompanies.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0075CF] mb-8 underline decoration-[#0075CF] underline-offset-8">
                                    WHO WILL HIRE YOU
                                </h2>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                                    {hiringCompanies.map((company: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-center p-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-200 bg-white group"
                                        >
                                            <img
                                                src={company.logo}
                                                alt={company.name}
                                                className="w-full h-auto max-h-12 object-contain transition-all duration-300 transform group-hover:scale-110"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const parent = target.parentElement;
                                                    if (parent && !parent.querySelector('.fallback-text')) {
                                                        const textDiv = document.createElement('div');
                                                        textDiv.className = 'fallback-text text-center';
                                                        textDiv.innerHTML = `<p class="text-slate-700 font-bold text-xs sm:text-sm">${company.name}</p>`;
                                                        parent.appendChild(textDiv);
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-slate-600 text-sm sm:text-base italic">
                                        ...and many more leading companies across industries
                                    </p>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <CourseCard
                                course={{
                                    ...course,
                                    id: course._id,
                                    category: course.category || "Professional Course",
                                    price: course.price || "₹0",
                                    duration: `${programDetails.duration} ${programDetails.unit}`,
                                    themeColor: theme.color
                                }}
                            />

                            {/* Additional Sidebar Widgets */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-900 mb-4">Request Callback</h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Have questions? Our counselor will help you choose the right path.
                                </p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Book Free Counseling
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
