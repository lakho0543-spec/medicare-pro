import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Stethoscope, Mail, Lock, Eye, EyeOff,
  Smartphone, Shield, Video, Calendar, Sparkles,
  Heart, CheckCircle, Zap, AlertCircle, Loader2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

// Firebase imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export default function Login() {
  const [userType, setUserType] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.phone || !/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsLoading(true);
    setErrors({});

    try {
      // 1. Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const user = userCredential.user;

      // 2. Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        throw new Error('User data not found. Please contact support.');
      }

      const userData = userDoc.data();
      
      // 3. Check if user type matches
      if (userData.userType !== userType) {
        toast.error(`Please use ${userData.userType === 'doctor' ? 'Doctor' : 'Patient'} login`);
        setIsLoading(false);
        return;
      }

      // 4. Check doctor verification status
      if (userType === 'doctor' && userData.status === 'pending') {
        toast.error('Your account is pending verification by admin.');
        setIsLoading(false);
        return;
      }

      // 5. Store in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      toast.success(`${userType === 'doctor' ? 'Doctor' : 'Patient'} login successful!`, {
        icon: '🎉',
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
        },
        duration: 4000,
      });

      // 6. Redirect to appropriate dashboard
      setTimeout(() => {
        if (userType === 'doctor') {
          navigate('/doctor-dashboard');
        } else {
          navigate('/patient-dashboard');
        }
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please check your credentials.';
      
      // Firebase error handling
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          setErrors({ email: errorMessage });
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          setErrors({ password: errorMessage });
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          setErrors({ email: errorMessage });
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        default:
          if (error.message.includes('User data not found')) {
            errorMessage = 'Account setup incomplete. Please contact support.';
          }
      }
      
      toast.error(errorMessage, {
        icon: '❌',
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fill demo credentials based on user type
  const fillDemoCredentials = () => {
    if (userType === 'doctor') {
      setFormData({
        email: 'doctor@demo.com',
        password: 'doctor123',
        phone: '+92 300 1112233'
      });
    } else {
      setFormData({
        email: 'patient@demo.com',
        password: 'patient123',
        phone: '+92 300 4445566'
      });
    }
    toast.success(`Demo ${userType} credentials filled!`, {
      icon: '👨‍⚕️',
    });
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    if (!formData.email) {
      toast.error('Please enter your email address first');
      return;
    }
    
    // In a real app, you would call Firebase's sendPasswordResetEmail
    toast.success(`Password reset link sent to ${formData.email}`, {
      icon: '📧',
    });
  };

  // Check for remembered email on component mount
  useState(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block mb-6"
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 shadow-lg">
                <Heart className="h-12 w-12 text-pink-500 animate-pulse" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Welcome to <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Medicare Pro</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Secure login to access your personalized healthcare dashboard
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Type Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-card rounded-2xl p-8 sticky top-24 shadow-xl hover-lift">
                <div className="flex items-center mb-8">
                  <Shield className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gradient">Select Login Type</h3>
                </div>
                
                <div className="space-y-4">
                  {['patient', 'doctor'].map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setUserType(type)}
                      className={`w-full p-6 rounded-xl border-2 transition-all relative overflow-hidden ${
                        userType === type
                          ? type === 'doctor'
                            ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                            : 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {userType === type && (
                        <motion.div
                          layoutId="userTypeBg"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}
                      <div className="flex items-center relative z-10">
                        <div className={`p-3 rounded-xl mr-4 transition-all ${
                          userType === type 
                            ? type === 'doctor'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
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

                {/* Features */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center mb-6">
                    <Sparkles className="h-5 w-5 text-yellow-500 mr-3" />
                    <h4 className="font-bold text-gradient">Features</h4>
                  </div>
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
                          <div className="flex items-center text-sm p-3 bg-purple-50 rounded-lg">
                            <Video className="h-5 w-5 text-green-500 mr-3" />
                            <span>Video Consultations</span>
                          </div>
                          <div className="flex items-center text-sm p-3 bg-blue-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                            <span>Appointment Management</span>
                          </div>
                          <div className="flex items-center text-sm p-3 bg-purple-50 rounded-lg">
                            <Shield className="h-5 w-5 text-purple-500 mr-3" />
                            <span>Patient Records Access</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center text-sm p-3 bg-blue-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                            <span>Book Appointments</span>
                          </div>
                          <div className="flex items-center text-sm p-3 bg-green-50 rounded-lg">
                            <Video className="h-5 w-5 text-green-500 mr-3" />
                            <span>Video Consultations</span>
                          </div>
                          <div className="flex items-center text-sm p-3 bg-purple-50 rounded-lg">
                            <Smartphone className="h-5 w-5 text-purple-500 mr-3" />
                            <span>Medical Records</span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Demo Login */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={fillDemoCredentials}
                    className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:shadow-md transition-all flex items-center justify-center"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Try Demo Credentials
                  </motion.button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Use demo credentials to test the platform
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl p-8 shadow-xl hover-lift">
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
                      {userType === 'doctor' ? 'Doctor' : 'Patient'} Login
                    </h2>
                    <p className="text-gray-600">Secure access to your healthcare dashboard</p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-auto"
                  >
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Address
                        </span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all ${
                            errors.email 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                          }`}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <span className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-2" />
                          Phone Number
                        </span>
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all ${
                            errors.phone 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                          }`}
                          placeholder="+92 300 1234567"
                          required
                        />
                      </div>
                      {errors.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <span className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Password
                      </span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 transition-all ${
                          errors.password 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="remember" className="ml-3 text-gray-700 cursor-pointer">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <motion.button
                    whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-all relative overflow-hidden ${
                      userType === 'doctor'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                    } ${isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:shadow-2xl hover-glow'}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-6 w-6 border-2 border-white border-t-transparent rounded-full mr-3"
                        />
                        Authenticating...
                      </span>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative flex items-center justify-center">
                          <Zap className="h-6 w-6 mr-3" />
                          Sign in as {userType === 'doctor' ? 'Doctor' : 'Patient'}
                        </span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Additional Options */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">
                      Don't have an account?{' '}
                      <a 
                        href="/signup" 
                        className="text-gradient font-bold hover:underline transition-all"
                      >
                        Sign up now
                      </a>
                    </p>
                    
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="py-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center group"
                      >
                        <svg className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="font-medium">Google</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="py-3 border-2 border-gray-200 rounded-xl hover:border-gray-800 hover:bg-gray-50 transition-all flex items-center justify-center group"
                      >
                        <svg className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="font-medium">GitHub</span>
                      </motion.button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-sm text-gray-600">
                        <Shield className="inline-block h-4 w-4 text-blue-500 mr-1" />
                        Your data is secured with Firebase Authentication and Firestore
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
