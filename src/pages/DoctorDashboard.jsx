import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Calendar, Users, DollarSign, Clock,
  TrendingUp, Activity, BarChart3, MessageSquare,
  FileText, Settings, Bell, LogOut, Sparkles,
  CheckCircle, XCircle, Zap, Heart, Star,
  User, Video, MapPin, Check, MoreVertical
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

// Static data moved outside component
const STATS_DATA = [
  { 
    label: 'Today\'s Appointments', 
    value: '8', 
    icon: Calendar, 
    color: 'from-blue-500 to-cyan-500', 
    change: '+2' 
  },
  { 
    label: 'Total Patients', 
    value: '156', 
    icon: Users, 
    color: 'from-purple-500 to-pink-500', 
    change: '+12' 
  },
  { 
    label: 'Pending Reviews', 
    value: '23', 
    icon: FileText, 
    color: 'from-green-500 to-emerald-500', 
    change: '-5' 
  },
  { 
    label: 'Monthly Revenue', 
    value: '$8,540', 
    icon: DollarSign, 
    color: 'from-yellow-500 to-orange-500', 
    change: '+18%' 
  },
];

const QUICK_ACTIONS = [
  { icon: Calendar, label: 'Add Availability', color: 'blue' },
  { icon: MessageSquare, label: 'Messages', color: 'green', count: 5 },
  { icon: FileText, label: 'Prescriptions', color: 'purple' },
  { icon: BarChart3, label: 'Analytics', color: 'red' },
];

const AVAILABILITY_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patient: 'John Doe', 
      time: '10:00 AM', 
      status: 'confirmed', 
      type: 'video',
      avatar: null 
    },
    { 
      id: 2, 
      patient: 'Sarah Smith', 
      time: '11:30 AM', 
      status: 'pending', 
      type: 'clinic',
      avatar: null 
    },
    { 
      id: 3, 
      patient: 'Mike Johnson', 
      time: '2:00 PM', 
      status: 'confirmed', 
      type: 'video',
      avatar: null 
    },
    { 
      id: 4, 
      patient: 'Emma Wilson', 
      time: '3:30 PM', 
      status: 'cancelled', 
      type: 'clinic',
      avatar: null 
    },
  ]);

  // Handle appointment actions
  const handleAppointmentAction = useCallback((id, action) => {
    setAppointments(prev => {
      if (action === 'approve' || action === 'reject') {
        const newStatus = action === 'approve' ? 'confirmed' : 'cancelled';
        toast.success(`Appointment ${action === 'approve' ? 'confirmed' : 'rejected'}!`);
        return prev.map(app => app.id === id ? { ...app, status: newStatus } : app);
      }
      return prev;
    });
  }, []);

  const handleLogout = () => {
    toast.success('Successfully logged out!');
    // Add actual logout logic here
  };

  const renderStatusBadge = (status) => {
    const config = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
    };
    const { bg, text, border } = config[status] || config.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${bg} ${text} ${border}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderAppointmentActions = (appointment) => {
    if (appointment.status === 'pending') {
      return (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAppointmentAction(appointment.id, 'approve')}
            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            title="Confirm appointment"
          >
            <CheckCircle className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAppointmentAction(appointment.id, 'reject')}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Reject appointment"
          >
            <XCircle className="h-5 w-5" />
          </motion.button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="mr-4"
                  >
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                      <Stethoscope className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      Welcome, <span className="text-gradient">Dr. Sarah!</span>
                    </h1>
                    <p className="text-gray-600 mt-2">Cardiologist • 12 years experience</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-gray-700">Rating: 4.9/5</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-700">156 Patients</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">98% Satisfaction</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 bg-white rounded-xl shadow-lg hover-lift"
                >
                  <Bell className="h-6 w-6 text-gray-700" />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover-glow"
                >
                  <LogOut className="h-5 w-5 inline-block mr-2" />
                  Logout
                </motion.button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatePresence>
              {STATS_DATA.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl hover-lift"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Appointments */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Quick Actions */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gradient">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {QUICK_ACTIONS.map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all relative hover-lift ${
                        action.color === 'blue' ? 'hover:border-blue-500' :
                        action.color === 'green' ? 'hover:border-green-500' :
                        action.color === 'purple' ? 'hover:border-purple-500' :
                        'hover:border-red-500'
                      }`}
                    >
                      <div className={`p-3 rounded-xl inline-block mb-4 ${
                        action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        action.color === 'green' ? 'bg-green-100 text-green-600' :
                        action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div className="font-medium">{action.label}</div>
                      {action.count && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {action.count}
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Today's Appointments */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gradient">Today's Schedule</h2>
                    <p className="text-gray-600 mt-1">{appointments.length} appointments</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Confirmed</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Pending</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {appointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        whileHover={{ x: 5 }}
                        className="p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-200 transition-all hover-lift"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                                {appointment.avatar ? (
                                  <img 
                                    src={appointment.avatar} 
                                    alt={appointment.patient}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="h-6 w-6 text-blue-600" />
                                )}
                              </div>
                              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                appointment.type === 'video' ? 'bg-green-500' : 'bg-blue-500'
                              }`}>
                                {appointment.type === 'video' ? (
                                  <Video className="h-2 w-2 text-white m-auto" />
                                ) : (
                                  <MapPin className="h-2 w-2 text-white m-auto" />
                                )}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{appointment.patient}</h3>
                              <div className="flex items-center text-gray-600 mt-1">
                                <Clock className="h-4 w-4 mr-2" />
                                {appointment.time} • {appointment.type === 'video' ? 'Video Consult' : 'Clinic Visit'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-end space-x-4">
                            {renderStatusBadge(appointment.status)}
                            <div className="flex space-x-2">
                              {renderAppointmentActions(appointment)}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                title="Message patient"
                              >
                                <MessageSquare className="h-5 w-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                title="More options"
                              >
                                <MoreVertical className="h-5 w-5" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              {/* Profile Card */}
              <div className="glass-card rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 mx-auto mb-4">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Stethoscope className="h-12 w-12 text-blue-600" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="h-3 w-3 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
                  <p className="text-gradient font-medium">Cardiologist</p>
                  <div className="flex items-center justify-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-2">4.9 (128 reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <span className="text-gray-700">Consultation Fee</span>
                    <span className="font-bold text-blue-600">$150</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <span className="text-gray-700">Next Available</span>
                    <span className="font-bold text-green-600">Today 4:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                    <span className="text-gray-700">Response Time</span>
                    <span className="font-bold text-purple-600">15 min</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                >
                  Edit Profile
                </motion.button>
              </div>

              {/* Availability */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gradient">Availability</h3>
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div className="space-y-3">
                  {AVAILABILITY_DAYS.map((day) => (
                    <motion.div
                      key={day}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <span className="font-medium text-gray-700">{day}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 font-medium">9:00 AM - 6:00 PM</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover-glow"
                >
                  Update Schedule
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gradient mb-6">Weekly Overview</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Appointments Completed', value: '42', color: 'bg-blue-500' },
                    { label: 'New Patients', value: '8', color: 'bg-green-500' },
                    { label: 'Prescriptions Written', value: '23', color: 'bg-purple-500' }
                  ].map((stat, index) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-gray-600">{stat.label}</span>
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900 mr-2">{stat.value}</span>
                        <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                      </div>
                    </div>
                  ))}
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
