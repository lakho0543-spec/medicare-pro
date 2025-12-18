import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MapPin, AlertTriangle, Clock,
  Shield, Heart, Users, Star, ChevronRight, X,
  Search, Filter, Navigation, Share2, MessageCircle,
  Volume2, VolumeX, Battery, Wifi, Signal, Target,
  Bell, CheckCircle, Plus, Minus, Calendar, User,
  FileText, Pill, Activity, Brain, Eye,
  ShieldCheck, Sparkles, Zap, TrendingUp, Globe,
  ArrowRight, Bell as BellIcon, Shield as ShieldIcon,
  PhoneCall, Car, Navigation2, Map, Compass, Flag, Home,
  Thermometer, Wind, Sun, Sunrise, Droplets, Umbrella,
  Building2, HeartPulse, Stethoscope,
  BatteryCharging, Target as TargetIcon
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Custom Icon Components
const SirenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v6H7v-6Z" />
    <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2H5v-2Z" />
    <path d="M21 12h1" />
    <path d="M18.5 4.5 18 5" />
    <path d="M2 12h1" />
    <path d="M12 2v1" />
    <path d="m5.5 4.5.5.5" />
    <path d="M12 9v4" />
  </svg>
);

const AmbulanceIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 10H6" />
    <path d="M14 14H6" />
    <path d="M18 2v4" />
    <path d="M4 10v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    <path d="M18 18h2a2 2 0 0 0 2-2v-6" />
    <path d="M4 10h16" />
    <path d="M8 22h2" />
    <path d="M14 22h2" />
  </svg>
);

// Static Data
const EMERGENCY_TYPES = [
  { id: 'heart', name: 'Heart Attack', icon: Heart, color: 'from-red-500 to-rose-600', priority: 'critical' },
  { id: 'accident', name: 'Accident', icon: Car, color: 'from-orange-500 to-amber-600', priority: 'critical' },
  { id: 'stroke', name: 'Stroke', icon: Brain, color: 'from-purple-500 to-violet-600', priority: 'critical' },
  { id: 'breathing', name: 'Breathing', icon: Wind, color: 'from-cyan-500 to-blue-600', priority: 'high' },
  { id: 'bleeding', name: 'Bleeding', icon: Droplets, color: 'from-red-600 to-pink-600', priority: 'high' },
  { id: 'burn', name: 'Burn', icon: Thermometer, color: 'from-yellow-500 to-orange-600', priority: 'medium' },
  { id: 'fever', name: 'High Fever', icon: Thermometer, color: 'from-pink-500 to-rose-500', priority: 'medium' },
  { id: 'poison', name: 'Poisoning', icon: Pill, color: 'from-green-500 to-emerald-600', priority: 'high' },
];

const EMERGENCY_CONTACTS = [
  { name: 'National Emergency', number: '112', type: 'emergency', icon: PhoneCall },
  { name: 'Ambulance', number: '115', type: 'ambulance', icon: AmbulanceIcon },
  { name: 'Rescue', number: '1122', type: 'rescue', icon: Users },
  { name: 'Police', number: '15', type: 'police', icon: Shield },
  { name: 'Fire Brigade', number: '16', type: 'fire', icon: Thermometer },
  { name: 'Women Helpline', number: '1099', type: 'helpline', icon: Heart },
];

const FIRST_AID_TIPS = [
  { title: 'Heart Attack', steps: ['Call emergency', 'Chew aspirin', 'CPR if trained'] },
  { title: 'Bleeding', steps: ['Apply pressure', 'Elevate wound', 'Clean and bandage'] },
  { title: 'Burns', steps: ['Cool with water', 'Cover loosely', 'Don\'t pop blisters'] },
  { title: 'Choking', steps: ['5 back blows', '5 abdominal thrusts', 'Call if persists'] },
];

const STATS = [
  { value: '24/7', label: 'Available', icon: Clock },
  { value: '<10min', label: 'Avg Response', icon: TargetIcon },
  { value: '99%', label: 'Success Rate', icon: ShieldCheck },
  { value: '500+', label: 'Saved Lives', icon: Heart },
];

