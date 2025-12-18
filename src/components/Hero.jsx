import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  Search, Calendar, MapPin, Heart, Sparkles, Zap, 
  Users, Clock, Shield, Award, TrendingUp, Star,
  ArrowRight, Play, Download, Globe, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();

  const specializations = [
    { name: 'Cardiology', icon: '❤️', count: 45 },
    { name: 'Dermatology', icon: '✨', count: 32 },
    { name: 'Neurology', icon: '🧠', count: 28 },
    { name: 'Pediatrics', icon: '👶', count: 36 },
    { name: 'Orthopedics', icon: '🦴', count: 39 },
    { name: 'Gynecology', icon: '🌸', count: 27 },
    { name: 'Dentistry', icon: '🦷', count: 41 },
    { name: 'Psychiatry', icon: '🧠', count: 18 },
  ];

  const cities = [
    { name: 'Karachi', doctors: '120+ Doctors' },
    { name: 'Lahore', doctors: '95+ Doctors' },
    { name: 'Islamabad', doctors: '78+ Doctors' },
    { name: 'Rawalpindi', doctors: '65+ Doctors' },
    { name: 'Faisalabad', doctors: '52+ Doctors' },
    { name: 'Multan', doctors: '48+ Doctors' },
    { name: 'Peshawar', doctors: '42+ Doctors' },
    { name: 'Quetta', doctors: '35+ Doctors' },
  ];

  const stats = [
    { value: '500+', label: 'Verified Doctors', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { value: '50K+', label: 'Happy Patients', icon: Heart, color: 'from-purple-500 to-pink-500' },
    { value: '24/7', label: 'Support Available', icon: Clock, color: 'from-green-500 to-emerald-500' },
    { value: '98%', label: 'Satisfaction Rate', icon: Star, color: 'from-yellow-500 to-orange-500' },
  ];

  const floatingElements = [
    { icon: '🏥', top: '10%', left: '5%', delay: 0 },
    { icon: '💊', top: '20%', right: '8%', delay: 0.5 },
    { icon: '🩺', top: '60%', left: '3%', delay: 1 },
    { icon: '📱', bottom: '20%', right: '12%', delay: 1.5 },
    { icon: '🏆', top: '30%', right: '15%', delay: 2 },
  ];

  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    });
  }, [controls]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/find-doctors?search=${encodeURIComponent(searchQuery)}&city=${selectedCity}`);
      toast.success('Searching for doctors...');
    }
  };

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  const handleDoctorJoin = () => {
    navigate('/signup?type=doctor');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/10" />
      
      {/* Floating Medical Elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut"
          }}
          className="absolute text-4xl"
          style={{ top: el.top, left: el.left, right: el.right, bottom: el.bottom }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Trust Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm"
            >
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🏆 Trusted by 50,000+ Patients
              </span>
              <TrendingUp className="h-5 w-5 text-green-500 animate-pulse" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight"
            >
              <span className="block">Healthcare Made</span>
              <span className="block">
                <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                  Simple & Accessible
                </span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block ml-4 text-6xl"
                >
                  👨‍⚕️
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with Pakistan's top healthcare professionals instantly. 
              <span className="font-semibold text-blue-600"> Book appointments</span>, 
              <span className="font-semibold text-purple-600"> video consultations</span>, and 
              <span className="font-semibold text-green-600"> digital prescriptions</span> in one platform.
            </motion.p>
          </div>

          {/* Main Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-2 border border-white/40">
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-2">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="relative flex items-center p-4 lg:p-6 bg-white rounded-2xl">
                      <Search className="h-6 w-6 text-blue-500 mr-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by doctor name, specialization, or symptoms..."
                        className="flex-1 text-lg md:text-xl bg-transparent outline-none placeholder-gray-400"
                      />
                      <div className="hidden lg:flex items-center gap-2 ml-4">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm text-gray-500">AI-Powered Search</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* City Selector */}
                <div className="flex-1">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="relative flex items-center p-4 lg:p-6 bg-white rounded-2xl border-l lg:border-l border-gray-200/50">
                      <MapPin className="h-6 w-6 text-purple-500 mr-4" />
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="flex-1 text-lg md:text-xl bg-transparent outline-none appearance-none"
                      >
                        <option value="">Select Your City</option>
                        {cities.map(city => (
                          <option key={city.name} value={city.name}>
                            {city.name} ({city.doctors})
                          </option>
                        ))}
                      </select>
                      <Globe className="h-5 w-5 text-gray-400 ml-4" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 lg:px-12 py-6 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-3">
                    <Search className="h-6 w-6" />
                    <span>Find Doctors</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
              </form>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-purple-500" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-yellow-500" />
                <span>Verified Doctors</span>
              </div>
            </div>
          </motion.div>

          {/* Specialization Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              <span className="text-gradient">Popular Specializations</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {specializations.map((spec, index) => (
                <motion.button
                  key={spec.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSpecialty(spec.name)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    activeSpecialty === spec.name
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <span className="text-xl">{spec.icon}</span>
                  <span>{spec.name}</span>
                  <span className="text-sm opacity-80">{spec.count}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookAppointment}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Calendar className="h-7 w-7" />
              <span>Book Appointment Now</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDoctorJoin}
              className="group relative px-10 py-5 rounded-2xl text-xl font-bold border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-4"
            >
              <Target className="h-7 w-7" />
              <span>Join as Healthcare Provider</span>
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </motion.button>

            {/* Video CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVideo(true)}
              className="group flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                <div className="relative w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Play className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-left">
                <div className="font-semibold">See How It Works</div>
                <div className="text-sm text-gray-500">2 minute video</div>
              </div>
            </motion.button>
          </motion.div>

          {/* App Download Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 pt-12 border-t border-gray-200/50"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-3xl">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Download Our Mobile App
                </h3>
                <p className="text-gray-600">
                  Access healthcare on the go with our feature-packed mobile application
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
                >
                  <div className="text-2xl">📱</div>
                  <div>
                    <div className="text-xs">Download on</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
                >
                  <div className="text-2xl">🤖</div>
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="url(#wave-gradient)"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="url(#wave-gradient)"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="url(#wave-gradient)"></path>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
