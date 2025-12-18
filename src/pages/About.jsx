import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Users, Award, Globe, Target, Shield, Sparkles, 
  Zap, Star, TrendingUp, CheckCircle, Rocket, ShieldCheck,
  Clock, Users2, Globe2, TargetIcon, HeartPulse, Brain,
  Leaf, Scale, Cpu, Palette, Eye, Infinity as InfinityIcon,
  Briefcase, GraduationCap, Building, Microscope,
  Activity, BarChart, DollarSign, EyeOff, HeartHandshake,
  ThumbsUp, Lock, Wifi, Cloud, Database, Server,
  MessageSquare, Video, Calendar, FileText, Smartphone,
  ArrowRight, Download, Mail, Phone, MapPin
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function About() {
  const [hoveredValue, setHoveredValue] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  const stats = [
    { icon: Users2, label: 'Active Users', value: '50K+', suffix: '', color: 'from-blue-500 to-cyan-500', trend: '+12%' },
    { icon: Globe2, label: 'Cities Covered', value: '25+', suffix: '', color: 'from-purple-500 to-pink-500', trend: '+5' },
    { icon: ShieldCheck, label: 'Verified Doctors', value: '500+', suffix: '', color: 'from-green-500 to-emerald-500', trend: '+45' },
    { icon: Clock, label: 'Avg Response', value: '15', suffix: 'min', color: 'from-yellow-500 to-orange-500', trend: '-3min' },
    { icon: HeartPulse, label: 'Health Score', value: '94%', suffix: '', color: 'from-red-500 to-rose-500', trend: '+8%' },
    { icon: BarChart, label: 'Satisfaction', value: '98%', suffix: '', color: 'from-indigo-500 to-violet-500', trend: '+2%' },
  ];

  const values = [
    {
      icon: HeartPulse,
      title: "Patient-Centered Care",
      description: "Every feature is designed with the patient's needs, comfort, and outcomes as our top priority.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-500/10 to-rose-500/10",
      iconColor: "text-pink-600",
      features: ["Personalized treatment plans", "24/7 patient support", "Health monitoring tools"],
      delay: 0.1
    },
    {
      icon: Shield,
      title: "Uncompromising Security",
      description: "Military-grade encryption and privacy protection for all health data and communications.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10",
      iconColor: "text-blue-600",
      features: ["HIPAA Compliant", "End-to-end encryption", "Regular security audits"],
      delay: 0.2
    },
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Cutting-edge artificial intelligence for accurate diagnostics and personalized healthcare.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-violet-500/10",
      iconColor: "text-purple-600",
      features: ["AI-powered diagnostics", "Predictive analytics", "Smart appointment scheduling"],
      delay: 0.3
    },
    {
      icon: TargetIcon,
      title: "Clinical Excellence",
      description: "Partnership with board-certified specialists and adherence to international medical standards.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-600",
      features: ["Board-certified doctors", "Evidence-based medicine", "Quality assurance protocols"],
      delay: 0.4
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Building a supportive ecosystem that extends beyond digital interactions to real-world impact.",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-gradient-to-br from-orange-500/10 to-amber-500/10",
      iconColor: "text-orange-600",
      features: ["Health awareness programs", "Free medical camps", "Educational resources"],
      delay: 0.5
    },
    {
      icon: Leaf,
      title: "Sustainable Future",
      description: "Eco-friendly digital solutions that reduce healthcare's environmental footprint.",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-teal-500/10 to-cyan-500/10",
      iconColor: "text-teal-600",
      features: ["Paperless consultations", "Carbon-neutral operations", "Green technology"],
      delay: 0.6
    },
  ];

  const team = [
    { name: "Dr. Sarah Khan", role: "Medical Director", specialization: "Cardiology", experience: "15 years", image: "👩‍⚕️" },
    { name: "Ali Ahmed", role: "CTO", specialization: "Health Tech", experience: "10 years", image: "👨‍💻" },
    { name: "Fatima Raza", role: "Head of Product", specialization: "UX Design", experience: "8 years", image: "👩‍🎨" },
    { name: "Dr. Omar Sheikh", role: "Clinical Advisor", specialization: "Neurology", experience: "12 years", image: "👨‍⚕️" },
  ];

  const certifications = [
    { name: "HIPAA Compliant", icon: ShieldCheck, description: "Healthcare data protection" },
    { name: "ISO 27001", icon: Lock, description: "Information security management" },
    { name: "FDA Registered", icon: Award, description: "Medical device standards" },
    { name: "GDPR Compliant", icon: Globe, description: "International data privacy" },
    { name: "SOC 2 Type II", icon: Server, description: "Security operations center" },
    { name: "PCI DSS", icon: CreditCard, description: "Payment security standards" },
  ];

  const handleJoinTeam = () => {
    navigate('/careers');
    toast.success('Redirecting to careers page');
  };

  const handleDownloadReport = () => {
    toast.success('Annual report download started');
    // Simulate download
    setTimeout(() => toast.success('Download complete!'), 2000);
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              background: i % 3 === 0 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)'
                : i % 3 === 1
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
              >
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🏆 Pakistan's #1 Digital Healthcare Platform
                </span>
                <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight"
              >
                <span className="block">Redefining</span>
                <span className="block">
                  <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                    Healthcare Excellence
                  </span>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                We're not just building technology—we're crafting the future of healthcare 
                where <span className="font-semibold text-blue-600">accessibility</span>, 
                <span className="font-semibold text-purple-600"> innovation</span>, and 
                <span className="font-semibold text-green-600"> compassion</span> converge to create meaningful impact.
              </motion.p>

              {/* Navigation Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-16"
              >
                {['overview', 'mission', 'values', 'team', 'certifications'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(tab)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize ${
                      activeSection === tab
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-24"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="glass-card rounded-2xl p-6 text-center group hover-lift"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 relative`}>
                    <stat.icon className="h-6 w-6 text-white relative z-10" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity`} />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                    {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                  <div className="text-xs font-medium text-green-500 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-6">
                <Target className="h-5 w-5 text-blue-500" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Our <span className="text-gradient">Purpose & Vision</span>
                </h2>
                <Target className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We exist to bridge healthcare gaps through technology that cares
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative glass-card rounded-3xl p-10 overflow-hidden">
                  <div className="flex items-start mb-8">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 mr-6"
                    >
                      <TargetIcon className="h-10 w-10 text-blue-600" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                      <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    To democratize healthcare access by creating an intelligent platform that connects 
                    <span className="text-gradient font-semibold"> every individual </span>
                    with
                    <span className="text-gradient font-semibold"> quality medical care </span>
                    , regardless of location or economic status, through seamless technology that 
                    <span className="text-gradient font-semibold"> understands, predicts, and personalizes </span>
                    the healthcare journey.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-blue-600">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Universal healthcare access</span>
                    </div>
                    <div className="flex items-center text-purple-600">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>AI-driven personalization</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Affordable care solutions</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
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
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                      <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    To become the world's most
                    <span className="text-gradient font-bold"> trusted healthcare intelligence platform </span>
                    , where artificial empathy meets clinical excellence to deliver
                    <span className="text-gradient font-bold"> predictive, preventive, and personalized </span>
                    healthcare that transcends boundaries, making quality medical care a fundamental right, not a privilege.
                  </p>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full"
                  >
                    <Rocket className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-gradient font-medium">Healthcare for the next generation</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-6">
                <Star className="h-5 w-5 text-yellow-500" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Our <span className="text-gradient">Guiding Principles</span>
                </h2>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core values shape every decision, feature, and interaction
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
                  <div className={`absolute inset-0 ${value.bgColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  <div className="relative glass-card rounded-3xl p-8 h-full hover-lift">
                    <div className="flex items-start mb-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-4 rounded-2xl bg-gradient-to-r ${value.color}/20 mr-4`}
                      >
                        <value.icon className={`h-7 w-7 ${value.iconColor}`} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                        <AnimatePresence mode="wait">
                          {hoveredValue === index && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "40px" }}
                              exit={{ opacity: 0, width: 0 }}
                              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{value.description}</p>
                    
                    <div className="space-y-2">
                      {value.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>

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
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-6">
                <Users className="h-5 w-5 text-blue-500" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Meet Our <span className="text-gradient">Leadership</span>
                </h2>
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate experts driving healthcare innovation forward
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 mx-auto">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-5xl">
                        {member.image}
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="absolute bottom-2 right-8 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                    >
                      <CheckCircle className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gradient font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.specialization}</p>
                  <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                    {member.experience} experience
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleJoinTeam}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto"
              >
                <Briefcase className="h-6 w-6" />
                <span>Join Our Team</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-6">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Our <span className="text-gradient">Accreditations</span>
                </h2>
                <ShieldCheck className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Committed to the highest standards of quality and security
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 mb-4">
                    <cert.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="font-bold text-gray-900 mb-2">{cert.name}</div>
                  <div className="text-sm text-gray-600">{cert.description}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadReport}
                className="px-8 py-4 bg-white border-2 border-blue-500 text-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-3"
              >
                <Download className="h-6 w-6" />
                <span>Download Annual Report</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-xl transition-all flex items-center gap-3"
              >
                <FileText className="h-6 w-6" />
                <span>View Compliance Documents</span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-4xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm" />
            
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
                Ready to Transform
                <span className="block">Healthcare Together?</span>
              </h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join thousands of healthcare professionals and patients in our mission to make quality care accessible to all
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl text-lg font-semibold flex items-center justify-center gap-3"
                >
                  <Sparkles className="h-6 w-6" />
                  <span>Get Started Free</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl hover:bg-white/20 text-lg font-semibold flex items-center justify-center gap-3"
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>Contact Our Team</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
