import React from "react";
import { Briefcase, LayoutDashboard, Github, Linkedin, Bell, TrendingUp, BookOpen, Users, Monitor } from "lucide-react";

export const CourseHighlightsBar = () => {
    return (
        <div className="bg-[#0075CF] py-6 sm:py-8 border-y border-white/10">
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    <HighlightItem icon={Briefcase} text="Hands-On Industry Projects" />
                    <HighlightItem icon={LayoutDashboard} text="AOTMS Learning Portal" />
                    <div className="group relative flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white rounded-xl sm:rounded-full p-3 sm:px-6 sm:py-3 shadow-lg hover:scale-105 transition-all duration-300 cursor-default w-full justify-center h-full overflow-hidden">
                        <div className="absolute inset-0 bg-[#0075CF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        <div className="flex gap-1 shrink-0 relative z-10">
                            <Github className="w-5 h-5 text-[#0075CF] group-hover:text-white transition-colors duration-300" />
                            <Linkedin className="w-5 h-5 text-[#0075CF] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="font-bold text-slate-800 group-hover:text-white text-xs sm:text-base text-center sm:text-left leading-tight relative z-10 transition-colors duration-300">GitHub & LinkedIn Project Portfolio</span>
                    </div>
                    <HighlightItem icon={Bell} text="Career & Job Alerts" />
                    <HighlightItem icon={TrendingUp} text="InDemand Skill Development" />
                    <HighlightItem icon={BookOpen} text="Free Aptitude Training" />
                    <HighlightItem icon={Users} text="Industry & Co-operate Level Interactions" />
                    <div className="group relative flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-orange-500 rounded-xl sm:rounded-full p-3 sm:px-6 sm:py-3 shadow-lg hover:scale-105 transition-all duration-300 cursor-default w-full justify-center h-full overflow-hidden">
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        <Monitor className="w-5 h-5 text-white group-hover:text-orange-600 shrink-0 relative z-10 transition-colors duration-300" />
                        <span className="font-bold text-white group-hover:text-orange-600 text-xs sm:text-base text-center sm:text-left leading-tight relative z-10 transition-colors duration-300">80% Practical • 20% Theory</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HighlightItem = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
    <div className="group relative flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white rounded-xl sm:rounded-full p-3 sm:px-6 sm:py-3 shadow-lg hover:scale-105 transition-all duration-300 cursor-default w-full justify-center h-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0075CF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
        <Icon className="w-5 h-5 text-[#0075CF] group-hover:text-white shrink-0 relative z-10 transition-colors duration-300" />
        <span className="font-bold text-slate-800 group-hover:text-white text-xs sm:text-base text-center sm:text-left leading-tight relative z-10 transition-colors duration-300">{text}</span>
    </div>
);
