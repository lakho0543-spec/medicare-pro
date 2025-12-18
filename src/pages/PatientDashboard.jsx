import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, User, Bell, LogOut, Heart,
  FileText, Pill, CreditCard, Settings, HelpCircle,
  TrendingUp, ChevronRight, Star, MapPin, Video,
  Sparkles, Zap, Activity
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Johnson', date: '2024-12-20', time: '10:00 AM', status: 'confirmed', type: 'video' },
    { id: 2, doctor: 'Dr. Michael Chen', date: '2024-12-22', time: '2:30 PM', status: 'pending', type: 'clinic' },
    { id: 3, doctor: 'Dr. Emily Davis', date: '2024-12-25', time: '11:00 AM', status: 'cancelled', type: 'video' },
  ]);

  const stats = [
    { label: 'Upcoming', value: '2', icon: Calendar, color: 'from-blue-500 to-cyan-500', change: '+1' },
    { label: 'Completed', value: '12', icon: Heart, color: 'from-purple-500 to-pink-500', change: '+3' },
    { label: 'Prescriptions', value: '8', icon: FileText, color: 'from-green-500 to-emerald-500', change: '+2' },
    { label: 'Health Score', value: '85', icon: Activity, color: 'from-yellow-500 to-orange-500', change: '+5' },
  ];

  const quickActions = [
    { icon: Calendar, label: 'Book Appointment', color: 'blue' },
    { icon: Video, label: 'Video Consult', color: 'green' },
    { icon: Pill, label: 'Order Medicine', color: 'purple' },
    { icon: FileText, label: 'View Records', color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Welcome back, <span className="text-gradient">John!</span>
                </h1>
                <p className="text-gray-600 mt-2">Here's your health dashboard</p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 bg-white rounded-xl shadow-lg"
                >
                  <Bell className="h-6 w-6 text-gray-700" />
                  {notifications > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {notifications}
                    </motion.div>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium"
                >
                  <LogOut className="h-5 w-5 inline-block mr-2" />
                  Logout
                </motion.button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-6 rounded-2xl"
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
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gradient">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all ${
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
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Appointments Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gradient">Upcoming Appointments</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
                  >
                    View All
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {appointments.map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      whileHover={{ x: 10 }}
                      className="p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-200 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl ${
                            appointment.type === 'video' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {appointment.type === 'video' ? (
                              <Video className="h-6 w-6" />
                            ) : (
                              <MapPin className="h-6 w-6" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{appointment.doctor}</h3>
                            <div className="flex items-center text-gray-600 mt-1">
                              <Calendar className="h-4 w-4 mr-2" />
                              {appointment.date}
                              <Clock className="h-4 w-4 ml-4 mr-2" />
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' :
                            appointment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg hover:bg-gray-100"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-8"
            >
              {/* Profile Card */}
              <div className="glass-card rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 mx-auto mb-4">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <User className="h-10 w-10 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-gray-600">Patient ID: MED123456</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Health Plan</span>
                    <span className="font-medium text-blue-600">Premium</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Next Checkup</span>
                    <span className="font-medium">Dec 28</span>
                  </div>
                </div>
              </div>

              {/* Health Tips */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Sparkles className="h-6 w-6 text-yellow-500 mr-3" />
                  <h3 className="text-xl font-bold">Health Tips</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Zap className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">Stay Hydrated</span>
                    </div>
                    <p className="text-sm text-gray-600">Drink 8 glasses of water daily</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Activity className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-medium">Daily Exercise</span>
                    </div>
                    <p className="text-sm text-gray-600">30 minutes of moderate exercise</p>
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