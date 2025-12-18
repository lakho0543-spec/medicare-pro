import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Stethoscope, Mail, Lock, Eye, EyeOff,
  Phone, MapPin, Calendar, Award, Briefcase,
  Shield, CheckCircle, FileText, GraduationCap,
  Sparkles, Zap, Heart, TrendingUp
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

export default function Signup() {
  const [userType, setUserType] = useState('patient');
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    
    // Patient specific
    dob: '',
    gender: '',
    bloodGroup: '',
    
    // Doctor specific
    specialization: '',
    qualification: '',
    experience: '',
    licenseNumber: '',
    hospital: '',
    consultationFee: ''
  });

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        toast.error('Please fill all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevious = () => step > 1 && setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`${userType === 'doctor' ? 'Doctor' : 'Patient'} account created successfully!`, {
        icon: '🎉',
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      });

      if (userType === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const specializations = [
    'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics',
    'Orthopedics', 'Gynecology', 'Psychiatry', 'Dentistry',
    'General Physician', 'ENT Specialist', 'Eye Specialist'
  ];

  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi',
    'Faisalabad', 'Multan', 'Peshawar', 'Quetta'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                      s <= step 
                        ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {s < step ? (
                      <CheckCircle className="h-7 w-7" />
                    ) : (
                      <span className="text-xl font-bold">{s}</span>
                    )}
                    {s === step && (
                      <motion.div
                        className="absolute -inset-2 border-4 border-blue-500/30 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <span className="text-sm mt-3 font-medium">
                    {s === 1 ? 'Account Type' : s === 2 ? `${userType} Details` : 'Complete'}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(step - 1) * 50}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="glass-card rounded-2xl p-8 sticky top-24">
                <h3 className="text-2xl font-bold mb-8 text-gradient">Join Medicare Pro</h3>
                
                <div className="space-y-4">
                  {['patient', 'doctor'].map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setUserType(type)}
                      className={`w-full p-6 rounded-xl border-2 transition-all ${
                        userType === type
                          ? type === 'doctor'
                            ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                            : 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`p-3 rounded-xl mr-4 ${
                          userType === type
                            ? type === 'doctor'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {type === 'doctor' ? (
                            <Stethoscope className="h-7 w-7" />
                          ) : (
                            <User className="h-7 w-7" />
                          )}
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-lg capitalize">{type}</div>
                          <div className="text-sm text-gray-500">
                            {type === 'doctor' ? 'Manage practice' : 'Book appointments'}
                          </div>
                        </div>
                        {userType === type && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Benefits */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h4 className="font-bold mb-6 text-gradient">
                    {userType === 'doctor' ? 'Doctor Benefits' : 'Why Join Us'}
                  </h4>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={userType}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {userType === 'doctor' ? (
                        <>
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-500 mr-3" />
                            <span className="text-sm">Grow Your Practice</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                            <span className="text-sm">Smart Scheduling</span>
                          </div>
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 text-purple-500 mr-3" />
                            <span className="text-sm">Secure Platform</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center">
                            <Heart className="h-5 w-5 text-pink-500 mr-3" />
                            <span className="text-sm">Personalized Care</span>
                          </div>
                          <div className="flex items-center">
                            <Zap className="h-5 w-5 text-yellow-500 mr-3" />
                            <span className="text-sm">Instant Booking</span>
                          </div>
                          <div className="flex items-center">
                            <Sparkles className="h-5 w-5 text-purple-500 mr-3" />
                            <span className="text-sm">Premium Features</span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Already have account */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-gradient font-bold">
                      Sign in here
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center mb-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`p-4 rounded-2xl mr-6 ${
                      userType === 'doctor' 
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100' 
                        : 'bg-gradient-to-r from-blue-100 to-cyan-100'
                    }`}
                  >
                    {userType === 'doctor' ? (
                      <Stethoscope className="h-10 w-10 text-purple-600" />
                    ) : (
                      <User className="h-10 w-10 text-blue-600" />
                    )}
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {userType === 'doctor' ? 'Doctor' : 'Patient'} Registration
                    </h2>
                    <p className="text-gray-600">
                      Step {step} of 3 • {step === 1 ? 'Basic Information' : step === 2 ? `${userType} Details` : 'Complete'}
                    </p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-auto"
                  >
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                </div>

                <AnimatePresence mode="wait">
                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                    >
                      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="John Doe"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="you@example.com"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="+92 300 1234567"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              City
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <select
                                value={formData.city}
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none"
                                required
                              >
                                <option value="">Select City</option>
                                {cities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="••••••••"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <Eye className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="••••••••"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <Eye className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-xl"
                          >
                            Next: {userType === 'doctor' ? 'Professional Details' : 'Personal Details'} →
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                    >
                      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
                        {userType === 'doctor' ? (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  Specialization
                                </label>
                                <div className="relative">
                                  <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <select
                                    value={formData.specialization}
                                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    required
                                  >
                                    <option value="">Select Specialization</option>
                                    {specializations.map(spec => (
                                      <option key={spec} value={spec}>{spec}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  Experience
                                </label>
                                <div className="relative">
                                  <Award className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <select
                                    value={formData.experience}
                                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    required
                                  >
                                    <option value="">Select Experience</option>
                                    {['0-2 years', '3-5 years', '6-10 years', '10+ years'].map(exp => (
                                      <option key={exp} value={exp}>{exp}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  License Number
                                </label>
                                <div className="relative">
                                  <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <input
                                    type="text"
                                    value={formData.licenseNumber}
                                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="PMDC-12345"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  Qualification
                                </label>
                                <div className="relative">
                                  <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <input
                                    type="text"
                                    value={formData.qualification}
                                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="MBBS, FCPS, etc."
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  Date of Birth
                                </label>
                                <input
                                  type="date"
                                  value={formData.dob}
                                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  Gender
                                </label>
                                <select
                                  value={formData.gender}
                                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="flex justify-between">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={handlePrevious}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                          >
                            ← Previous
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold"
                          >
                            Next: Complete Registration →
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                          <h3 className="text-xl font-bold mb-6 text-gradient">Review Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-gray-600">Name</p>
                              <p className="font-bold text-lg">{formData.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Email</p>
                              <p className="font-bold text-lg">{formData.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Phone</p>
                              <p className="font-bold text-lg">{formData.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">City</p>
                              <p className="font-bold text-lg">{formData.city}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="terms"
                              className="mt-1 h-5 w-5 text-blue-600 rounded"
                              required
                            />
                            <label htmlFor="terms" className="ml-3 text-gray-700">
                              I agree to the <a href="#" className="text-gradient font-bold">Terms of Service</a> and <a href="#" className="text-gradient font-bold">Privacy Policy</a>
                            </label>
                          </div>

                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="updates"
                              className="mt-1 h-5 w-5 text-blue-600 rounded"
                            />
                            <label htmlFor="updates" className="ml-3 text-gray-700">
                              Send me updates about new features and healthcare tips
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={handlePrevious}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                          >
                            ← Previous
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isLoading}
                            className={`px-8 py-4 text-white rounded-xl font-bold text-lg ${
                              userType === 'doctor'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                            } ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-2xl'}`}
                          >
                            {isLoading ? (
                              <span className="flex items-center justify-center">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="h-6 w-6 border-2 border-white border-t-transparent rounded-full mr-3"
                                />
                                Creating Account...
                              </span>
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                                <span className="relative flex items-center justify-center">
                                  <Sparkles className="h-6 w-6 mr-3" />
                                  Create {userType === 'doctor' ? 'Doctor' : 'Patient'} Account
                                </span>
                              </>
                            )}
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}