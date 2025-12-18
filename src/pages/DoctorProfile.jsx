import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, MapPin, Clock, Calendar, MessageSquare,
  Phone, Award, Users, CheckCircle, Shield,
  Heart, TrendingUp, FileText, Video, Stethoscope,
  Sparkles, Zap, Award as AwardIcon, GraduationCap,
  Languages, DollarSign, Globe, ShieldCheck,
  ChevronRight, Bookmark, Share2, Filter,
  ThumbsUp, MessageCircle, PhoneCall, BookOpen
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Static data
const LANGUAGES = ['English', 'Spanish', 'French', 'Arabic'];
const SPECIALTIES = ['Cardiology', 'Interventional Cardiology', 'Heart Failure'];
const AWARDS = [
  'Board Certified Cardiologist',
  'Fellowship in Interventional Cardiology',
  'American College of Cardiology Fellow',
  'Cardiology Excellence Award 2023'
];
const REVIEWS = [
  {
    id: 1,
    patient: 'John Smith',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Dr. Johnson saved my life. Her expertise and care are exceptional.',
    helpful: 24
  },
  {
    id: 2,
    patient: 'Maria Garcia',
    rating: 5,
    date: '1 month ago',
    comment: 'Very professional and thorough. Explained everything clearly.',
    helpful: 18
  },
  {
    id: 3,
    patient: 'Robert Chen',
    rating: 4,
    date: '2 months ago',
    comment: 'Great doctor, but wait time was a bit long.',
    helpful: 8
  }
];

