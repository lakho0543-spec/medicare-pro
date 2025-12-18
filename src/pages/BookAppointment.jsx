import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, MapPin, CreditCard, Shield, 
  CheckCircle, ArrowLeft, Sparkles, Zap, Star, 
  Users, Award, Phone, Video, MessageSquare,
  ChevronRight, Heart, AlertCircle, ShieldCheck,
  Download, Share2, Bell, Info, Lock, TrendingUp
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedConsultationType, setSelectedConsultationType] = useState('video');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced doctors data
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Sarah Johnson', 
      specialization: 'Senior Cardiologist', 
      fee: 150, 
      rating: 4.9,
      reviews: 128,
      experience: '12 years',
      nextAvailable: 'Today, 4:00 PM',
      image: '👩‍⚕️',
      badges: ['Top Rated', 'Fast Response', 'Patient Favorite'],
      languages: ['English', 'Urdu'],
      videoConsultation: true,
      availability: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-2PM']
    },
    { 
      id: 2, 
      name: 'Dr. Michael Chen', 
      specialization: 'Neurology Specialist', 
      fee: 180, 
      rating: 4.8,
      reviews: 96,
      experience: '8 years',
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: '👨‍⚕️',
      badges: ['Neurology Expert', 'AI Integration'],
      languages: ['English', 'Spanish'],
      videoConsultation: true,
      availability: ['Mon-Wed-Fri: 10AM-7PM']
    },
    { 
      id: 3, 
      name: 'Dr. Emily Davis', 
      specialization: 'Pediatric Consultant', 
      fee: 120, 
      rating: 4.7,
      reviews: 204,
      experience: '10 years',
      nextAvailable: 'Today, 3:00 PM',
      image: '👩‍⚕️',
      badges: ['Child Specialist', 'Parent Choice'],
      languages: ['English', 'Urdu', 'Punjabi'],
      videoConsultation: true,
      availability: ['Tue-Thu-Sat: 9AM-5PM']
    },
  ];

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '05:00 PM', available: false },
    { time: '06:00 PM', available: true },
  ];

  const consultationTypes = [
    { type: 'video', icon: Video, label: 'Video Consultation', description: 'HD video call from anywhere' },
    { type: 'clinic', icon: MapPin, label: 'Clinic Visit', description: 'In-person appointment' },
    { type: 'phone', icon: Phone, label: 'Phone Consultation', description: 'Audio call consultation' },
  ];

  const paymentMethods = [
    { id: 'card', icon: CreditCard, label: 'Credit/Debit Card', popular: true },
    { id: 'easypaisa', icon: TrendingUp, label: 'EasyPaisa', description: 'Instant payment' },
    { id: 'jazzcash', icon: TrendingUp, label: 'JazzCash', description: 'Quick transfer' },
    { id: 'bank', icon: Bank, label: 'Bank Transfer', description: 'Direct deposit' },
  ];

  const steps = [
    { number: 1, title: 'Select Doctor', icon: User },
    { number: 2, title: 'Date & Time', icon: Calendar },
    { number: 3, title: 'Consultation Type', icon: Video },
    { number: 4, title: 'Confirm & Pay', icon: CreditCard },
    { number: 5, title: 'Complete', icon: CheckCircle },
  ];

  const calculateTotal = () => {
    let total = selectedDoctor?.fee || 0;
    if (selectedConsultationType === 'video') total += 0; // No extra charge for video
    if (selectedConsultationType === 'phone') total -= 20; // Discount for phone
    return total;
  };

  const handleBookAppointment = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(
        <div>
          <div className="font-bold">Appointment Confirmed! 🎉</div>
          <div className="text-sm">Check your email for details</div>
        </div>,
        {
          duration: 4000,
          icon: '✅',
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          },
        }
      );
      
      setStep(5);
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReceipt = () => {
    toast.success('Receipt download started!');
  };

  const handleShareAppointment = () => {
    toast.success('Appointment details copied to clipboard!');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Progress Bar */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              {steps.map((stepItem) => (
                <div key={stepItem.number} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                      stepItem.number < step 
                        ? 'border-green-500 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                        : stepItem.number === step
                        ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {stepItem.number < step ? (
                      <CheckCircle className="h-7 w-7" />
                    ) : (
                      <stepItem.icon className="h-7 w-7" />
                    )}
                    {stepItem.number === step && (
                      <motion.div
                        className="absolute -inset-2 border-4 border-blue-500/30 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <span className="text-sm mt-3 font-medium text-gray-700">
                    {stepItem.title}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(step - 1) * 25}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Select Doctor */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      Select Your <span className="text-gradient">Healthcare Professional</span>
                    </h1>
                    <p className="text-gray-600">Choose from our verified medical specialists</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-600">All Doctors Verified</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <motion.div
                      key={doctor.id}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setStep(2);
                      }}
                      className="relative bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer group hover-lift"
                    >
                      {/* Premium Badge */}
                      {doctor.badges.includes('Top Rated') && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full">
                            <Award className="h-3 w-3 text-white" />
                            <span className="text-xs font-bold text-white">TOP RATED</span>
                          </div>
                        </div>
                      )}

                      <div className="p-8">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl">
                              {doctor.image}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900">{doctor.name}</h3>
                            <p className="text-gradient font-semibold">{doctor.specialization}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex">{renderStars(doctor.rating)}</div>
                              <span className="text-gray-600 text-sm">({doctor.rating}) • {doctor.reviews} reviews</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{doctor.experience} experience</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-semibold">Available Now</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {doctor.badges.map((badge, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                {badge}
                              </span>
                            ))}
                          </div>

                          <div className="pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-3xl font-bold text-gray-900">${doctor.fee}</div>
                                <div className="text-sm text-gray-500">per consultation</div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg"
                              >
                                Select Doctor
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center pt-8 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">Can't find the right doctor?</p>
                  <Link to="/find-doctors">
                    <button className="px-8 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50">
                      Browse All Specialists
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && selectedDoctor && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                {/* Navigation */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Doctors
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="px-4 py-2 bg-blue-50 rounded-xl">
                      <span className="font-semibold text-blue-600">Step 2 of 5</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Date Picker */}
                  <div className="lg:col-span-2">
                    <div className="glass-card rounded-3xl p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100">
                          <Calendar className="h-7 w-7 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">Select Date & Time</h2>
                          <p className="text-gray-600">Choose your preferred appointment slot</p>
                        </div>
                      </div>

                      {/* Date Selection */}
                      <div className="mb-10">
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">Select Date</h3>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">Available Time Slots</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {timeSlots.map((slot) => (
                            <motion.button
                              key={slot.time}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTime(slot.time)}
                              disabled={!slot.available}
                              className={`p-4 rounded-2xl border-2 transition-all text-center ${
                                selectedTime === slot.time
                                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                                  : slot.available
                                  ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                  : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <div className="font-semibold">{slot.time}</div>
                              <div className="text-sm mt-1">
                                {slot.available ? 'Available' : 'Booked'}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Summary */}
                  <div className="space-y-8">
                    {/* Doctor Summary */}
                    <div className="glass-card rounded-3xl p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
                            {selectedDoctor.image}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{selectedDoctor.name}</h3>
                          <p className="text-gradient font-semibold">{selectedDoctor.specialization}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Consultation Fee</span>
                          <span className="font-bold text-gray-900">${selectedDoctor.fee}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Next Available</span>
                          <span className="font-semibold text-green-600">{selectedDoctor.nextAvailable}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Languages</span>
                          <div className="flex gap-1">
                            {selectedDoctor.languages.map((lang, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        <h4 className="font-bold text-gray-900">Why Choose This Doctor</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>98% Patient Satisfaction</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>Average Response: 15 mins</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                          <span>PMDC Verified & Licensed</span>
                        </div>
                      </div>
                    </div>

                    {/* Next Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                        selectedDate && selectedTime
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue to Next Step
                      <ChevronRight className="inline-block ml-2 h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Consultation Type */}
            {step === 3 && selectedDoctor && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Schedule
                  </button>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold text-blue-600">Step 3 of 5</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Consultation Options */}
                  <div className="lg:col-span-2">
                    <div className="glass-card rounded-3xl p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100">
                          <Video className="h-7 w-7 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">Consultation Type</h2>
                          <p className="text-gray-600">Choose how you'd like to connect with your doctor</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {consultationTypes.map((type) => (
                          <motion.button
                            key={type.type}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedConsultationType(type.type)}
                            className={`p-6 rounded-2xl border-2 transition-all text-left ${
                              selectedConsultationType === type.type
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className={`p-3 rounded-xl inline-block mb-4 ${
                              selectedConsultationType === type.type
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <type.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{type.label}</h3>
                            <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                            {type.type === 'video' && (
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <Zap className="h-4 w-4" />
                                <span>Most Popular</span>
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Additional Info */}
                      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Info className="h-5 w-5 text-blue-600" />
                          <h4 className="font-bold text-gray-900">What to Expect</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-2">📅</div>
                            <div className="text-sm font-medium text-gray-900">Instant Booking</div>
                            <div className="text-xs text-gray-600">No waiting time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-2">🔒</div>
                            <div className="text-sm font-medium text-gray-900">Secure & Private</div>
                            <div className="text-xs text-gray-600">End-to-end encrypted</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 mb-2">💾</div>
                            <div className="text-sm font-medium text-gray-900">Records Saved</div>
                            <div className="text-xs text-gray-600">Access anytime</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Next */}
                  <div className="space-y-8">
                    {/* Price Summary */}
                    <div className="glass-card rounded-3xl p-6">
                      <h4 className="font-bold text-gray-900 mb-6">Price Summary</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Consultation Fee</span>
                          <span className="font-semibold">${selectedDoctor.fee}</span>
                        </div>
                        {selectedConsultationType === 'phone' && (
                          <div className="flex items-center justify-between text-green-600">
                            <span>Phone Consultation Discount</span>
                            <span className="font-semibold">- $20</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Platform Fee</span>
                          <span className="font-semibold">Free</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900">Total Amount</span>
                            <div className="text-2xl font-bold text-gradient">${calculateTotal()}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insurance Info */}
                    <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="h-5 w-5 text-green-600" />
                        <h4 className="font-bold text-gray-900">Insurance Coverage</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Most insurance plans accepted. Contact your provider for details.
                      </p>
                      <button className="w-full py-2 border-2 border-green-500 text-green-600 rounded-xl text-sm font-semibold hover:bg-green-50">
                        Check Insurance Eligibility
                      </button>
                    </div>

                    {/* Next Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(4)}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
                    >
                      Proceed to Payment
                      <CreditCard className="inline-block ml-2 h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && selectedDoctor && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Consultation
                  </button>
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-blue-600">Step 4 of 5 • Secure Payment</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Payment Methods */}
                  <div className="lg:col-span-2">
                    <div className="glass-card rounded-3xl p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-100 to-amber-100">
                          <CreditCard className="h-7 w-7 text-yellow-600" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">Payment Method</h2>
                          <p className="text-gray-600">Choose your preferred payment option</p>
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {paymentMethods.map((method) => (
                          <motion.button
                            key={method.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`p-4 rounded-2xl border-2 transition-all text-left ${
                              paymentMethod === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <method.icon className={`h-6 w-6 ${
                                paymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                              }`} />
                              <div>
                                <div className="font-semibold text-gray-900">{method.label}</div>
                                {method.description && (
                                  <div className="text-sm text-gray-600">{method.description}</div>
                                )}
                              </div>
                              {method.popular && (
                                <div className="ml-auto px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-xs font-bold text-white">
                                  POPULAR
                                </div>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Payment Form */}
                      {showPaymentForm && paymentMethod === 'card' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                              </label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Security Assurance */}
                      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <ShieldCheck className="h-5 w-5 text-green-600" />
                          <h4 className="font-bold text-gray-900">100% Secure Payment</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-xl mb-2">🔒</div>
                            <div className="text-xs font-medium text-gray-900">SSL Encrypted</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl mb-2">🛡️</div>
                            <div className="text-xs font-medium text-gray-900">PCI DSS Compliant</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl mb-2">🤝</div>
                            <div className="text-xs font-medium text-gray-900">Money Back Guarantee</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-8">
                    {/* Appointment Details */}
                    <div className="glass-card rounded-3xl p-6">
                      <h4 className="font-bold text-gray-900 mb-6">Appointment Details</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              {selectedDoctor.image}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{selectedDoctor.name}</div>
                            <div className="text-sm text-gray-600">{selectedDoctor.specialization}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Date</span>
                            <span className="font-medium">{selectedDate}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Time</span>
                            <span className="font-medium">{selectedTime}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Type</span>
                            <span className="font-medium capitalize">{selectedConsultationType}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">Consultation Fee</span>
                            <span className="font-semibold">${selectedDoctor.fee}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Total Amount</span>
                            <div className="text-2xl font-bold text-gradient">${calculateTotal()}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Confirmation Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBookAppointment}
                      disabled={isLoading}
                      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all relative overflow-hidden ${
                        isLoading 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl'
                      } text-white`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Payment...
                        </div>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                          <span className="relative flex items-center justify-center gap-3">
                            <Lock className="h-6 w-6" />
                            Confirm & Pay ${calculateTotal()}
                            <CheckCircle className="h-5 w-5" />
                          </span>
                        </>
                      )}
                    </motion.button>

                    {/* Guarantee */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        ✅ 100% Money-back guarantee if not satisfied
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Success */}
            {step === 5 && selectedDoctor && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="max-w-2xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-block mb-8"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                      <div className="relative w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  <h2 className="text-5xl font-bold text-gray-900 mb-6">
                    Appointment <span className="text-gradient">Confirmed!</span>
                  </h2>
                  
                  <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
                    Your appointment with {selectedDoctor.name} has been successfully booked.
                    You'll receive a confirmation email with all the details shortly.
                  </p>

                  {/* Appointment Card */}
                  <div className="glass-card rounded-3xl p-8 mb-10 text-left">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl">
                            {selectedDoctor.image}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{selectedDoctor.name}</h3>
                          <p className="text-gradient font-semibold">{selectedDoctor.specialization}</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <span className="font-bold text-green-600">CONFIRMED</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 rounded-2xl bg-blue-50">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-gray-900">Date</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{selectedDate}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-purple-50">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="h-5 w-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">Time</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{selectedTime}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-green-50">
                        <div className="flex items-center gap-3 mb-2">
                          <Video className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-gray-900">Type</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 capitalize">{selectedConsultationType}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div>
                        <div className="text-sm text-gray-600">Appointment ID</div>
                        <div className="font-mono font-bold text-gray-900">APT-{Date.now().toString().slice(-8)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Total Paid</div>
                        <div className="text-2xl font-bold text-gradient">${calculateTotal()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link to="/patient-dashboard">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl"
                      >
                        Go to Dashboard
                      </motion.button>
                    </Link>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownloadReceipt}
                      className="w-full py-4 border-2 border-blue-500 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Download className="h-5 w-5" />
                        Download Receipt
                      </div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShareAppointment}
                      className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Share2 className="h-5 w-5" />
                        Share Details
                      </div>
                    </motion.button>
                  </div>

                  {/* Next Steps */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-6">What's Next?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                        <div className="text-2xl mb-3">📧</div>
                        <div className="font-semibold text-gray-900 mb-2">Confirmation Email</div>
                        <div className="text-sm text-gray-600">Check your inbox for appointment details</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                        <div className="text-2xl mb-3">🔔</div>
                        <div className="font-semibold text-gray-900 mb-2">Reminder</div>
                        <div className="text-sm text-gray-600">Get notified 1 hour before appointment</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50">
                        <div className="text-2xl mb-3">🎥</div>
                        <div className="font-semibold text-gray-900 mb-2">Join Consultation</div>
                        <div className="text-sm text-gray-600">Click link in email to join video call</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
