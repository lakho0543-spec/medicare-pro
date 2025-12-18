import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Search, User, Stethoscope, Calendar, 
  Video, Phone, Pill, Menu, X, ChevronDown,
  Sparkles, Shield, Zap
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: <Stethoscope size={18} />, label: 'Find Doctors', path: '/find-doctors', color: 'text-blue-500' },
    { icon: <Calendar size={18} />, label: 'Book Appointment', path: '/book-appointment', color: 'text-purple-500' },
    { icon: <Video size={18} />, label: 'Video Consult', path: '/video-consultation', color: 'text-green-500' },
    { icon: <Phone size={18} />, label: 'Emergency', path: '/emergency', color: 'text-red-500' },
    { icon: <Pill size={18} />, label: 'Pharmacy', path: '/pharmacy', color: 'text-yellow-500' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-3 border-b border-white/20'
          : 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with Animation */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Heart className="h-7 w-7 text-white" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />
              </div>
            </motion.div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              >
                Medicare Pro
              </motion.h1>
              <div className="flex items-center space-x-2">
                <Shield className="h-3 w-3 text-green-500" />
                <p className="text-xs text-gray-500">Secure Healthcare Platform</p>
                <Zap className="h-3 w-3 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with Hover Effects */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative"
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <div className={`relative ${item.color}`}>
                    {item.icon}
                    {hoveredItem === item.label && (
                      <motion.div
                        layoutId="navIconGlow"
                        className="absolute inset-0 bg-current rounded-full blur-md opacity-30"
                      />
                    )}
                  </div>
                  <span className="font-medium">{item.label}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    hoveredItem === item.label ? 'rotate-180' : ''
                  }`} />
                </Link>
                
                {/* Hover Indicator */}
                {hoveredItem === item.label && (
                  <motion.div
                    layoutId="navHoverIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </nav>

          {/* User Actions with Glowing Buttons */}
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex items-center space-x-3"
            >
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2.5 border-2 border-blue-500 text-blue-600 rounded-xl font-medium group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <User className="inline-block h-5 w-5 mr-2" />
                  Sign In
                </motion.button>
              </Link>
              
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium overflow-hidden group hover-glow"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get Started Free
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10"
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

        {/* Mobile Menu with Slide Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={item.path}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className={item.color}>
                          {item.icon}
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="pt-4 space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-medium"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium"
                      >
                        Get Started Free
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}