export default function DoctorProfile() {
  const [selectedTab, setSelectedTab] = useState('about');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const doctor = useMemo(() => ({
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: "12 years",
    fee: "$150",
    city: "New York",
    rating: 4.9,
    reviews: 128,
    education: "MD from Harvard Medical School",
    fellowship: "Johns Hopkins Hospital",
    languages: LANGUAGES,
    availability: ["Mon-Fri: 9AM-5PM", "Sat: 10AM-2PM"],
    responseTime: "15 minutes",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  }), []);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from favorites' : 'Added to favorites!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleCall = () => {
    toast.success('Calling doctor\'s office...');
    // window.location.href = `tel:+1234567890`;
  };

  const renderStars = (rating) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < Math.floor(rating)
              ? 'text-yellow-500 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );

  const renderReview = (review) => (
    <motion.div
      key={review.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold">{review.patient}</div>
            <div className="text-sm text-gray-500">{review.date}</div>
          </div>
        </div>
        {renderStars(review.rating)}
      </div>
      <p className="text-gray-700 mb-4">{review.comment}</p>
      <div className="flex items-center text-sm text-gray-500">
        <button className="flex items-center mr-4 hover:text-blue-600">
          <ThumbsUp className="h-4 w-4 mr-1" />
          Helpful ({review.helpful})
        </button>
        <button className="flex items-center hover:text-blue-600">
          <MessageCircle className="h-4 w-4 mr-1" />
          Reply
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Doctor Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Doctor Image & Badges */}
              <div className="relative">
                <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={doctor.profileImage}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {doctor.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-full shadow-lg"
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </motion.div>
                )}
              </div>
              
              {/* Doctor Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h1 className="text-4xl font-bold text-gray-900 mr-4">{doctor.name}</h1>
                      <Sparkles className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 text-2xl font-bold mb-4">
                      {doctor.specialization}
                    </div>
                    
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center text-gray-700">
                        <AwardIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="h-5 w-5 text-green-500 mr-2" />
                        <span>{doctor.city}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-5 w-5 text-purple-500 mr-2" />
                        <span>Response: {doctor.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating Box */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6 min-w-[200px]">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{doctor.rating}</div>
                      <div className="flex items-center justify-center mb-3">
                        {renderStars(doctor.rating)}
                      </div>
                      <div className="text-gray-600">{doctor.reviews} reviews</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link to="/book-appointment">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover-glow flex items-center"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 flex items-center"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Message
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCall}
                    className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 flex items-center"
                  >
                    <PhoneCall className="h-5 w-5 mr-2" />
                    Call Now
                  </motion.button>
                  
                  <div className="flex ml-auto space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleBookmark}
                      className={`p-3 rounded-xl ${isBookmarked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShare}
                      className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <Share2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { id: 'about', label: 'About', icon: User },
              { id: 'experience', label: 'Experience', icon: Award },
              { id: 'reviews', label: `Reviews (${doctor.reviews})`, icon: Star },
              { id: 'availability', label: 'Availability', icon: Calendar },
              { id: 'location', label: 'Location', icon: MapPin },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-8"
            >
              {selectedTab === 'about' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Education & Experience */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 flex items-center">
                        <GraduationCap className="h-6 w-6 text-blue-600 mr-3" />
                        Education & Qualifications
                      </h3>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                          <div className="flex items-start mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mr-4">
                              <AwardIcon className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">Medical Degree</h4>
                              <p className="text-gray-700">{doctor.education}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="p-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white mr-4">
                              <Stethoscope className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">Fellowship</h4>
                              <p className="text-gray-700">{doctor.fellowship}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-4">Specialties</h4>
                          <div className="flex flex-wrap gap-2">
                            {SPECIALTIES.map((specialty, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full font-medium"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Languages & Info */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                          <Languages className="h-6 w-6 text-purple-600 mr-3" />
                          Languages Spoken
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {doctor.languages.map((lang) => (
                            <span
                              key={lang}
                              className="px-5 py-2 bg-white border-2 border-purple-200 text-purple-700 rounded-xl font-medium hover:border-purple-300 transition-colors"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                          <DollarSign className="h-6 w-6 text-green-600 mr-3" />
                          Consultation Fee
                        </h3>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                          <div className="text-4xl font-bold text-gray-900 mb-2">{doctor.fee}</div>
                          <p className="text-gray-600">Per consultation (30 minutes)</p>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              Insurance accepted
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              Flexible payment options
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              No hidden charges
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Awards & Recognition */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Award className="h-6 w-6 text-yellow-600 mr-3" />
                      Awards & Recognition
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {AWARDS.map((award, index) => (
                        <div key={index} className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl">
                          <Award className="h-5 w-5 text-yellow-600 mr-3" />
                          <span className="font-medium">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedTab === 'experience' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">12+</div>
                      <div className="text-gray-700">Years Experience</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">5,000+</div>
                      <div className="text-gray-700">Patients Treated</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
                      <div className="text-gray-700">Success Rate</div>
                    </div>
                  </div>
                  
                  {/* Experience Timeline */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold mb-4">Professional Journey</h4>
                    {[
                      { year: '2012-2015', role: 'Resident Physician', hospital: 'Massachusetts General Hospital' },
                      { year: '2015-2018', role: 'Cardiology Fellow', hospital: 'Johns Hopkins Hospital' },
                      { year: '2018-Present', role: 'Senior Cardiologist', hospital: 'New York Medical Center' },
                    ].map((exp, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex flex-col items-center mr-6">
                          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                          {index < 2 && <div className="w-0.5 h-12 bg-blue-200 mt-1"></div>}
                        </div>
                        <div>
                          <div className="font-bold text-lg">{exp.role}</div>
                          <div className="text-gray-600">{exp.hospital}</div>
                          <div className="text-blue-600 font-medium">{exp.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold">Patient Reviews</h3>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </button>
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        {showAllReviews ? 'Show Less' : 'Show All Reviews'}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {(showAllReviews ? REVIEWS : REVIEWS.slice(0, 3)).map(renderReview)}
                  </div>
                  
                  {!showAllReviews && REVIEWS.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(true)}
                      className="w-full mt-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-medium"
                    >
                      View All {REVIEWS.length} Reviews
                    </button>
                  )}
                </div>
              )}
              
              {selectedTab === 'availability' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold">Availability</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctor.availability.map((slot, index) => (
                      <div key={index} className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                        <div className="flex items-center mb-4">
                          <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                          <span className="text-lg font-semibold">{slot.split(':')[0]}</span>
                        </div>
                        <div className="text-gray-700">{slot.split(':')[1]}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <Zap className="h-5 w-5 text-green-600 mr-2" />
                      Same-day Appointments Available
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Limited slots available for urgent consultations. Book now for immediate attention.
                    </p>
                    <Link to="/book-appointment">
                      <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg">
                        Book Urgent Appointment
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              
              {selectedTab === 'location' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold">Location & Contact</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                          Clinic Address
                        </h4>
                        <p className="text-gray-700">
                          123 Medical Center Drive<br />
                          New York, NY 10001<br />
                          United States
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <Phone className="h-5 w-5 text-green-600 mr-2" />
                          Contact Information
                        </h4>
                        <div className="space-y-2">
                          <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                          <p className="text-gray-700">Email: dr.sarah@medicalcenter.com</p>
                          <p className="text-gray-700">Emergency: 24/7 On-call</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Map Placeholder */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                        <div className="text-white font-bold mb-2">Interactive Map</div>
                        <p className="text-gray-400">Location and directions would appear here</p>
                        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
