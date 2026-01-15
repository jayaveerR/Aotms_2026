import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuthStore } from "@/store/authStore";
import {
    MessageSquare,
    Trophy,
    Calendar,
    ArrowRight,
    Download,
    LogOut,
    Star,
    BookOpen,
    TrendingUp,
    Book,
    Play,
    Activity,
    LayoutDashboard,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserReview {
    _id: string;
    message: string;
    rating: number;
    createdAt: string;
    category: string;
    email?: string;
}

interface EventItem {
    id: string;
    name: string;
    date: string;
    mode: string;
    thumbnailUrl?: string;
    bannerUrl?: string;
}

interface Lead {
    name: string;
    email: string;
    phone?: string;
    course?: string;
    event?: string;
    createdAt?: string;
}

const Dashboard = () => {
    const { user, logout } = useAuthStore();
    const [myReviews, setMyReviews] = useState<UserReview[]>([]);
    const [workshops, setWorkshops] = useState<EventItem[]>([]);
    const [hackathons, setHackathons] = useState<EventItem[]>([]);
    const [activities, setActivities] = useState<EventItem[]>([]);
    const [allLeads, setAllLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [currentPopLead, setCurrentPopLead] = useState<Lead | null>(null);

    // Notification Popup Logic
    useEffect(() => {
        if (allLeads.length === 0) return;

        const interval = setInterval(() => {
            const randomLead = allLeads[Math.floor(Math.random() * allLeads.length)];
            setCurrentPopLead(randomLead);
            setShowPopup(true);

            // Hide after 5 seconds
            setTimeout(() => setShowPopup(false), 5000);
        }, 12000); // Show every 12 seconds

        return () => clearInterval(interval);
    }, [allLeads]);

    // Fetch user's reviews
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) return;

            try {
                // In a real app, you'd filter by user ID/email on backend. 
                // For now, we fetch all and filter client-side or assume an endpoint exists.
                // Since our current feedback API returns all, we simulate "My Reviews"
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback`);
                // Filter by email if logged in user has email
                const userReviews = res.data.filter((r: UserReview) => r.email === user.email);
                setMyReviews(userReviews);

                // Fetch Events
                const [wRes, hRes, aRes, lRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/events?type=workshop`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/events?type=hackathon`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/events?type=weekly-activity`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/leads`),
                ]);
                setWorkshops(wRes.data.slice(0, 3));
                setHackathons(hRes.data.slice(0, 3));
                setActivities(aRes.data.slice(0, 3));
                setAllLeads(lRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    // Calculate real stats based on fetched data
    const statsData = [
        { label: "Total Workshops", value: workshops.length.toString(), subtext: "Available to join", icon: Book, color: "blue" },
        { label: "Community Feedbacks", value: myReviews.length.toString(), subtext: "Your contributions", icon: Trophy, color: "orange" },
        { label: "Total Registrations", value: allLeads.length.toString(), subtext: "Active initiatives", icon: Users, color: "green" },
        { label: "Tech Hackathons", value: hackathons.length.toString(), subtext: "Live opportunities", icon: Calendar, color: "blue" },
    ];

    const upcomingActivities = activities.slice(0, 3).map(a => ({
        id: a.id,
        title: a.name,
        date: a.date,
        type: "Weekly Activity",
        status: "Available"
    }));

    return (
        <div className="bg-white min-h-screen relative overflow-x-hidden">
            <Header />

            {/* Hurry Up Popup Notification */}
            <AnimatePresence>
                {showPopup && currentPopLead && (
                    <motion.div
                        initial={{ opacity: 0, x: -100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, scale: 0.9 }}
                        className="fixed top-28 left-6 md:left-10 z-[100] w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 p-4 flex items-center gap-4 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-[#00388d]" />
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1 flex items-center gap-1">
                                Hurry Up! <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                            </h4>
                            <p className="text-xs font-bold text-slate-900 leading-tight">
                                <span className="text-blue-600 font-black">{currentPopLead.name.split(' ')[0]}</span> just registered for {currentPopLead.course || currentPopLead.event || "an initiative"}!
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="pt-28 md:pt-36 pb-20 relative px-4 sm:px-6">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none -z-10" />

                <div className="container mx-auto max-w-7xl">
                    {/* Welcome Section */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
                            <LayoutDashboard className="w-3 h-3" /> Student Dashboard
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">
                                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user?.name?.split(' ')[0] || "Student"}!</span>
                                </h1>
                                <p className="text-slate-500 font-bold text-lg">Continue your learning journey and achieve your goals.</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => window.location.href = '/courses'}
                                    className="gap-2 bg-[#00388d] hover:bg-blue-800 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-900/20"
                                >
                                    <BookOpen className="w-4 h-4" /> Browse Courses
                                </Button>
                                <Button variant="outline" onClick={logout} className="gap-2 text-slate-500 hover:text-red-500 hover:bg-red-50 border-slate-200 font-bold h-12 rounded-xl">
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {statsData.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40 relative group hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="absolute top-6 right-6 text-slate-200 group-hover:text-blue-200 transition-colors">
                                    <Activity className="w-5 h-5" />
                                </div>

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 
                                    ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        stat.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                            'bg-green-50 text-green-600'}`}
                                >
                                    <stat.icon className="w-6 h-6" />
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                                    <p className="text-sm font-bold text-slate-800">{stat.label}</p>
                                    <p className="text-[11px] font-bold text-slate-400">{stat.subtext}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Left Column Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Continue Learning */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner">
                                            <Play className="w-5 h-5 fill-current" />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Continue Learning</h2>
                                    </div>
                                    <button onClick={() => window.location.href = '/courses'} className="text-sm font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                                        View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                <div className="bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200 p-12 text-center">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                                        <BookOpen className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">Ongoing Course</h3>
                                    <p className="text-slate-500 font-bold mb-8 max-w-sm mx-auto">You don't have any active courses. Start learning today to build your career!</p>
                                    <Button onClick={() => window.location.href = '/courses'} className="bg-[#00388d] hover:bg-blue-800 font-black px-8 py-6 rounded-2xl">
                                        Explores Courses
                                    </Button>
                                </div>
                            </section>

                            {/* Upcoming Events Section */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shadow-inner">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Upcoming Events</h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => window.location.href = '/events'} className="text-xs font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
                                            Manage <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[...workshops.slice(0, 1), ...hackathons.slice(0, 1), ...activities.slice(0, 2)].map((event, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all group cursor-pointer"
                                            onClick={() => window.location.href = event.id.includes('h') ? '/hackathon' : event.id.includes('w') ? '/workshop' : '/events'}
                                        >
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-inner relative">
                                                <img src={event.thumbnailUrl || event.bannerUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest
                                                        ${idx === 0 ? 'bg-blue-50 text-blue-600' :
                                                            idx === 1 ? 'bg-orange-50 text-orange-600' :
                                                                'bg-indigo-50 text-indigo-600'}`}>
                                                        {idx === 0 ? 'Workshop' : idx === 1 ? 'Hackathon' : 'Activity'}
                                                    </span>
                                                </div>
                                                <h4 className="font-black text-slate-900 text-sm truncate uppercase tracking-tight mb-1">{event.name}</h4>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                                                    <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {event.mode}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Registered Initiatives Section (Marquee View) */}
                            <section className="overflow-hidden">
                                <div className="flex items-center justify-between mb-8 px-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Registrations</h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Feed</span>
                                    </div>
                                </div>

                                <div className="relative">
                                    {/* Gradient Masks for smooth fade */}
                                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                                    <div className="flex overflow-hidden py-4">
                                        {allLeads.length > 0 ? (
                                            <motion.div
                                                animate={{ x: [0, -100 * allLeads.length] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: Math.max(20, allLeads.length * 3),
                                                    ease: "linear"
                                                }}
                                                className="flex gap-6 shrink-0"
                                            >
                                                {[...allLeads, ...allLeads].map((lead, idx) => (
                                                    <div
                                                        key={`${lead.email}-${idx}`}
                                                        className="w-[280px] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all flex items-center gap-4 shrink-0"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shrink-0 overflow-hidden uppercase">
                                                            {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-slate-900 text-sm truncate">{lead.name}</h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[9px] font-black uppercase tracking-wider">
                                                                    {lead.course || lead.event || "General"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        ) : (
                                            <div className="w-full py-12 text-center text-slate-300 font-bold italic border border-dashed border-slate-200 rounded-3xl">
                                                Waiting for active registrations...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* My Reviews Section */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shadow-inner">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Community Feedback</h2>
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="text-center py-10 text-slate-400 font-bold">Checking records...</div>
                                ) : myReviews.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {myReviews.map((review, idx) => (
                                            <motion.div
                                                key={review._id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                        {review.category || "General"}
                                                    </span>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-orange-400 text-orange-400" : "text-slate-200"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 font-bold text-sm leading-relaxed line-clamp-3 italic">
                                                    "{review.message}"
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-[32px] p-10 text-center border border-slate-100 shadow-sm">
                                        <p className="text-slate-400 font-bold">No recent reviews submitted.</p>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Sidebar Column */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <Users className="w-6 h-6 text-indigo-600" /> My Profile
                            </h2>

                            {/* Redesigned Profile Card */}
                            <div className="bg-blue-600 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-500" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md p-1 mb-6">
                                        <div className="w-full h-full rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-black shadow-xl">
                                            {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || "UN"}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black mb-1">{user?.name}</h3>
                                    <p className="text-blue-100 font-bold text-sm mb-6 opacity-80">{user?.email}</p>

                                    <div className="flex justify-center gap-2">
                                        <span className="px-4 py-1.5 bg-[#FD5A1A] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
                                            STUDENT
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Help & Support Widget */}
                            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                                <h3 className="font-black text-slate-900 text-lg mb-4">Need Help?</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 tracking-tight">Academic Support</p>
                                            <p className="text-[10px] font-bold text-slate-400">Response in 24h</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all" onClick={() => window.location.href = '/contact'}>
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
