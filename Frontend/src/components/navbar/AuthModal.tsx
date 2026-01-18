import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Eye, EyeOff, BookOpen } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { auth, googleProvider, signInWithPopup } from "@/lib/firebase";
import {
    degrees, departments, countryCodes,
    passoutYears, courseOptions
} from "./navData";

interface AuthModalProps {
    showAuthModal: boolean;
    setShowAuthModal: (show: boolean) => void;
    authMode: 'login' | 'register' | 'forgot';
    setAuthMode: (mode: 'login' | 'register' | 'forgot') => void;
}

export const AuthModal = ({ showAuthModal, setShowAuthModal, authMode, setAuthMode }: AuthModalProps) => {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [degree, setDegree] = useState(degrees[0]);
    const [department, setDepartment] = useState(departments[0]);
    const [passoutYear, setPassoutYear] = useState(passoutYears[0]);
    const [selectedCourse, setSelectedCourse] = useState(courseOptions[0].name);
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
    const [otherCourse, setOtherCourse] = useState('');
    const [passwordStrength, setPasswordStrength] = useState<'Weak' | 'Medium' | 'Strong' | ''>('');

    const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];
    const selectedCourseData = courseOptions.find(c => c.name === selectedCourse) || courseOptions[0];

    const checkPasswordStrength = (pass: string) => {
        if (!pass) return '';
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[a-z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        if (score <= 2) return 'Weak';
        if (score <= 4) return 'Medium';
        return 'Strong';
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPassword(val);
        setPasswordStrength(checkPasswordStrength(val));
    };

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;
        const newErrors: { [key: string]: string } = {};

        if (authMode === 'register') {
            if (!firstName) newErrors.firstName = "Required";
            if (!lastName) newErrors.lastName = "Required";
            if (!email) newErrors.email = "Required";
            if (!phone) newErrors.phone = "Required";
            if (phone.length < 10) newErrors.phone = "Minimum 10 digits";
            if (!password) newErrors.password = "Required";
            if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
            if (selectedCourse === 'Other' && !otherCourse) newErrors.otherCourse = "Please specify";
            if (passwordStrength !== 'Strong') newErrors.password = "Password is not strong enough";
        } else {
            if (!email) newErrors.email = "Required";
            if (!password && authMode === 'login') newErrors.password = "Required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }
        setErrors({});

        try {
            if (authMode === 'login') {
                const res = await axios.post(`${API_URL}/login`, { email, password });
                setAuth(res.data.user, res.data.token);
                toast.success(`Welcome back!`);
                setShowAuthModal(false);
                navigate('/dashboard');
            } else if (authMode === 'register') {
                const fullPhone = `${countryCode}${phone}`;
                const res = await axios.post(`${API_URL}/register`, {
                    name: `${firstName} ${lastName}`,
                    email,
                    password,
                    phone: fullPhone,
                    degree,
                    department,
                    passoutYear,
                    course: selectedCourse === 'Other' ? otherCourse : selectedCourse
                });
                setAuth(res.data.user, res.data.token);
                toast.success("Account created!");
                setShowAuthModal(false);
                navigate('/dashboard');
            } else {
                await axios.post(`${API_URL}/forgot-password`, { email });
                toast.success("Reset link sent.");
                setAuthMode('login');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.msg || "Something went wrong");
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const idToken = await user.getIdToken();

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
                email: user.email,
                name: user.displayName,
                avatar: user.photoURL,
                googleId: user.uid,
                token: idToken
            });

            console.log("Login successful, user data from MongoDB:", res.data.user);
            setAuth(res.data.user, res.data.token);
            toast.success(`Welcome ${user.displayName}!`);
            setShowAuthModal(false);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error("Google Sign-In failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {showAuthModal && (
                <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowAuthModal(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl p-8 overflow-hidden z-[1003]"
                    >
                        <button onClick={() => setShowAuthModal(false)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400" aria-label="Close Modal">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-black text-slate-900">
                                {authMode === 'login' ? 'Welcome Back' : authMode === 'register' ? 'Join Us' : 'Reset Password'}
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {authMode === 'login' ? 'Please sign in to continue' : authMode === 'register' ? 'Start your learning journey' : 'Enter email to recover account'}
                            </p>
                        </div>

                        <form onSubmit={handleAuthSubmit} className="space-y-4">
                            {authMode === 'register' && (
                                <>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Input
                                                placeholder="First Name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className={cn("h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white", errors.firstName && "border-red-500 bg-red-50/50")}
                                            />
                                            {errors.firstName && <p className="text-xs text-red-500 ml-2 mt-1 font-bold">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <Input
                                                placeholder="Last Name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className={cn("h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white", errors.lastName && "border-red-500 bg-red-50/50")}
                                            />
                                            {errors.lastName && <p className="text-[10px] text-red-500 ml-2 mt-1 font-bold">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex gap-2">
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                                    className="w-[100px] h-11 rounded-xl bg-slate-50 border-transparent hover:bg-slate-100 transition-colors flex items-center justify-between px-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                                                            alt={selectedCountry.label}
                                                            className="w-6 h-auto shadow-sm"
                                                        />
                                                        <span className="text-xs font-bold text-slate-700">{selectedCountry.code}</span>
                                                    </div>
                                                    <ChevronDown className={cn("w-3 h-3 text-slate-400 transition-transform", isCountryDropdownOpen ? "rotate-180" : "")} />
                                                </button>

                                                <AnimatePresence>
                                                    {isCountryDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 z-[1005] overflow-hidden p-1.5"
                                                        >
                                                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                                                {countryCodes.map((c) => (
                                                                    <button
                                                                        key={c.label}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setCountryCode(c.code);
                                                                            setIsCountryDropdownOpen(false);
                                                                        }}
                                                                        className={cn(
                                                                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors",
                                                                            countryCode === c.code ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-slate-50 text-slate-600"
                                                                        )}
                                                                    >
                                                                        <div className="flex items-center gap-2.5">
                                                                            <img
                                                                                src={`https://flagcdn.com/w40/${c.iso}.png`}
                                                                                alt={c.label}
                                                                                className="w-5 h-auto"
                                                                            />
                                                                            <span>{c.label}</span>
                                                                        </div>
                                                                        <span className="opacity-60">{c.code}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                {isCountryDropdownOpen && (
                                                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsCountryDropdownOpen(false)} />
                                                )}
                                            </div>
                                            <Input
                                                placeholder="Enter 10-digit mobile number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                className={cn("flex-1 h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white placeholder:text-slate-400 placeholder:text-xs", errors.phone && "border-red-500 bg-red-50/50")}
                                            />
                                        </div>
                                        {errors.phone && <p className="text-[10px] text-red-500 ml-2 mt-1 font-bold">{errors.phone}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-xs font-black uppercase text-slate-400 ml-2">Degree</label>
                                            <select
                                                aria-label="Degree"
                                                value={degree}
                                                onChange={(e) => setDegree(e.target.value)}
                                                className="w-full h-11 rounded-xl bg-slate-50 border-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors"
                                            >
                                                {degrees.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-black uppercase text-slate-400 ml-2">Dept</label>
                                            <select
                                                aria-label="Department"
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                className="w-full h-11 rounded-xl bg-slate-50 border-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors"
                                            >
                                                {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-xs font-black uppercase text-slate-400 ml-2">Year</label>
                                            <select
                                                aria-label="Passout Year"
                                                value={passoutYear}
                                                onChange={(e) => setPassoutYear(e.target.value)}
                                                className="w-full h-11 rounded-xl bg-slate-50 border-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors"
                                            >
                                                {passoutYears.map(y => <option key={y} value={y}>{y}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-black uppercase text-slate-400 ml-2">Course</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
                                                    className="w-full h-11 rounded-xl bg-slate-50 border-transparent hover:bg-slate-100 transition-colors flex items-center justify-between px-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                >
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        {selectedCourseData.icon && <selectedCourseData.icon className="w-3.5 h-3.5 text-primary shrink-0" />}
                                                        <span className="text-xs font-bold text-slate-700 truncate">{selectedCourse}</span>
                                                    </div>
                                                    <ChevronDown className={cn("w-3 h-3 text-slate-400 transition-transform", isCourseDropdownOpen ? "rotate-180" : "")} />
                                                </button>

                                                <AnimatePresence>
                                                    {isCourseDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                            className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 z-[1005] overflow-hidden p-1.5"
                                                        >
                                                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                                                {courseOptions.map((c) => (
                                                                    <button
                                                                        key={c.name}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedCourse(c.name);
                                                                            setIsCourseDropdownOpen(false);
                                                                        }}
                                                                        className={cn(
                                                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors",
                                                                            selectedCourse === c.name ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-slate-50 text-slate-600"
                                                                        )}
                                                                    >
                                                                        {c.icon && <c.icon className="w-4 h-4 opacity-70" />}
                                                                        <span>{c.name}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                {isCourseDropdownOpen && (
                                                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsCourseDropdownOpen(false)} />
                                                )}
                                            </div>
                                            {errors.otherCourse && <p className="text-[10px] text-red-500 ml-2 mt-1 font-bold">{errors.otherCourse}</p>}
                                        </div>
                                    </div>

                                    {selectedCourse === 'Other' && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                            <Input
                                                placeholder="Specify your course"
                                                value={otherCourse}
                                                onChange={(e) => setOtherCourse(e.target.value)}
                                                className={cn("h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white", errors.otherCourse && "border-red-500 bg-red-50/50")}
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={cn("h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white", errors.email && "border-red-500 bg-red-50/50")}
                                    />
                                    {errors.email && <p className="text-xs text-red-500 ml-2 mt-1 font-bold">{errors.email}</p>}
                                </div>

                                {authMode !== 'forgot' && (
                                    <div>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                value={password}
                                                onChange={authMode === 'register' ? handlePasswordChange : (e) => setPassword(e.target.value)}
                                                className={cn("h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white pr-10", errors.password && "border-red-500 bg-red-50/50")}
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                            {errors.password && <p className="text-xs text-red-500 ml-2 mt-1 font-bold">{errors.password}</p>}
                                        </div>
                                        {authMode === 'register' && password && (
                                            <div className="mt-2">
                                                <div className="flex items-center gap-1 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength ? (passwordStrength === 'Weak' ? 'bg-red-500' : passwordStrength === 'Medium' ? 'bg-yellow-500' : 'bg-green-500') : 'bg-transparent'}`} />
                                                    <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength === 'Medium' || passwordStrength === 'Strong' ? (passwordStrength === 'Medium' ? 'bg-yellow-500' : 'bg-green-500') : 'bg-transparent'}`} />
                                                    <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength === 'Strong' ? 'bg-green-500' : 'bg-transparent'}`} />
                                                </div>
                                                <p className="text-[10px] text-right font-bold mt-1 text-slate-500 uppercase">{passwordStrength || 'Weak'}</p>
                                                <p className="text-[10px] text-slate-400">Must contain 8+ chars, 1 upper, 1 lower, 1 number, 1 special.</p>
                                            </div>
                                        )}
                                        {authMode === 'register' && (
                                            <div className="relative mt-4">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Confirm Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className={cn("h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white pr-10", errors.confirmPassword && "border-red-500 bg-red-50/50")}
                                                />
                                                {errors.confirmPassword && <p className="text-[10px] text-red-500 ml-2 mt-1 font-bold">{errors.confirmPassword}</p>}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {authMode === 'login' && (
                                <div className="text-right">
                                    <button type="button" onClick={() => setAuthMode('forgot')} className="text-xs font-bold text-primary hover:underline">
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 bg-[#0066CC] hover:bg-[#0052a3]" disabled={isLoading}>
                                {isLoading ? 'Processing...' : authMode === 'login' ? 'Sign In' : authMode === 'register' ? 'Create Account' : 'Send Reset Link'}
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold">Or continue with</span></div>
                            </div>

                            <Button type="button" variant="outline" onClick={handleGoogleSignIn} className="w-full h-12 rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </Button>

                            <p className="text-center text-xs text-slate-500 font-medium">
                                {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                                <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="ml-1 font-bold text-[#0066CC] hover:underline">
                                    {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
