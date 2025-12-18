import { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Search, Shield, Clock, Users, ArrowRight, Star,
  Award, CheckCircle, Heart, Calendar, Video, MapPin,
  Sparkles, Zap, TrendingUp, Globe, ShieldCheck,
  Stethoscope, Brain, Pill, Activity, Eye, 
  PhoneCall, MessageSquare, Award as AwardIcon,
  ChevronRight, Play, BookOpen, Target,
  BarChart3, Cpu, Lock, Cloud,
  BatteryCharging, Zap as Lightning,
  Infinity as InfinityIcon, LucideHeartPulse
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DoctorCard from '../components/DoctorCard';
import Features from '../components/Features';
import AnimatedSection from '../components/AnimatedSection';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [particles, setParticles] = useState([]);
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({ doctors: 0, patients: 0, satisfaction: 0, support: 100 });
  const [hoveredDoctor, setHoveredDoctor] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isSearching, setIsSearching] = useState(false);

  // Enhanced floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.3 + 0.1,
      type: i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'purple' : 'pink'
    }));
    setParticles(newParticles);
  }, []);

  // Animated counter for stats
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        doctors: prev.doctors < 500 ? prev.doctors + 10 : 500,
        patients: prev.patients < 50000 ? prev.patients + 500 : 50000,
        satisfaction: prev.satisfaction < 98 ? prev.satisfaction + 1 : 98,
        support: 100
      }));
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "12 years",
      fee: "$150",
      city: "New York",
      rating: 4.9,
      reviews: 128,
      available: true,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      badges: ['Top Rated', '24/7 Available'],
      responseTime: '15 min'
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      experience: "8 years",
      fee: "$180",
      city: "Los Angeles",
      rating: 4.8,
      reviews: 96,
      available: true,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
      badges: ['Expert', 'Fast Response'],
      responseTime: '10 min'
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialization: "Pediatrician",
      experience: "10 years",
      fee: "$120",
      city: "Chicago",
      rating: 4.7,
      reviews: 204,
      available: false,
      image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop&crop=face",
      badges: ['Child Specialist', 'Patient Favorite'],
      responseTime: '20 min'
    }
  ];

  const specialties = [
    { name: 'Cardiology', icon: Heart, patients: '2.5K+', color: 'from-red-500 to-pink-500' },
    { name: 'Dermatology', icon: Activity, patients: '1.8K+', color: 'from-blue-500 to-cyan-500' },
    { name: 'Neurology', icon: Brain, patients: '1.2K+', color: 'from-purple-500 to-violet-500' },
    { name: 'Pediatrics', icon: LucideHeartPulse, patients: '3.1K+', color: 'from-green-500 to-emerald-500' },
    { name: 'Orthopedics', icon: Target, patients: '1.5K+', color: 'from-yellow-500 to-orange-500' },
    { name: 'Gynecology', icon: Shield, patients: '2.2K+', color: 'from-pink-500 to-rose-500' },
    { name: 'Dentistry', icon: Award, patients: '2.0K+', color: 'from-indigo-500 to-blue-500' },
    { name: 'Psychiatry', icon: Brain, patients: '900+', color: 'from-teal-500 to-cyan-500' },
  ];

  const features = [
    {
      id: 1,
      icon: Cpu,
      title: "AI-Powered Matching",
      description: "Smart algorithm connects you with the perfect doctor based on symptoms, location, and preferences.",
      color: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      id: 2,
      icon: Lock,
      title: "Military-Grade Security",
      description: "End-to-end encryption for all medical records and conversations. HIPAA compliant.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      id: 3,
      icon: BatteryCharging,
      title: "24/7 Availability",
      description: "Round-the-clock access to doctors. Emergency consultations always available.",
      color: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      id: 4,
      icon: Cloud,
      title: "Cloud Medical Records",
      description: "Secure digital storage of all prescriptions, reports, and medical history.",
      color: "from-yellow-500 to-orange-500",
      delay: 0.4
    },
    {
      id: 5,
      icon: MessageSquare,
      title: "Instant Messaging",
      description: "Chat with doctors directly, share reports, and get quick responses.",
      color: "from-red-500 to-rose-500",
      delay: 0.5
    },
    {
      id: 6,
      icon: BarChart3,
      title: "Health Analytics",
      description: "Track your health metrics, set goals, and monitor progress over time.",
      color: "from-indigo-500 to-violet-500",
      delay: 0.6
    },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    toast.success(`Finding best doctors for: "${searchQuery}"`, {
      icon: '🔍',
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
      },
    });

    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              particle.type === 'blue' ? 'bg-gradient-to-r from-blue-400/30 to-cyan-400/30' :
              particle.type === 'purple' ? 'bg-gradient-to-r from-purple-400/30 to-pink-400/30' :
              'bg-gradient-to-r from-pink-400/30 to-rose-400/30'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <Header />
      
      {/* Hero Section - Premium Design */}
      <section className="relative pt-40 pb-60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#8882_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-[linear-gradient(#8882_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="max-w-6xl mx-auto">
              {/* Premium Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 backdrop-blur-sm mb-12 group hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <AwardIcon className="h-5 w-5 text-yellow-500 mr-3" />
                  </motion.div>
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    🏆 Trusted by 50,000+ Patients Nationwide
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-3"
                  >
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Main Hero Content */}
              <div className="text-center mb-16">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl lg:text-8xl font-bold mb-8 leading-tight"
                >
                  <span className="block text-gray-900">
                    Your Health, <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Our Priority</span>
                  </span>
                  <span className="block text-4xl lg:text-6xl font-normal text-gray-600 mt-6">
                    Book appointments with <span className="text-gradient font-semibold">verified doctors</span> in minutes
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed"
                >
                  Medicare Pro connects you with Pakistan's top healthcare professionals for 
                  <span className="text-gradient font-semibold"> video consultations</span>, 
                  <span className="text-gradient font-semibold"> clinic visits</span>, and 
                  <span className="text-gradient font-semibold"> emergency care</span>—all from one platform.
                </motion.p>
              </div>

              {/* Premium Search Component */}
              <AnimatedSection delay={0.6}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative max-w-5xl mx-auto mb-24"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative glass-card rounded-3xl p-2 shadow-2xl border border-white/40 backdrop-blur-xl">
                    <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-2">
                      <div className="flex-1">
                        <div className="flex items-center p-6">
                          <div className="relative">
                            <Search className="h-7 w-7 text-gray-400 mr-6" />
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute -inset-2 bg-blue-500/10 rounded-full"
                            />
                          </div>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by doctor name, specialty, symptoms, or condition..."
                            className="flex-1 text-xl bg-transparent outline-none placeholder-gray-400"
                          />
                          {searchQuery && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              type="button"
                              onClick={() => setSearchQuery('')}
                              className="ml-4 p-2 rounded-lg hover:bg-gray-100"
                            >
                              <X className="h-5 w-5 text-gray-400" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 border-t lg:border-t-0 lg:border-l border-gray-200/50">
                        <div className="flex items-center p-6">
                          <MapPin className="h-7 w-7 text-gray-400 mr-6" />
                          <select className="flex-1 text-xl bg-transparent outline-none appearance-none">
                            <option value="">Select City or Use Current Location</option>
                            <option value="karachi">Karachi</option>
                            <option value="lahore">Lahore</option>
                            <option value="islamabad">Islamabad</option>
                            <option value="rawalpindi">Rawalpindi</option>
                            <option value="faisalabad">Faisalabad</option>
                            <option value="multan">Multan</option>
                          </select>
                          <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSearching}
                        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-6 rounded-2xl hover:shadow-2xl transition-all flex items-center justify-center space-x-4 group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        {isSearching ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Search className="h-6 w-6" />
                            <span className="text-lg font-semibold">Find Doctors Now</span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </form>
                    
                    {/* Quick Search Tags */}
                    <div className="px-6 pb-6 pt-4">
                      <div className="text-sm text-gray-500 mb-3">Popular searches:</div>
                      <div className="flex flex-wrap gap-2">
                        {['Headache', 'Fever', 'Back Pain', 'Skin Issues', 'Anxiety', 'Diabetes'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* Animated Stats with Counter */}
              <AnimatedSection delay={0.8}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {[
                    { 
                      value: stats.doctors, 
                      label: "Verified Doctors", 
                      icon: Shield,
                      suffix: "+",
                      color: "from-blue-500 to-cyan-500" 
                    },
                    { 
                      value: stats.patients.toLocaleString(), 
                      label: "Happy Patients", 
                      icon: Users,
                      suffix: "+",
                      color: "from-purple-500 to-pink-500" 
                    },
                    { 
                      value: "24/7", 
                      label: "Support Available", 
                      icon: Clock,
                      suffix: "",
                      color: "from-green-500 to-emerald-500" 
                    },
                    { 
                      value: stats.satisfaction, 
                      label: "Satisfaction Rate", 
                      icon: Star,
                      suffix: "%",
                      color: "from-yellow-500 to-orange-500" 
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative glass-card p-8 rounded-3xl text-center hover-lift">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-6`}>
                          <stat.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                          {stat.value}<span className="text-gradient">{stat.suffix}</span>
                        </div>
                        <div className="text-gray-600 font-medium">{stat.label}</div>
                        
                        {/* Animated underline */}
                        <motion.div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 animate-pulse" />
                  <div className="relative p-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <Lightning className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
              </motion.div>
              
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                Why <span className="text-gradient">Choose Medicare Pro?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine cutting-edge technology with compassionate care to deliver the best healthcare experience
              </p>
            </div>
          </AnimatedSection>

          {/* Interactive Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -15, scale: 1.02 }}
                onHoverStart={() => setActiveFeature(index)}
                animate={activeFeature === index ? {
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                } : {}}
                transition={{ duration: 0.4, delay: feature.delay }}
                viewport={{ once: true }}
                className={`relative group cursor-pointer ${
                  activeFeature === index ? 'z-10' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="relative glass-card rounded-3xl p-8 h-full hover-lift">
                  <div className="flex items-start mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} mr-4`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  {/* Feature indicator */}
                  <motion.div
                    className={`h-1 w-full rounded-full bg-gradient-to-r ${feature.color} ${
                      activeFeature === index ? 'opacity-100' : 'opacity-30'
                    }`}
                    animate={activeFeature === index ? {
                      scaleX: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Specialties Carousel */}
          <AnimatedSection delay={0.4}>
            <div className="mb-20">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    Browse by <span className="text-gradient">Specialty</span>
                  </h3>
                  <p className="text-gray-600 mt-2">Find the right specialist for your needs</p>
                </div>
                <Link to="/find-doctors">
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>View All Specialties</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {specialties.map((spec, index) => (
                  <motion.button
                    key={spec.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSpecialty(spec.name)}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`relative group p-6 rounded-2xl text-center transition-all ${
                      selectedSpecialty === spec.name
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${spec.color} mb-4`}>
                      <spec.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 mb-2">{spec.name}</div>
                    <div className="text-sm text-gray-500">{spec.patients} patients</div>
                    
                    {selectedSpecialty === spec.name && (
                      <motion.div
                        layoutId="specialtyIndicator"
                        className="absolute inset-0 border-2 border-blue-500 rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Doctors - Premium Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mr-4"
                >
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <Stethoscope className="h-8 w-8 text-blue-600" />
                  </div>
                </motion.div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  Meet Our <span className="text-gradient">Top-Rated Doctors</span>
                </h2>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Board-certified specialists with proven track records of patient satisfaction
              </p>
            </div>
          </AnimatedSection>

          {/* Animated Doctor Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {featuredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -20, scale: 1.02 }}
                onHoverStart={() => setHoveredDoctor(doctor.id)}
                onHoverEnd={() => setHoveredDoctor(null)}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <DoctorCard doctor={doctor} />
              </motion.div>
            ))}
          </div>

          <AnimatedSection delay={0.8}>
            <div className="text-center">
              <Link to="/find-doctors">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-4 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl text-lg font-semibold hover-glow"
                >
                  <span>Explore All 500+ Doctors</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div className="gradient-bg absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          <motion.div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <AnimatedSection delay={0.3}>
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-8"
              >
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <InfinityIcon className="h-12 w-12" />
                </div>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl lg:text-6xl font-bold mb-8 leading-tight"
              >
                Ready to Transform Your
                <span className="block text-white/90">Healthcare Experience?</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed"
              >
                Join 50,000+ patients who trust Medicare Pro for their medical needs. 
                Start your journey to better health today.
              </motion.p>
              
              <div className="flex flex-col lg:flex-row gap-6 justify-center mb-16">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-blue-600 rounded-2xl hover:shadow-2xl text-lg font-semibold flex items-center justify-center space-x-4 group"
                  >
                    <Calendar className="h-6 w-6" />
                    <span>Get Started Free</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                  </motion.button>
                </Link>
                
                <Link to="/how-it-works">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-2xl hover:bg-white/20 text-lg font-semibold flex items-center justify-center space-x-4"
                  >
                    <Play className="h-5 w-5" />
                    <span>See How It Works</span>
                  </motion.button>
                </Link>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm"
              >
                {[
                  { icon: CheckCircle, text: 'No credit card required' },
                  { icon: Clock, text: 'Instant appointments' },
                  { icon: ShieldCheck, text: '100% secure & private' },
                  { icon: TrendingUp, text: 'Trusted by healthcare pros' },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center justify-center space-x-3 opacity-90"
                  >
                    <item.icon className="h-5 w-5 text-green-300" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Add missing X icon component
function X(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}