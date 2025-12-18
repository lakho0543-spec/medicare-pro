import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, UserCheck, Calendar, Shield, LogOut, Bell,
  TrendingUp, Activity, BarChart3, Settings, AlertCircle,
  CheckCircle, XCircle, MoreVertical, Download, Filter,
  Search, Eye, Edit, Trash2, Clock, DollarSign,
  Sparkles, Zap, Crown, Target, Globe
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '1,245', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Active Doctors', value: '58', icon: UserCheck, color: 'from-purple-500 to-pink-500', change: '+5' },
    { label: 'Today Appointments', value: '42', icon: Calendar, color: 'from-green-500 to-emerald-500', change: '+8' },
    { label: 'Pending Approvals', value: '12', icon: Shield, color: 'from-yellow-500 to-orange-500', change: '-3' },
    { label: 'Revenue Today', value: '$2,540', icon: DollarSign, color: 'from-red-500 to-rose-500', change: '+18%' },
    { label: 'Platform Health', value: '98%', icon: Activity, color: 'from-indigo-500 to-violet-500', change: '+2%' },
  ]);

  const [pendingDoctors, setPendingDoctors] = useState([
    { id: 1, name: 'Dr. Alex Johnson', specialization: 'Cardiologist', submitted: '2 hours ago', status: 'pending' },
    { id: 2, name: 'Dr. Maria Garcia', specialization: 'Dermatologist', submitted: '1 day ago', status: 'pending' },
    { id: 3, name: 'Dr. Robert Chen', specialization: 'Neurologist', submitted: '2 days ago', status: 'pending' },
    { id: 4, name: 'Dr. Sarah Wilson', specialization: 'Pediatrician', submitted: '3 days ago', status: 'verified' },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, user: 'Dr. John Smith', action: 'Account approved', time: '10 min ago', type: 'success' },
    { id: 2, user: 'Patient123', action: 'Reported issue', time: '30 min ago', type: 'warning' },
    { id: 3, user: 'System', action: 'Backup completed', time: '1 hour ago', type: 'info' },
    { id: 4, user: 'Dr. Emily Davis', action: 'Profile updated', time: '2 hours ago', type: 'success' },
    { id: 5, user: 'Admin', action: 'Settings modified', time: '3 hours ago', type: 'info' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleApprove = (id) => {
    setPendingDoctors(prev => prev.map(doc => 
      doc.id === id ? { ...doc, status: 'approved' } : doc
    ));
    toast.success('Doctor approved successfully!');
  };

  const handleReject = (id) => {
    setPendingDoctors(prev => prev.filter(doc => doc.id !== id));
    toast.error('Doctor registration rejected');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
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
                <div className="flex items-center mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="mr-4"
                  >
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">
                      Admin <span className="text-gradient bg-gradient-to-r from-cyan-400 to-purple-400">Dashboard</span>
                    </h1>
                    <p className="text-gray-400 mt-2">System Administration & Monitoring</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-cyan-400 mr-2" />
                    <span className="text-gray-300">Global Platform</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-gray-300">98.5% Uptime</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="text-gray-300">Real-time Monitoring</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 bg-gray-800 rounded-xl shadow-lg"
                >
                  <Bell className="h-6 w-6 text-gray-300" />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    5
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium"
                >
                  <LogOut className="h-5 w-5 inline-block mr-2" />
                  Logout
                </motion.button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Pending Approvals */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              {/* Pending Approvals */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Pending Approvals</h2>
                    <p className="text-gray-400">Review new doctor registrations</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search doctors..."
                        className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
                    >
                      <Filter className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-4">
                  {pendingDoctors.map((doctor) => (
                    <motion.div
                      key={doctor.id}
                      whileHover={{ x: 10 }}
                      className="p-6 bg-gray-900/50 border border-gray-700 rounded-2xl hover:border-cyan-500/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                            <UserCheck className="h-7 w-7 text-cyan-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-white">{doctor.name}</h3>
                            <p className="text-cyan-400">{doctor.specialization}</p>
                            <div className="flex items-center text-gray-400 text-sm mt-1">
                              <Clock className="h-4 w-4 mr-2" />
                              Submitted {doctor.submitted}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            doctor.status === 'verified'
                              ? 'bg-green-900/30 text-green-400 border border-green-700'
                              : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                          }`}>
                            {doctor.status}
                          </span>
                          <div className="flex space-x-2">
                            {doctor.status === 'pending' && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleApprove(doctor.id)}
                                  className="p-2 bg-green-900/30 text-green-400 rounded-lg border border-green-700 hover:bg-green-800/50"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleReject(doctor.id)}
                                  className="p-2 bg-red-900/30 text-red-400 rounded-lg border border-red-700 hover:bg-red-800/50"
                                >
                                  <XCircle className="h-5 w-5" />
                                </motion.button>
                              </>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                            >
                              <Eye className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                            >
                              <MoreVertical className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* System Analytics */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">System Analytics</h2>
                    <p className="text-gray-400">Platform performance metrics</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg flex items-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
                    >
                      <BarChart3 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Server Load', value: '45%', color: 'from-green-500 to-emerald-500' },
                    { label: 'Database Queries', value: '1.2K/sec', color: 'from-blue-500 to-cyan-500' },
                    { label: 'API Response', value: '120ms', color: 'from-purple-500 to-pink-500' },
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-6 bg-gray-900/30 rounded-2xl border border-gray-700"
                    >
                      <div className={`h-2 w-full rounded-full mb-4 bg-gradient-to-r ${metric.color}`} />
                      <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-gray-400">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              {/* Recent Activity */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                    <p className="text-gray-400 text-sm">System logs & events</p>
                  </div>
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                </div>

                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-gray-900/30 rounded-xl border border-gray-700"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'success' ? 'bg-green-900/30 text-green-400' :
                          activity.type === 'warning' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-cyan-900/30 text-cyan-400'
                        }`}>
                          {activity.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
                           activity.type === 'warning' ? <AlertCircle className="h-4 w-4" /> :
                           <Activity className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-white">{activity.user}</span>
                            <span className="text-gray-500 text-sm">{activity.time}</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{activity.action}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Settings, label: 'System Settings', color: 'gray' },
                    { icon: Users, label: 'User Management', color: 'blue' },
                    { icon: Shield, label: 'Security', color: 'green' },
                    { icon: BarChart3, label: 'Analytics', color: 'purple' },
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-xl border ${
                        action.color === 'gray' ? 'border-gray-700 bg-gray-900/30' :
                        action.color === 'blue' ? 'border-blue-700 bg-blue-900/20' :
                        action.color === 'green' ? 'border-green-700 bg-green-900/20' :
                        'border-purple-700 bg-purple-900/20'
                      }`}
                    >
                      <action.icon className={`h-6 w-6 mb-3 ${
                        action.color === 'gray' ? 'text-gray-400' :
                        action.color === 'blue' ? 'text-blue-400' :
                        action.color === 'green' ? 'text-green-400' :
                        'text-purple-400'
                      }`} />
                      <div className="text-sm font-medium text-white">{action.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-700/30 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">System Status</h3>
                    <p className="text-cyan-300/70">All systems operational</p>
                  </div>
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center"
                    >
                      <Zap className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { service: 'API Gateway', status: 'active', latency: '45ms' },
                    { service: 'Database', status: 'active', latency: '12ms' },
                    { service: 'Authentication', status: 'active', latency: '23ms' },
                  ].map((service, index) => (
                    <div key={service.service} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3" />
                        <span className="text-white">{service.service}</span>
                      </div>
                      <span className="text-cyan-300">{service.latency}</span>
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