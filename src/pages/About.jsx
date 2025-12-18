import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Users, Award, Globe, Target, Shield, Sparkles, 
  Zap, Star, TrendingUp, CheckCircle, Rocket, ShieldCheck,
  Clock, Users2, Globe2, TargetIcon, HeartPulse, Brain,
  Leaf, Scale, Cpu, Palette, Eye, Infinity as InfinityIcon
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  const [hoveredValue, setHoveredValue] = useState(null);

  const stats = [
    { icon: Users2, label: 'Active Users', value: '50K+', suffix: '', color: 'from-blue-500 to-cyan-500' },
    { icon: Globe2, label: 'Cities Covered', value: '25+', suffix: '', color: 'from-purple-500 to-pink-500' },
    { icon: ShieldCheck, label: 'Verified Doctors', value: '500+', suffix: '', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, label: 'Response Time', value: '15', suffix: 'min', color: 'from-yellow-500 to-orange-500' },
  ];

  const values = [
    {
      icon: HeartPulse,
      title: "Compassion",
      description: "We care deeply about our users' health and wellbeing.",
      color: "bg-gradient-to-br from-pink-500/10 to-rose-500/10",
      iconColor: "text-pink-600",
      delay: 0.1
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Military-grade encryption and privacy protection for all health data.",
      color: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10",
      iconColor: "text-blue-600",
      delay: 0.2
    },
    {
      icon: Brain,
      title: "Innovation",
      description: "AI-powered features for personalized healthcare experiences.",
      color: "bg-gradient-to-br from-purple-500/10 to-violet-500/10",
      iconColor: "text-purple-600",
      delay: 0.3
    },
    {
      icon: TargetIcon,
      title: "Excellence",
      description: "Relentless pursuit of quality in every feature and interaction.",
      color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-600",
      delay: 0.4
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive network of patients and healthcare providers.",
      color: "bg-gradient-to-br from-orange-500/10 to-amber-500/10",
      iconColor: "text-orange-600",
      delay: 0.5
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Eco-friendly digital solutions reducing healthcare's carbon footprint.",
      color: "bg-gradient-to-br from-teal-500/10 to-cyan-500/10",
      iconColor: "text-teal-600",
      delay: 0.6
    },
  ];

  const milestones = [
    { year: '2022', title: 'Founded', description: 'Started with a vision to revolutionize healthcare' },
    { year: '2023', title: 'First 10K Users', description: 'Reached our first major user milestone' },
    { year: '2024', title: 'National Expansion', description: 'Expanded to 25+ cities across Pakistan' },
    { year: '2025', title: 'AI Integration', description: 'Launched AI-powered health recommendations' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
            }}
            animate={{
              y: [0, -50, 0],
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

      <Header />
      
      <div className="container mx-auto px-4 py-12 lg:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                <Heart className="h-12 w-12 text-white" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-300" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
              <Zap className="h-4 w-4 text-yellow-500 mr-2 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Revolutionizing Healthcare Since 2022
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="block">We're Changing</span>
              <span className="block">
                <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                  Healthcare Forever
                </span>
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Medicare Pro isn't just another medical platform—it's a movement to make quality healthcare 
              accessible, affordable, and delightful for everyone through cutting-edge technology.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-3xl text-center hover-lift"
            >
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}<span className="text-gradient">{stat.suffix}</span>
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative glass-card rounded-3xl p-10 overflow-hidden">
              <div className="flex items-start mb-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 mr-6"
                >
                  <Target className="h-10 w-10 text-blue-600" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6" />
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600 leading-relaxed mb-8"
              >
                To bridge the digital divide in healthcare by creating an ecosystem where 
                <span className="text-gradient font-semibold"> every patient </span>
                can connect with
                <span className="text-gradient font-semibold"> trusted doctors </span>
                in seconds, receive
                <span className="text-gradient font-semibold"> personalized care </span>
                , and manage their health journey through intuitive technology.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center text-blue-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Accessible to All</span>
                </div>
                <div className="flex items-center text-purple-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Affordable Care</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative glass-card rounded-3xl p-10 overflow-hidden">
              <div className="flex items-start mb-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 mr-6"
                >
                  <Globe className="h-10 w-10 text-purple-600" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6" />
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 leading-relaxed mb-8"
              >
                To become the
                <span className="text-gradient font-bold"> most trusted healthcare platform </span>
                globally, where artificial intelligence meets human compassion to deliver
                <span className="text-gradient font-bold"> predictive, preventive, and personalized </span>
                healthcare experiences that transcend geographical boundaries and economic barriers.
              </motion.p>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full"
              >
                <Rocket className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gradient font-medium">Pioneering the Future of Healthcare</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-6">
              <Star className="h-5 w-5 text-yellow-500 mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Our <span className="text-gradient">Core Values</span>
              </h2>
              <Star className="h-5 w-5 text-yellow-500 ml-3" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every feature we build
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                onHoverStart={() => setHoveredValue(index)}
                onHoverEnd={() => setHoveredValue(null)}
                transition={{ duration: 0.4, delay: value.delay }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className={`absolute inset-0 ${value.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                <div className="relative glass-card rounded-3xl p-8 h-full hover-lift">
                  <div className="flex items-start mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 rounded-2xl ${value.color} mr-4`}
                    >
                      <value.icon className={`h-7 w-7 ${value.iconColor}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                      <AnimatePresence mode="wait">
                        {hoveredValue === index && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "40px" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <p className="text-gray-600">{value.description}</p>
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: value.delay + 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-16">
            Our <span className="text-gradient">Journey</span>
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="glass-card rounded-2xl p-6">
                      <div className="text-sm font-semibold text-gradient mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      className="relative"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                  
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-4xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=2000')] bg-cover bg-center opacity-10" />
          
          <div className="relative text-center text-white py-16 px-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <InfinityIcon className="h-12 w-12" />
              </div>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Join the
              <span className="block text-white/90">Healthcare Revolution?</span>
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Be part of the movement that's making quality healthcare accessible to millions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl text-lg font-semibold flex items-center justify-center space-x-3"
              >
                <Users className="h-6 w-6" />
                <span>Join Our Community</span>
                <Sparkles className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl hover:bg-white/20 text-lg font-semibold flex items-center justify-center space-x-3"
              >
                <TrendingUp className="h-6 w-6" />
                <span>View Open Positions</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}