const PREPAREDNESS_TIPS = [
  'Keep emergency contacts handy',
  'Know your location and address',
  'Keep medical history accessible',
  'Have basic first aid kit ready',
];

export default function Emergency() {
  // State Management
  const [emergencyType, setEmergencyType] = useState('all');
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [trackingAmbulance, setTrackingAmbulance] = useState(false);
  const [ambulanceETA, setAmbulanceETA] = useState('8 min');
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [emergencyTimer, setEmergencyTimer] = useState(0);
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Memoized Data
  const hospitals = useMemo(() => [
    {
      id: 1,
      name: 'Aga Khan Hospital',
      distance: '2.5 km',
      eta: '8 minutes',
      rating: 4.9,
      beds: 45,
      available: true,
      specialties: ['Cardiology', 'Neurology', 'Emergency'],
      contact: '021-111 911 911',
      image: 'https://images.unsplash.com/photo-1516549655669-df565bcb5b0d?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      name: 'Shaukat Khanum Hospital',
      distance: '5.2 km',
      eta: '12 minutes',
      rating: 4.8,
      beds: 32,
      available: true,
      specialties: ['Cancer Care', 'Surgery', 'ICU'],
      contact: '021-111 555 666',
      image: 'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      name: 'Jinnah Hospital',
      distance: '3.8 km',
      eta: '10 minutes',
      rating: 4.6,
      beds: 28,
      available: true,
      specialties: ['Trauma', 'Burn Center', 'Surgery'],
      contact: '021-9921 3000',
      image: 'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      name: 'Ziauddin Hospital',
      distance: '4.5 km',
      eta: '11 minutes',
      rating: 4.7,
      beds: 36,
      available: false,
      specialties: ['Cardiology', 'Pediatrics', 'Maternity'],
      contact: '021-3662 0627',
      image: 'https://images.unsplash.com/photo-1516549655669-df565bcb5b0d?w=800&h=600&fit=crop'
    },
  ], []);

  const ambulanceServices = useMemo(() => [
    { id: 1, name: 'Edhi Ambulance', number: '115', eta: '7 min', available: true },
    { id: 2, name: 'Chhipa Ambulance', number: '1020', eta: '9 min', available: true },
    { id: 3, name: 'Aman Ambulance', number: '1021', eta: '12 min', available: true },
    { id: 4, name: 'Rescue 1122', number: '1122', eta: '15 min', available: false },
  ], []);

  // Event Handlers
  const handleSOS = useCallback(() => {
    if (!sosActive) {
      setSosActive(true);
      toast.error('EMERGENCY SOS ACTIVATED!', {
        icon: '🚨',
        duration: 5000,
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold'
        },
      });

      setTimeout(() => {
        toast.success('Emergency services notified. Help is on the way!', {
          icon: '🆘',
          duration: 4000,
        });
        setTrackingAmbulance(true);
        setEmergencyActive(true);
      }, 2000);
    } else {
      setSosActive(false);
      setEmergencyActive(false);
      setEmergencyTimer(0);
      toast('SOS deactivated. Stay safe!', {
        icon: '✅',
      });
    }
  }, [sosActive]);

  const callEmergency = useCallback((number, name) => {
    toast.success(`Calling ${name || number}...`, {
      icon: '📞',
      duration: 2000,
    });
    window.location.href = `tel:${number}`;
  }, []);

  const requestAmbulance = useCallback((service) => {
    setShowAmbulanceModal(false);
    setTrackingAmbulance(true);
    
    toast.success(`${service.name} dispatched! ETA: ${service.eta}`, {
      icon: '🚑',
      duration: 4000,
    });

    toast('Sharing your location with emergency contacts...', {
      icon: '📍',
      duration: 3000,
    });
  }, []);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getPriorityColor = useCallback((priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-900/30 text-red-400';
      case 'high': return 'bg-orange-900/30 text-orange-400';
      default: return 'bg-yellow-900/30 text-yellow-400';
    }
  }, []);

  const getContactColor = useCallback((type) => {
    switch(type) {
      case 'emergency': return 'bg-red-600/20 text-red-400';
      case 'ambulance': return 'bg-orange-600/20 text-orange-400';
      case 'police': return 'bg-blue-600/20 text-blue-400';
      default: return 'bg-purple-600/20 text-purple-400';
    }
  }, []);

  // Effects
  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setUserLocation({ lat: 24.8607, lng: 67.0011 }); // Default to Karachi
        }
      );
    } else {
      setUserLocation({ lat: 24.8607, lng: 67.0011 });
    }
  }, []);

  useEffect(() => {
    if (trackingAmbulance) {
      const interval = setInterval(() => {
        const times = ['7 min', '6 min', '5 min', '4 min', '3 min', '2 min', '1 min', 'Arriving'];
        setAmbulanceETA(prev => {
          const index = times.indexOf(prev);
          return times[index + 1] || 'Arriving';
        });
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [trackingAmbulance]);

  useEffect(() => {
    if (emergencyActive) {
      const timer = setInterval(() => {
        setEmergencyTimer(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [emergencyActive]);

  // Render Components
  const renderEmergencyAlert = () => (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 py-3 px-4 text-center animate-pulse"
    >
      <div className="container mx-auto flex items-center justify-center space-x-4">
        <SirenIcon className="h-6 w-6 animate-spin" />
        <span className="font-bold text-lg">EMERGENCY IN PROGRESS • {formatTime(emergencyTimer)}</span>
        <SirenIcon className="h-6 w-6 animate-spin" />
      </div>
    </motion.div>
  );

  const renderSOSButton = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleSOS}
      className={`relative px-16 py-8 rounded-3xl text-3xl font-bold shadow-2xl ${
        sosActive
          ? 'animate-pulse bg-gradient-to-r from-red-600 via-red-700 to-red-600'
          : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
      }`}
    >
      <div className="absolute inset-0 rounded-3xl border-4 border-white/30" />
      <div className="flex items-center justify-center space-x-4">
        <SirenIcon className="h-10 w-10" />
        <span>EMERGENCY SOS</span>
        <SirenIcon className="h-10 w-10" />
      </div>
      <div className="text-sm mt-4 opacity-90">
        {sosActive ? 'HELP IS ON THE WAY!' : 'PRESS IN EMERGENCY'}
      </div>
    </motion.button>
  );

  const renderStats = () => (
    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat, index) => (
        <div key={stat.label} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold mb-2">{stat.value}</div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );

  const renderEmergencyTypes = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-gradient">Emergency Types</h3>
      <div className="grid grid-cols-2 gap-4">
        {EMERGENCY_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setEmergencyType(type.id)}
            className={`p-4 rounded-2xl text-left transition-all ${
              emergencyType === type.id
                ? 'bg-gradient-to-r from-red-600/30 to-orange-600/30 border border-red-500/30'
                : 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700'
            }`}
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${type.color} mb-3`}>
              <type.icon className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold">{type.name}</div>
            <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${getPriorityColor(type.priority)}`}>
              {type.priority.toUpperCase()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gradient">Emergency Contacts</h3>
        <Bell className="h-5 w-5 text-red-500 animate-pulse" />
      </div>
      <div className="space-y-3">
        {EMERGENCY_CONTACTS.map((contact, index) => (
          <button
            key={index}
            onClick={() => callEmergency(contact.number, contact.name)}
            className="w-full p-4 rounded-2xl bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700 transition-all flex items-center"
          >
            <div className={`p-3 rounded-xl mr-4 ${getContactColor(contact.type)}`}>
              <contact.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">{contact.name}</div>
              <div className="text-sm text-gray-400">{contact.number}</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderFirstAidTips = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-gradient">Quick First Aid</h3>
      <div className="space-y-4">
        {FIRST_AID_TIPS.map((tip, index) => (
          <div key={index} className="p-4 rounded-xl bg-gray-900/30 border border-gray-700">
            <div className="font-semibold mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
              {tip.title}
            </div>
            <ul className="text-sm text-gray-300 space-y-1">
              {tip.steps.map((step, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAmbulanceServices = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gradient">Ambulance Services</h3>
          <p className="text-gray-400">Nearest available ambulances</p>
        </div>
        {trackingAmbulance && (
          <div className="flex items-center space-x-2 bg-green-900/30 text-green-400 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Ambulance En Route • ETA: {ambulanceETA}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {ambulanceServices.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-2xl border transition-all ${
              service.available
                ? 'border-gray-700 hover:border-red-500 bg-gray-900/30'
                : 'border-gray-800 bg-gray-900/10 opacity-50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-red-600/20 text-red-400 mr-4">
                  <AmbulanceIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-lg">{service.name}</div>
                  <div className="text-gray-400">Call: {service.number}</div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                service.available
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-red-900/30 text-red-400'
              }`}>
                {service.available ? 'AVAILABLE' : 'BUSY'}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Estimated arrival: <span className="font-bold text-white">{service.eta}</span>
              </div>
              <button
                onClick={() => service.available && requestAmbulance(service)}
                disabled={!service.available}
                className={`px-4 py-2 rounded-xl font-medium ${
                  service.available
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:shadow-lg'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                Call Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => callEmergency('112', 'National Emergency')}
          className="p-4 rounded-xl bg-red-600/20 border border-red-600/30 hover:bg-red-600/30 flex flex-col items-center justify-center"
        >
          <PhoneCall className="h-6 w-6 text-red-400 mb-2" />
          <span className="text-sm">National Emergency</span>
        </button>
        <button
          onClick={() => setShowAmbulanceModal(true)}
          className="p-4 rounded-xl bg-orange-600/20 border border-orange-600/30 hover:bg-orange-600/30 flex flex-col items-center justify-center"
        >
          <AmbulanceIcon className="h-6 w-6 text-orange-400 mb-2" />
          <span className="text-sm">Book Ambulance</span>
        </button>
        <button
          onClick={() => callEmergency('1122', 'Rescue')}
          className="p-4 rounded-xl bg-blue-600/20 border border-blue-600/30 hover:bg-blue-600/30 flex flex-col items-center justify-center"
        >
          <Users className="h-6 w-6 text-blue-400 mb-2" />
          <span className="text-sm">Emergency Contacts</span>
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
          }}
          className="p-4 rounded-xl bg-purple-600/20 border border-purple-600/30 hover:bg-purple-600/30 flex flex-col items-center justify-center"
        >
          <Share2 className="h-6 w-6 text-purple-400 mb-2" />
          <span className="text-sm">Share Location</span>
        </button>
      </div>
    </div>
  );

  const renderHospitals = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gradient">Nearby Hospitals</h3>
          <p className="text-gray-400">Emergency rooms with available beds</p>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-red-400" />
          <span className="text-sm">Your Location: Karachi</span>
        </div>
      </div>

      <div className="space-y-6">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className={`p-6 rounded-2xl border transition-all ${
              hospital.available
                ? 'border-gray-700 hover:border-green-500 bg-gray-900/30'
                : 'border-gray-800 bg-gray-900/10 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-xl overflow-hidden mr-4">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-xl mb-2">{hospital.name}</div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hospital.distance} away
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      ETA: {hospital.eta}
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      {hospital.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-medium ${
                hospital.available
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-red-900/30 text-red-400'
              }`}>
                {hospital.available ? `${hospital.beds} Beds Available` : 'FULL'}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Specialties:</div>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <div className="text-gray-400">Contact:</div>
                <div className="font-medium">{hospital.contact}</div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => callEmergency(hospital.contact, hospital.name)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-lg"
                >
                  Call Hospital
                </button>
                <button
                  onClick={() => {
                    setSelectedHospital(hospital);
                    toast.success(`Directions to ${hospital.name} opened`, {
                      icon: '🗺️',
                    });
                  }}
                  className="px-4 py-2 border border-gray-600 rounded-xl hover:bg-gray-800"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmergencyInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
        <h4 className="text-xl font-bold mb-6 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-500" />
          Emergency Preparedness
        </h4>
        <ul className="space-y-4">
          {PREPAREDNESS_TIPS.map((tip, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6">
        <h4 className="text-xl font-bold mb-6 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-green-500" />
          Live Support
        </h4>
        <p className="text-gray-300 mb-6">
          Need immediate assistance or have questions about emergency procedures?
        </p>
        <div className="space-y-4">
          <button
            onClick={() => callEmergency('112', 'Emergency Hotline')}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl hover:shadow-lg flex items-center justify-center space-x-3"
          >
            <Phone className="h-5 w-5" />
            <span>Emergency Hotline: 112</span>
          </button>
          <button className="w-full py-3 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700 rounded-xl flex items-center justify-center space-x-3">
            <MessageCircle className="h-5 w-5" />
            <span>Chat with Emergency Support</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      {/* Emergency Alert Bar */}
      {emergencyActive && renderEmergencyAlert()}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-orange-600/20 to-red-600/20" />
        
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
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
                  <div className="relative p-5 rounded-3xl bg-gradient-to-r from-red-600 to-orange-600">
                    <AlertTriangle className="h-16 w-16 text-white" />
                    <Sparkles className="absolute -top-3 -right-3 h-8 w-8 text-yellow-300" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                Emergency <span className="text-gradient bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">Services</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Immediate medical assistance when you need it most. 
                24/7 emergency response with live tracking and support.
              </p>
            </motion.div>

            {/* SOS Button */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="text-center mb-16"
            >
              {renderSOSButton()}
              {renderStats()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Emergency Types & Contacts */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                {renderEmergencyTypes()}
                {renderEmergencyContacts()}
                {renderFirstAidTips()}
              </motion.div>

              {/* Center Column - Ambulance & Tracking */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 space-y-8"
              >
                {renderAmbulanceServices()}
                {renderHospitals()}
                {renderEmergencyInfo()}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-orange-600/20 to-yellow-600/20" />
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Your Safety is Our
              <span className="block text-gradient bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
                Top Priority
              </span>
            </h2>
            
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              We're here for you 24/7. In case of emergency, don't hesitate to use our SOS button or call emergency services immediately.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleSOS}
                className={`px-10 py-5 rounded-2xl text-lg font-semibold flex items-center justify-center space-x-4 ${
                  sosActive
                    ? 'animate-pulse bg-gradient-to-r from-red-600 via-red-700 to-red-600'
                    : 'bg-white text-red-600 hover:shadow-2xl'
                }`}
              >
                <AlertTriangle className="h-6 w-6" />
                <span>{sosActive ? 'HELP IS COMING' : 'EMERGENCY SOS'}</span>
              </button>
              
              <Link to="/book-appointment">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-2xl hover:bg-white/20 text-lg font-semibold flex items-center justify-center space-x-4"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Non-Emergency</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Ambulance Modal */}
      <AnimatePresence>
        {showAmbulanceModal && (
          <AmbulanceModal onClose={() => setShowAmbulanceModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Separate Ambulance Modal Component
function AmbulanceModal({ onClose }) {
  const [patientCount, setPatientCount] = useState(1);
  const [emergencyType, setEmergencyType] = useState('');

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl z-50 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Request Ambulance</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-xl"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Emergency Type</label>
            <select
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500"
            >
              <option value="">Select emergency type</option>
              {EMERGENCY_TYPES.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Number of Patients</label>
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => setPatientCount(prev => Math.max(1, prev - 1))}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-3xl font-bold w-12 text-center">{patientCount}</span>
              <button
                onClick={() => setPatientCount(prev => prev + 1)}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Location</label>
            <div className="p-4 bg-gray-800 rounded-xl">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-3" />
                <div>
                  <div className="font-medium">Current Location</div>
                  <div className="text-sm text-gray-400">Karachi, Pakistan (GPS Enabled)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Additional Notes</label>
            <textarea
              placeholder="Describe the emergency situation..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 h-32 resize-none"
            />
          </div>
          
          <button
            onClick={() => {
              toast.success('Ambulance dispatched! Help is on the way.');
              onClose();
            }}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-lg font-semibold hover:shadow-lg"
          >
            Dispatch Ambulance Now
          </button>
        </div>
      </motion.div>
    </>
  );
}
