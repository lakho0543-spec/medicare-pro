import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Phone, Calendar, Clock, Users, MessageSquare,
  Mic, MicOff, VideoIcon, VideoOff, PhoneOff, Settings,
  Shield, CheckCircle, Star, Zap, Sparkles, Heart,
  FileText, Pill, Camera, CameraOff, Volume2, VolumeX,
  Share2, Maximize2, Minimize2, User, ChevronRight,
  Plus, Minus, Bell, Clock as ClockIcon, Award,
  TrendingUp, Target, Globe, MessageCircle, Download,
  Bookmark, Headphones, Wifi, Battery, ArrowRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function VideoConsultation() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callTime, setCallTime] = useState('00:00');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello! How are you feeling today?', time: '10:00' },
    { id: 2, sender: 'patient', text: 'I have a persistent headache since morning', time: '10:01' },
    { id: 3, sender: 'doctor', text: 'Any fever or other symptoms?', time: '10:02' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState('excellent');

  const videoRef = useRef(null);
  const chatRef = useRef(null);
  const timerRef = useRef(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      rating: 4.9,
      nextAvailable: "Today, 4:00 PM",
      fee: 150,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      available: true
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      rating: 4.8,
      nextAvailable: "Tomorrow, 10:00 AM",
      fee: 180,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
      available: true
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialization: "Pediatrician",
      rating: 4.7,
      nextAvailable: "Monday, 9:00 AM",
      fee: 120,
      image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop&crop=face",
      available: false
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encrypted video calls"
    },
    {
      icon: FileText,
      title: "Digital Prescriptions",
      description: "Get prescriptions instantly after consultation"
    },
    {
      icon: Pill,
      title: "Medicine Delivery",
      description: "Get medicines delivered to your doorstep"
    },
    {
      icon: Download,
      title: "Session Recording",
      description: "Record consultations for future reference"
    }
  ];

  // Simulate call timer
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => {
          const newDuration = prev + 1;
          const minutes = Math.floor(newDuration / 60);
          const seconds = newDuration % 60;
          setCallTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
          return newDuration;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCallDuration(0);
      setCallTime('00:00');
    }

    return () => clearInterval(timerRef.current);
  }, [isCallActive]);

  // Simulate connection quality changes
  useEffect(() => {
    const qualities = ['excellent', 'good', 'poor'];
    const interval = setInterval(() => {
      if (isCallActive) {
        const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
        setConnectionQuality(randomQuality);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isCallActive]);

  const handleStartCall = () => {
    if (!selectedDoctor) {
      toast.error('Please select a doctor first');
      return;
    }

    setIsCallActive(true);
    toast.success('Connecting to video call...', {
      icon: '📞',
      duration: 2000,
    });

    // Simulate video stream
    if (videoRef.current) {
      // In a real app, this would be the actual video stream
      // For demo, we'll just show a placeholder
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    toast('Call ended. Prescription has been sent to your email.', {
      icon: '📄',
      duration: 4000,
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'patient',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Auto-reply from doctor (simulated)
    setTimeout(() => {
      const replies = [
        "I understand. Can you describe the pain more?",
        "Have you taken any medication?",
        "Let me check your previous reports.",
        "I recommend taking rest and drinking plenty of water."
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        sender: 'doctor',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? 'Recording stopped' : 'Recording started', {
      icon: '🎥',
    });
  };

  const ConnectionIndicator = ({ quality }) => {
    const getColor = () => {
      switch(quality) {
        case 'excellent': return 'text-green-500';
        case 'good': return 'text-yellow-500';
        case 'poor': return 'text-red-500';
        default: return 'text-gray-500';
      }
    };

    const getIcon = () => {
      switch(quality) {
        case 'excellent': return <Wifi className="h-5 w-5" />;
        case 'good': return <Wifi className="h-5 w-5" />;
        case 'poor': return <Wifi className="h-5 w-5" />;
        default: return <Wifi className="h-5 w-5" />;
      }
    };

    return (
      <div className={`flex items-center space-x-2 ${getColor()}`}>
        {getIcon()}
        <span className="text-sm capitalize">{quality}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
              }}
              animate={{
                y: [0, -100, 0],
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

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse" />
                  <div className="relative p-5 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600">
                    <Video className="h-16 w-16 text-white" />
                    <Sparkles className="absolute -top-3 -right-3 h-8 w-8 text-yellow-300" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                Virtual <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Video Consultations</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Connect with top doctors from the comfort of your home. 
                Secure, private, and available 24/7.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { value: '10K+', label: 'Video Consultations', icon: Video },
                { value: '98%', label: 'Patient Satisfaction', icon: Star },
                { value: '15min', label: 'Avg. Wait Time', icon: Clock },
                { value: '24/7', label: 'Available Support', icon: Users },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6 text-center hover-lift"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
                    <stat.icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Doctor Selection */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 space-y-8"
              >
                {/* Consultation Type */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gradient">Consultation Type</h3>
                  <div className="space-y-4">
                    {[
                      { type: 'video', icon: Video, title: 'Video Call', desc: 'Face-to-face consultation' },
                      { type: 'audio', icon: Phone, title: 'Audio Call', desc: 'Voice-only consultation' },
                      { type: 'chat', icon: MessageSquare, title: 'Chat', desc: 'Text-based consultation' },
                    ].map((option) => (
                      <button
                        key={option.type}
                        onClick={() => setConsultationType(option.type)}
                        className={`w-full p-4 rounded-2xl text-left transition-all ${
                          consultationType === option.type
                            ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30'
                            : 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`p-3 rounded-xl mr-4 ${
                            consultationType === option.type
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                              : 'bg-gray-700'
                          }`}>
                            <option.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold">{option.title}</div>
                            <div className="text-sm text-gray-400">{option.desc}</div>
                          </div>
                          {consultationType === option.type && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Available Doctors */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gradient">Available Now</h3>
                    <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor)}
                        className={`w-full p-4 rounded-2xl text-left transition-all ${
                          selectedDoctor?.id === doctor.id
                            ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30'
                            : 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700'
                        } ${!doctor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!doctor.available}
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{doctor.name}</div>
                            <div className="text-sm text-gray-400">{doctor.specialization}</div>
                            <div className="flex items-center text-sm text-yellow-500 mt-1">
                              <Star className="h-3 w-3 fill-current mr-1" />
                              {doctor.rating}
                            </div>
                          </div>
                          {doctor.available ? (
                            <div className="text-right">
                              <div className="text-sm text-green-400">Available</div>
                              <div className="text-xs text-gray-400">{doctor.nextAvailable}</div>
                            </div>
                          ) : (
                            <div className="text-red-400 text-sm">Unavailable</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gradient">Features</h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 rounded-xl bg-gray-900/30">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 mr-4">
                          <feature.icon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">{feature.title}</div>
                          <div className="text-sm text-gray-400">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Video Call Interface */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                {/* Main Video Call Interface */}
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden">
                  {/* Video Area */}
                  <div className="relative bg-gray-900 h-96 lg:h-[500px]">
                    {isCallActive ? (
                      <>
                        {/* Doctor Video (Simulated) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center mb-6">
                              <Video className="h-20 w-20 text-blue-400" />
                            </div>
                            <div className="text-2xl font-bold">{selectedDoctor?.name}</div>
                            <div className="text-gray-400">{selectedDoctor?.specialization}</div>
                            
                            {/* Call Timer */}
                            <div className="mt-6 text-3xl font-mono font-bold">{callTime}</div>
                            <div className="text-sm text-gray-400 mt-2">Call Duration</div>
                          </div>
                        </div>

                        {/* User Video (Small Picture-in-Picture) */}
                        <div className="absolute bottom-4 right-4 w-32 h-32 rounded-2xl overflow-hidden border-2 border-blue-500">
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <User className="h-12 w-12 text-gray-400" />
                          </div>
                          {!isVideoOn && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <CameraOff className="h-8 w-8 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Connection Quality */}
                        <div className="absolute top-4 left-4">
                          <ConnectionIndicator quality={connectionQuality} />
                        </div>

                        {/* Recording Indicator */}
                        {isRecording && (
                          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-600/80 px-3 py-2 rounded-full">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <span className="text-sm">Recording</span>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Pre-call Screen */
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center mb-8">
                          <Video className="h-20 w-20 text-blue-400" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Ready to Connect?</h3>
                        <p className="text-gray-400 text-center mb-8 max-w-md">
                          Select a doctor and consultation type to start your virtual visit
                        </p>
                        
                        {selectedDoctor && (
                          <div className="bg-gray-800/50 rounded-2xl p-6 mb-8">
                            <div className="flex items-center">
                              <img 
                                src={selectedDoctor.image} 
                                alt={selectedDoctor.name}
                                className="w-16 h-16 rounded-full mr-4"
                              />
                              <div>
                                <div className="text-xl font-bold">{selectedDoctor.name}</div>
                                <div className="text-gray-400">{selectedDoctor.specialization}</div>
                                <div className="flex items-center text-yellow-500 mt-1">
                                  <Star className="h-4 w-4 fill-current mr-1" />
                                  {selectedDoctor.rating}
                                </div>
                              </div>
                              <div className="ml-auto text-right">
                                <div className="text-2xl font-bold">${selectedDoctor.fee}</div>
                                <div className="text-sm text-gray-400">consultation</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Call Controls */}
                  <div className="bg-gray-900/80 p-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                      {/* Left Controls */}
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsMuted(!isMuted)}
                          className={`p-4 rounded-2xl ${
                            isMuted
                              ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsVideoOn(!isVideoOn)}
                          className={`p-4 rounded-2xl ${
                            !isVideoOn
                              ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {isVideoOn ? <VideoIcon className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleRecording}
                          className={`p-4 rounded-2xl ${
                            isRecording
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-white' : 'bg-red-500'}`} />
                            <span>Record</span>
                          </div>
                        </motion.button>
                      </div>

                      {/* Main Call Button */}
                      <div className="flex items-center space-x-4">
                        {isCallActive ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEndCall}
                            className="px-8 py-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 flex items-center space-x-3"
                          >
                            <PhoneOff className="h-6 w-6" />
                            <span className="text-lg font-semibold">End Call</span>
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartCall}
                            disabled={!selectedDoctor}
                            className={`px-8 py-4 rounded-2xl flex items-center space-x-3 ${
                              selectedDoctor
                                ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:shadow-lg'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <Phone className="h-6 w-6" />
                            <span className="text-lg font-semibold">
                              {selectedDoctor ? 'Start Video Call' : 'Select a Doctor'}
                            </span>
                            <ArrowRight className="h-5 w-5" />
                          </motion.button>
                        )}
                      </div>

                      {/* Right Controls */}
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowChat(!showChat)}
                          className={`p-4 rounded-2xl ${
                            showChat
                              ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          <MessageSquare className="h-6 w-6" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsFullScreen(!isFullScreen)}
                          className="p-4 rounded-2xl bg-gray-800 text-gray-300 hover:bg-gray-700"
                        >
                          {isFullScreen ? <Minimize2 className="h-6 w-6" /> : <Maximize2 className="h-6 w-6" />}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 rounded-2xl bg-gray-800 text-gray-300 hover:bg-gray-700"
                        >
                          <Settings className="h-6 w-6" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Chat Panel */}
                  <AnimatePresence>
                    {showChat && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: '300px' }}
                        exit={{ height: 0 }}
                        className="border-t border-gray-700"
                      >
                        <div className="p-4 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">Chat with Doctor</h4>
                            <button onClick={() => setShowChat(false)}>
                              <X className="h-5 w-5 text-gray-400" />
                            </button>
                          </div>
                          
                          {/* Messages */}
                          <div className="flex-1 overflow-y-auto space-y-4 mb-4" ref={chatRef}>
                            {messages.map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`max-w-xs p-3 rounded-2xl ${
                                    msg.sender === 'patient'
                                      ? 'bg-blue-600 text-white rounded-br-none'
                                      : 'bg-gray-700 text-gray-200 rounded-bl-none'
                                  }`}
                                >
                                  <div>{msg.text}</div>
                                  <div className={`text-xs mt-1 ${
                                    msg.sender === 'patient' ? 'text-blue-200' : 'text-gray-400'
                                  }`}>
                                    {msg.time}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Message Input */}
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                              placeholder="Type your message..."
                              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500"
                            />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleSendMessage}
                              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg"
                            >
                              Send
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
                    <h4 className="text-xl font-bold mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-500" />
                      Security & Privacy
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        End-to-end encryption
                      </li>
                      <li className="flex items-center text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        No recording without consent
                      </li>
                      <li className="flex items-center text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        HIPAA compliant
                      </li>
                      <li className="flex items-center text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        Data deleted after 30 days
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
                    <h4 className="text-xl font-bold mb-4 flex items-center">
                      <Headphones className="h-5 w-5 mr-2 text-blue-500" />
                      Need Help?
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Having technical issues or need assistance with your consultation?
                    </p>
                    <div className="space-y-3">
                      <button className="w-full py-3 bg-gray-900/50 hover:bg-gray-800 rounded-xl flex items-center justify-center space-x-3">
                        <MessageCircle className="h-5 w-5" />
                        <span>Live Chat Support</span>
                      </button>
                      <button className="w-full py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 rounded-xl flex items-center justify-center space-x-3">
                        <Phone className="h-5 w-5" />
                        <span>Call Support: +92 300 123 4567</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-8"
            >
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Heart className="h-12 w-12" />
              </div>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Experience Healthcare
              <span className="block text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Reimagined
              </span>
            </h2>
            
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              Join thousands of patients who have transformed their healthcare experience with virtual consultations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/book-appointment">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-blue-600 rounded-2xl hover:shadow-2xl text-lg font-semibold flex items-center justify-center space-x-4"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Book Appointment Now</span>
                </motion.button>
              </Link>
              
              <button
                onClick={() => toast.success('Demo consultation scheduled!')}
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-2xl hover:bg-white/20 text-lg font-semibold flex items-center justify-center space-x-4"
              >
                <Video className="h-6 w-6" />
                <span>Try Free Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Add missing X component
function X(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}