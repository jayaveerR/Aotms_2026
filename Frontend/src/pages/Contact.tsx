import React, { useState } from 'react';
import { Header } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Youtube, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Real-time Input Restrictions
    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      if (numbersOnly.length <= 10) {
        setFormData({ ...formData, [name]: numbersOnly });
      }
      return;
    }

    if (name === 'name') {
      const alphabetsOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({ ...formData, [name]: alphabetsOnly });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      toast.error("Please enter a valid Name (min 3 characters)");
      setLoading(false);
      return;
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Please enter a valid Email address");
      setLoading(false);
      return;
    }

    if (!formData.phone || formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit Phone Number");
      setLoading(false);
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      toast.error("Message is too short!");
      setLoading(false);
      return;
    }

    try {
      const API_URL = `${import.meta.env.VITE_API_URL}/api/contact`;
      await axios.post(API_URL, formData);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.msg || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#FF6B35]/20">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-36 md:pb-24 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest shadow-sm mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Get in Touch
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              We'd Love to Hear <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#FF6B35]">
                From You
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Have questions about our courses, placements, or just want to say hello?
              Our team is ready to help you start your journey.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 -mt-16 relative z-20 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-12">

              {/* Left Side: Contact Info (5 cols) */}
              <div className="lg:col-span-5 bg-[#0B1221] text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                {/* Background Details */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF6B35]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-1 tracking-tight">Contact Info</h3>
                  <p className="text-slate-400 text-[10px] mb-6">Reach out to us through these channels.</p>

                  <div className="space-y-4">
                    <a href="https://wa.me/918019942233" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] transition-all duration-300 shadow-sm shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs mb-0.5 group-hover:text-[#FF6B35] transition-colors">WhatsApp</h4>
                        <p className="text-slate-400 text-[10px] group-hover:text-white transition-colors">+91 80199 42233</p>
                      </div>
                    </a>

                    <a href="mailto:info@aotms.com" className="flex items-start gap-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] transition-all duration-300 shadow-sm shrink-0">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs mb-0.5 group-hover:text-[#FF6B35] transition-colors">Email</h4>
                        <p className="text-slate-400 text-[10px] group-hover:text-white transition-colors">info@aotms.com</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] transition-all duration-300 shadow-sm shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs mb-0.5 group-hover:text-[#FF6B35] transition-colors">Location</h4>
                        <p className="text-slate-400 text-[10px] leading-relaxed group-hover:text-white transition-colors">
                          Pothuri Towers, 2nd Fl, MG Rd,<br />
                          Vijayawada - 520010
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-12 pt-12 border-t border-white/10">
                  <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Follow Us</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: Youtube, href: "https://youtube.com/@aotms", name: "YouTube" },
                      { icon: Instagram, href: "https://instagram.com/academyoftechmasters", name: "Instagram" },
                      { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" }
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.name}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                      >
                        <item.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Form (7 cols) */}
              <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-center bg-gray-50/20">
                <div className="max-w-sm mx-auto w-full">
                  <h3 className="text-lg font-black text-slate-900 mb-0.5 tracking-tight">Send a Message</h3>
                  <p className="text-slate-500 text-[10px] mb-6">Start your journey with us.</p>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Full Name</label>
                        <Input
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white border-slate-200 h-9 px-3 rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all text-[13px]"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Email</label>
                        <Input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white border-slate-200 h-9 px-3 rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all text-[13px]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Phone (India)</label>
                      <div className="relative group/input">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400 border-r border-slate-200 pr-2 pointer-events-none group-focus-within/input:text-blue-600 transition-colors">
                          +91
                        </div>
                        <Input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-white border-slate-200 h-9 pl-12 pr-3 rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all text-[13px] font-medium"
                          placeholder="99999 99999"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Message</label>
                      <Textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-white border-slate-200 px-3 py-2 rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all min-h-[80px] resize-none text-[13px]"
                        placeholder="Your message..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-sm transition-all active:scale-[0.99] text-xs group"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Submit Now</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20 max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 h-[450px] relative group">
            <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 rounded-[2.5rem] z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.5236791966513!2d80.64593811057928!3d16.49963922770637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb43b8f6af1d%3A0x18151e18505cbaf8!2sAcademy%20Of%20Tech%20Masters!5e0!3m2!1sen!2sin!4v1768037573566!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Academy of Tech Masters Location"
              className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 border-0"
            ></iframe>
          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
};

export default Contact;
