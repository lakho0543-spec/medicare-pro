import { motion } from 'framer-motion';
import { 
  Shield, Video, FileText, MessageSquare, 
  Smartphone, Globe, Zap, Sparkles, 
  Clock, Award, Users, TrendingUp,
  Heart, Lock, Globe2, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      icon: ShieldCheck,
      title: "Verified & Certified Doctors",
      description: "All healthcare professionals are verified, licensed, and undergo thorough background checks",
      detailedDescription: "We maintain strict verification protocols including medical license validation, educational credentials, and professional experience verification.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      stats: "500+ Verified Doctors",
      delay: 0.1
    },
    {
      icon: Video,
      title: "HD Video Consultations",
      description: "High-definition virtual consultations with secure, encrypted video calls",
      detailedDescription: "Crystal-clear video quality with no lag. End-to-end encrypted calls ensuring complete patient-doctor privacy and security.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      stats: "10,000+ Virtual Visits",
      delay: 0.2
    },
    {
      icon: FileText,
      title: "Digital Health Records",
      description: "Secure, centralized access to all your medical records and prescriptions",
      detailedDescription: "Lifetime storage of medical records, prescriptions, lab reports, and vaccination history with instant sharing capabilities.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      stats: "100% Secure Storage",
      delay: 0.3
    },
    {
      icon: Clock,
      title: "Instant Appointments",
      description: "Book appointments instantly with real-time doctor availability",
      detailedDescription: "Smart scheduling system showing real-time availability. Get confirmed appointments within minutes, not days.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      stats: "Under 5 Minutes",
      delay: 0.4
    },
    {
      icon: Smartphone,
      title: "Smart Mobile Experience",
      description: "Seamless experience across all devices with our dedicated mobile app",
      detailedDescription: "Native iOS and Android apps with push notifications, offline access, and biometric login for maximum convenience.",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
      stats: "4.8★ App Rating",
      delay: 0.5
    },
    {
      icon: Globe2,
      title: "Global Healthcare Network",
      description: "Connect with specialists worldwide in multiple languages",
      detailedDescription: "Access to international medical expertise with support for 20+ languages and cross-border consultation capabilities.",
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-violet-50",
      stats: "50+ Countries",
      delay: 0.6
    }
  ];

  const stats = [
    { value: "500+", label: "Verified Doctors", icon: Users },
    { value: "50K+", label: "Happy Patients", icon: Heart },
    { value: "98%", label: "Satisfaction Rate", icon: TrendingUp },
    { value: "24/7", label: "Support Available", icon: MessageSquare },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🏆 Trusted Healthcare Platform
            </span>
            <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
          </motion.div>
          
          {/* Main Heading */}
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Premium Healthcare
            <span className="block">
              <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Features & Benefits
              </span>
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Experience healthcare reimagined with cutting-edge technology, 
            verified professionals, and seamless digital solutions designed for your well-being
          </p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center px-6"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">{stat.value}</div>
                </div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                duration: 0.6, 
                delay: feature.delay,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-50px" }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              className="relative group"
            >
              {/* Card */}
              <div className={`relative h-full bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 
                ${activeFeature === index ? 'shadow-2xl shadow-blue-500/10 border-blue-200' : 'hover:shadow-xl'}`}>
                
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg" />
                </div>
                
                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon with Animation */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 relative`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                    
                    {/* Glow Effect */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${feature.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Short Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Detailed Description (on hover) */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeFeature === index ? "auto" : 0,
                      opacity: activeFeature === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {feature.detailedDescription}
                    </p>
                  </motion.div>
                  
                  {/* Stats Badge */}
                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${feature.bgColor}`}>
                      <Award className={`h-4 w-4 ${feature.color.replace('from-', 'text-').split(' ')[0]}`} />
                      <span className="text-sm font-semibold text-gray-900">{feature.stats}</span>
                    </div>
                  </div>
                  
                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-full"
                    initial={{ width: 0 }}
                    animate={{ width: activeFeature === index ? "96px" : "0px" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                {/* Floating Elements */}
                {activeFeature === index && (
                  <>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Sparkles className="h-6 w-6 text-yellow-500" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 -left-2"
                    >
                      <Lock className="h-6 w-6 text-green-500" />
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-lg font-semibold hover:shadow-2xl transition-all flex items-center justify-center gap-3 group"
            >
              <Sparkles className="h-6 w-6" />
              <span>Explore All Features</span>
              <Zap className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl text-lg font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
            >
              <Users className="h-6 w-6" />
              <span>See How It Works</span>
            </motion.button>
          </div>
          
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-green-500" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-5 w-5 text-purple-500" />
              <span>Global Certifications</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
