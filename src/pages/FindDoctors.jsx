import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, MapPin, Star, Clock, Award,
  Heart, Shield, Users, Calendar, Video, Phone,
  ChevronDown, ChevronUp, CheckCircle, X,
  Sparkles, Zap, Target, Brain, Activity, Eye,
  Stethoscope, TrendingUp, ArrowRight,
  MessageSquare, Bookmark, BookmarkCheck,
  DollarSign, Thermometer, Circle, User,
  Plus, Minus, Settings, HelpCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function FindDoctors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 500]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [savedDoctors, setSavedDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi',
    'Faisalabad', 'Multan', 'Peshawar', 'Quetta',
    'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha'
  ];

  const specialties = [
    { name: 'Cardiology', icon: Heart, color: 'from-red-500 to-pink-500', doctors: 45 },
    { name: 'Neurology', icon: Brain, color: 'from-purple-500 to-violet-500', doctors: 32 },
    { name: 'Dermatology', icon: Activity, color: 'from-blue-500 to-cyan-500', doctors: 28 },
    { name: 'Pediatrics', icon: User, color: 'from-green-500 to-emerald-500', doctors: 56 }, // Using User for Pediatrics
    { name: 'Orthopedics', icon: Target, color: 'from-yellow-500 to-orange-500', doctors: 39 }, // Using Target
    { name: 'Gynecology', icon: Circle, color: 'from-pink-500 to-rose-500', doctors: 41 }, // Using Circle
    { name: 'Dentistry', icon: Award, color: 'from-indigo-500 to-blue-500', doctors: 67 }, // Using Award
    { name: 'Psychiatry', icon: Brain, color: 'from-teal-500 to-cyan-500', doctors: 23 }, // Using Brain
    { name: 'ENT', icon: Eye, color: 'from-amber-500 to-yellow-500', doctors: 34 }, // Using Eye
    { name: 'General Physician', icon: Stethoscope, color: 'from-lime-500 to-green-500', doctors: 89 },
    { name: 'Eye Specialist', icon: Eye, color: 'from-sky-500 to-blue-500', doctors: 38 },
    { name: 'Emergency Medicine', icon: Thermometer, color: 'from-rose-500 to-red-500', doctors: 27 },
  ];

  const availabilityOptions = [
    { label: 'Available Now', value: 'now', icon: Clock },
    { label: '24/7 Emergency', value: 'emergency', icon: Shield },
    { label: 'Video Consult', value: 'video', icon: Video },
    { label: 'Weekends Only', value: 'weekends', icon: Calendar },
  ];

  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200+', min: 200, max: 500 },
  ];

  const ratings = [4.5, 4.0, 3.5, 3.0];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "12 years",
      fee: 150,
      city: "Karachi",
      rating: 4.9,
      reviews: 128,
      available: true,
      availability: "Available Today",
      responseTime: "15 min",
      languages: ["English", "Urdu"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      badges: ["Top Rated", "24/7 Available"],
      nextAvailable: "Today, 4:00 PM",
      videoConsult: true,
      insurance: ["Adamjee", "EFU"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      experience: "8 years",
      fee: 180,
      city: "Lahore",
      rating: 4.8,
      reviews: 96,
      available: true,
      availability: "Available Tomorrow",
      responseTime: "10 min",
      languages: ["English", "Punjabi"],
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
      badges: ["Expert", "Fast Response"],
      nextAvailable: "Tomorrow, 10:00 AM",
      videoConsult: true,
      insurance: ["Jubilee", "IGI"],
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialization: "Pediatrician",
      experience: "10 years",
      fee: 120,
      city: "Islamabad",
      rating: 4.7,
      reviews: 204,
      available: false,
      availability: "Available Next Week",
      responseTime: "20 min",
      languages: ["English", "Urdu"],
      image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop&crop=face",
      badges: ["Child Specialist", "Patient Favorite"],
      nextAvailable: "Monday, 9:00 AM",
      videoConsult: false,
      insurance: ["Adamjee", "EFU", "Jubilee"],
    },
    {
      id: 4,
      name: "Dr. Ahmed Khan",
      specialization: "Orthopedic Surgeon",
      experience: "15 years",
      fee: 200,
      city: "Karachi",
      rating: 4.9,
      reviews: 187,
      available: true,
      availability: "Available Now",
      responseTime: "5 min",
      languages: ["English", "Urdu", "Sindhi"],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      badges: ["Senior Surgeon", "Emergency"],
      nextAvailable: "Today, 3:00 PM",
      videoConsult: true,
      insurance: ["All Major"],
    },
    {
      id: 5,
      name: "Dr. Maria Garcia",
      specialization: "Dermatologist",
      experience: "7 years",
      fee: 90,
      city: "Lahore",
      rating: 4.6,
      reviews: 142,
      available: true,
      availability: "Available Today",
      responseTime: "25 min",
      languages: ["English", "Punjabi"],
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop&crop=face",
      badges: ["Skin Expert", "Acne Specialist"],
      nextAvailable: "Today, 6:00 PM",
      videoConsult: true,
      insurance: ["EFU", "IGI"],
    },
    {
      id: 6,
      name: "Dr. Robert Wilson",
      specialization: "ENT Specialist",
      experience: "11 years",
      fee: 110,
      city: "Rawalpindi",
      rating: 4.5,
      reviews: 89,
      available: true,
      availability: "Available Now",
      responseTime: "15 min",
      languages: ["English", "Urdu"],
      image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=400&fit=crop&crop=face",
      badges: ["ENT Expert", "Quick Response"],
      nextAvailable: "Today, 2:30 PM",
      videoConsult: false,
      insurance: ["Adamjee"],
    },
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = !searchQuery || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = !selectedCity || doctor.city === selectedCity;
    const matchesSpecialty = !selectedSpecialty || doctor.specialization === selectedSpecialty;
    const matchesPrice = doctor.fee >= selectedPriceRange[0] && doctor.fee <= selectedPriceRange[1];
    const matchesRating = !selectedRating || doctor.rating >= selectedRating;
    
    return matchesSearch && matchesCity && matchesSpecialty && matchesPrice && matchesRating;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    toast.success(`Found ${filteredDoctors.length} doctors matching your criteria`, {
      icon: '🔍',
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
      },
    });

    setTimeout(() => setLoading(false), 1000);
  };

  const toggleSaveDoctor = (doctorId) => {
    setSavedDoctors(prev => 
      prev.includes(doctorId)
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
    
    const isSaved = savedDoctors.includes(doctorId);
    toast.success(isSaved ? 'Removed from saved' : 'Saved to favorites', {
      icon: isSaved ? '❌' : '💖',
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedSpecialty('');
    setSelectedAvailability('');
    setSelectedPriceRange([0, 500]);
    setSelectedRating(0);
    toast.success('All filters cleared');
  };

  const stats = [
    { label: 'Total Doctors', value: '500+', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Cities Covered', value: '25+', icon: MapPin, color: 'from-purple-500 to-pink-500' },
    { label: 'Avg. Response Time', value: '15 min', icon: Clock, color: 'from-green-500 to-emerald-500' },
    { label: 'Patient Satisfaction', value: '98%', icon: Star, color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse" />
                  <div className="relative p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
                    <Stethoscope className="h-12 w-12 text-white" />
                    <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-300" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Find the <span className="text-gradient">Perfect Doctor</span> for You
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Browse through Pakistan's largest network of verified healthcare professionals. 
                Filter by specialty, location, availability, and more.
              </p>
            </motion.div>

            {/* Main Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-2 shadow-2xl mb-16"
            >
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-2">
                {/* Search Input */}
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
                      placeholder="Search by doctor name, specialty, symptoms..."
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

                {/* City Selector */}
                <div className="flex-1 border-t lg:border-t-0 lg:border-l border-gray-200/50">
                  <div className="flex items-center p-6">
                    <MapPin className="h-7 w-7 text-gray-400 mr-6" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="flex-1 text-xl bg-transparent outline-none appearance-none"
                    >
                      <option value="">All Cities</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 ml-2" />
                  </div>
                </div>

                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-6 rounded-2xl hover:shadow-2xl transition-all flex items-center justify-center space-x-4 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Search className="h-6 w-6" />
                      <span className="text-lg font-semibold">Find Doctors</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Quick Filters */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">Quick filters:</div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Filter className="h-5 w-5" />
                    <span>{showFilters ? 'Hide' : 'Show'} Advanced Filters</span>
                    {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </motion.button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {specialties.slice(0, 6).map(spec => (
                    <button
                      key={spec.name}
                      onClick={() => setSelectedSpecialty(
                        selectedSpecialty === spec.name ? '' : spec.name
                      )}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                        selectedSpecialty === spec.name
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-white border border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      <spec.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{spec.name}</span>
                      <span className="text-xs opacity-75">({spec.doctors})</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-3xl text-center hover-lift"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-y border-gray-200"
          >
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Specialty Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                    Specialty
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {specialties.map(spec => (
                      <button
                        key={spec.name}
                        onClick={() => setSelectedSpecialty(
                          selectedSpecialty === spec.name ? '' : spec.name
                        )}
                        className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${
                          selectedSpecialty === spec.name
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${spec.color} mr-3`}>
                            <spec.icon className="h-4 w-4 text-white" />
                          </div>
                          <span>{spec.name}</span>
                        </div>
                        <div className="text-sm text-gray-500">{spec.doctors}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* City Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-600" />
                    City
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {cities.map(city => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(
                          selectedCity === city ? '' : city
                        )}
                        className={`p-3 rounded-xl text-sm transition-all ${
                          selectedCity === city
                            ? 'bg-green-50 text-green-600 border border-green-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-yellow-600" />
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <div className="px-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>${selectedPriceRange[0]}</span>
                        <span>${selectedPriceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={selectedPriceRange[1]}
                        onChange={(e) => setSelectedPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <button
                          key={range.label}
                          onClick={() => setSelectedPriceRange([range.min, range.max])}
                          className={`w-full p-2 rounded-lg text-sm transition-all ${
                            selectedPriceRange[0] === range.min && selectedPriceRange[1] === range.max
                              ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rating & Availability */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-purple-600" />
                    Rating & Availability
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Minimum Rating</div>
                      <div className="flex gap-2">
                        {ratings.map(rating => (
                          <button
                            key={rating}
                            onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                            className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                              selectedRating === rating
                                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            {rating}+ ★
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Availability</div>
                      <div className="space-y-2">
                        {availabilityOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => setSelectedAvailability(
                              selectedAvailability === option.value ? '' : option.value
                            )}
                            className={`flex items-center w-full p-2 rounded-lg text-sm transition-all ${
                              selectedAvailability === option.value
                                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <option.icon className="h-4 w-4 mr-2" />
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredDoctors.length}</span> of {doctors.length} doctors
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Clear All Filters
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg"
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Available Doctors
                <span className="text-gradient"> ({filteredDoctors.length})</span>
              </h2>
              <p className="text-gray-600 mt-2">Verified healthcare professionals ready to help</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveView('grid')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeView === 'grid'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeView === 'list'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
              </div>
              
              <div className="text-sm text-gray-500">
                Sort by:
                <select className="ml-2 bg-transparent outline-none">
                  <option>Relevance</option>
                  <option>Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Experience</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No doctors found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              activeView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}>
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden ${
                    activeView === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Doctor Image */}
                  <div className={`relative ${
                    activeView === 'list' ? 'w-48' : 'h-48'
                  }`}>
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className={`w-full h-full object-cover ${
                        activeView === 'list' ? 'rounded-l-3xl' : 'rounded-t-3xl'
                      }`}
                    />
                    <div className="absolute top-4 right-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSaveDoctor(doctor.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl"
                      >
                        {savedDoctors.includes(doctor.id) ? (
                          <BookmarkCheck className="h-5 w-5 text-pink-600" />
                        ) : (
                          <Bookmark className="h-5 w-5 text-gray-600 hover:text-pink-600" />
                        )}
                      </motion.button>
                    </div>
                    {!doctor.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-3xl">
                        <span className="text-white font-semibold">Not Available</span>
                      </div>
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className={`p-6 ${activeView === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                        <p className="text-gradient font-semibold">{doctor.specialization}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="font-bold">{doctor.rating}</span>
                        <span className="text-gray-500 text-sm">({doctor.reviews})</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Award className="h-4 w-4 mr-3 text-blue-500" />
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-3 text-green-500" />
                        <span>{doctor.city}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-3 text-purple-500" />
                        <span>Response: {doctor.responseTime}</span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {doctor.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                      {doctor.videoConsult && (
                        <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                          Video Consult
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">${doctor.fee}</div>
                        <div className="text-sm text-gray-500">per consultation</div>
                      </div>
                      <div className="flex space-x-3">
                        <Link to={`/doctor-profile/${doctor.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
                          >
                            View Profile
                          </motion.button>
                        </Link>
                        <Link to={`/book-appointment?doctor=${doctor.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!doctor.available}
                            className={`px-4 py-2 rounded-xl font-medium ${
                              doctor.available
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                          >
                            Book Now
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredDoctors.length > 0 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex space-x-2">
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-8"
            >
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Shield className="h-12 w-12" />
              </div>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Can't Find Your Doctor?
              <span className="block text-white/90">We'll Help You Find One</span>
            </h2>
            
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Our team can match you with the perfect specialist based on your specific needs and preferences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-blue-600 rounded-2xl hover:shadow-2xl text-lg font-semibold flex items-center justify-center space-x-4"
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>Get Personal Assistance</span>
                </motion.button>
              </Link>
              
              <button
                onClick={() => toast.success('Our team will contact you within 24 hours')}
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-2xl hover:bg-white/20 text-lg font-semibold flex items-center justify-center space-x-4"
              >
                <Phone className="h-6 w-6" />
                <span>Request Callback</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}