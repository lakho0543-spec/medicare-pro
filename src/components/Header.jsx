import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Search, User, Stethoscope, Calendar, 
  Video, Phone, Pill, Menu, X, ChevronDown,
  Sparkles, Shield, Zap, Bell, Settings, LogOut,
  Home, MessageSquare, FileText, Star, Award,
  TrendingUp, Crown, Globe, Target, Watch
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: 'Find Doctors',
      path: '/find-doctors',
      icon: Stethoscope,
      color: 'text-blue-500',
      dropdown: [
        { label: 'All Specialists', path: '/doctors' },
        { label: 'Top Rated', path: '/doctors/top-rated' },
        { label: 'Available Now', path: '/doctors/available' },
        { label: 'By Specialty', path: '/doctors/specialties' },
        { label: 'By City', path: '/doctors/cities' },
      ]
    },
    {
      label: 'Book Appointment',
      path: '/book-appointment',
      icon: Calendar,
      color: 'text-purple-500',
      dropdown: [
        { label: 'New Appointment', path: '/book' },
        { label: 'Schedule', path: '/schedule' },
        { label: 'My Appointments', path: '/appointments' },
        { label: 'Health Packages', path: '/packages' },
      ]
    },
    {
      label: 'Video Consult',
      path: '/video-consultation',
      icon: Video,
      color: 'text-green-500',
      premium: true,
      badge: 'NEW'
    },
    {
      label: 'Emergency',
      path: '/emergency',
      icon: Phone,
      color: 'text-red-500',
      urgent: true
    },
    {
      label: 'Pharmacy',
      path: '/pharmacy',
      icon: Pill,
      color: 'text-yellow-500',
      dropdown: [
        { label: 'Medicines', path: '/pharmacy/medicines' },
        { label: 'Healthcare Products', path: '/pharmacy/products' },
        { label: 'Prescriptions', path: '/pharmacy/prescriptions' },
        { label: 'Health Tips', path: '/pharmacy/tips' },
      ]
    },
  ];

  const userMenuItems = user ? [
    { label: 'My Dashboard', icon: Home, path: user.type === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Appointments', icon: Calendar, path: '/appointments' },
    { label: 'Messages', icon: MessageSquare, path: '/messages', badge: 3 },
    { label: 'Medical Records', icon: FileText, path: '/records' },
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Help Center', icon: Shield, path: '/help' },
    { label: 'Logout', icon: LogOut, path: '/logout', action: logout },
  ] : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const NotificationsBadge = () => (
    <div className="relative">
      <Bell className="h-6 w-6 text-gray-600" />
      <div className="absolute -top-1 -right-1">
        <div className="relative">
          <div className="animate-ping absolute inset-0 bg-red-400 rounded-full opacity-75" />
          <div className="relative bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Top Announcement Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-2"
      >
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <Sparkles className="h-4 w-4" />
          <span>🏥 <span className="font-semibold">50% off</span> on first consultation | </span>
          <span>⭐ <span className="font-semibold">4.8/5</span> Patient Satisfaction | </span>
          <span>🚀 <span className="font-semibold">24/7</span> Emergency Support</span>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-3 border-b border-gray-200/50'
            : 'bg-white py-4'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <Heart className="h-7 w-7 text-white" />
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  Medicare Pro
                </motion.h1>
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-green-500" />
                  <p className="text-xs text-gray-600 font-medium">Secure Healthcare Platform</p>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 rounded-full">
                    <TrendingUp className="h-2.5 w-2.5 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600">#1 in Pakistan</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="font-semibold">{item.label}</span>
                    
                    {/* Premium Badge */}
                    {item.premium && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full">
                        <Crown className="h-3 w-3 text-white" />
                        <span className="text-xs font-bold text-white">PRO</span>
                      </div>
                    )}
                    
                    {/* Urgent Badge */}
                    {item.urgent && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse">
                        <Watch className="h-3 w-3 text-white" />
                        <span className="text-xs font-bold text-white">24/7</span>
                      </div>
                    )}
                    
                    {/* New Badge */}
                    {item.badge && (
                      <div className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                        <span className="text-xs font-bold text-white">{item.badge}</span>
                      </div>
                    )}
                    
                    {item.dropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.path}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{dropdownItem.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </motion.button>

              {user ? (
                <>
                  {/* Notifications */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors relative"
                  >
                    <NotificationsBadge />
                  </motion.button>

                  {/* User Menu */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        {user.type === 'doctor' && (
                          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-amber-500 p-1 rounded-full">
                            <Stethoscope className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="hidden lg:block text-left">
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{user.type}</div>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`} />
                    </motion.button>

                    {/* User Dropdown */}
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50"
                        >
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                                {user.type === 'doctor' ? 'Verified Doctor' : 'Premium Patient'}
                              </div>
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600">4.8</span>
                            </div>
                          </div>

                          {/* Menu Items */}
                          {userMenuItems.map((menuItem) => (
                            <Link
                              key={menuItem.label}
                              to={menuItem.action ? '#' : menuItem.path}
                              onClick={() => {
                                if (menuItem.action) {
                                  menuItem.action();
                                } else if (menuItem.label === 'Logout') {
                                  handleLogout();
                                }
                                setIsUserMenuOpen(false);
                              }}
                              className="flex items-center justify-between gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <menuItem.icon className="h-5 w-5" />
                                <span className="font-medium">{menuItem.label}</span>
                              </div>
                              {menuItem.badge && (
                                <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                  {menuItem.badge}
                                </div>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2.5 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Get Started Free
                      </span>
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-6 w-6 text-gray-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-6 w-6 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, specialties, symptoms, or medicines..."
                  autoFocus
                  className="w-full px-8 py-6 bg-white rounded-2xl shadow-2xl text-xl outline-none"
                />
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold"
                >
                  Search
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30 }}
            className="fixed inset-0 bg-white z-50 lg:hidden pt-24 px-6"
          >
            <div className="space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`p-3 rounded-xl ${item.color} bg-opacity-10`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500">Quick access</div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </Link>
              ))}

              <div className="pt-8 space-y-4">
                {user ? (
                  <>
                    <Link to={user.type === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold"
                      >
                        Go to Dashboard
                      </motion.button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 border-2 border-blue-500 text-blue-600 rounded-2xl font-semibold"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                    <Link to="/signup">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold"
                      >
                        Get Started Free
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
