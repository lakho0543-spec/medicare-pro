import { motion } from 'framer-motion';
import { Star, MapPin, Clock, CheckCircle, Heart, Zap, Award, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function DoctorCard({ doctor, onBook, onLike }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(doctor.isLiked || false);

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    if (onLike) onLike(doctor.id, newLikedState);
  };

  const handleBook = (e) => {
    e.stopPropagation();
    if (doctor.available && onBook) onBook(doctor);
  };

  // Calculate rating stars with half stars
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(doctor.rating);
    const hasHalfStar = doctor.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-4 w-4">
            <Star className="absolute h-4 w-4 text-gray-300 fill-current" />
            <div className="absolute overflow-hidden h-4 w-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Premium Badge */}
      {doctor.isPremium && (
        <div className="absolute top-4 right-4 z-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg blur opacity-75 animate-pulse" />
            <div className="relative bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1 rounded-lg flex items-center gap-1">
              <Award className="h-3 w-3 text-white" />
              <span className="text-xs font-semibold text-white">PREMIUM</span>
            </div>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm ${
          doctor.available 
            ? 'bg-green-500/10 border border-green-500/30' 
            : 'bg-gray-500/10 border border-gray-500/30'
        }`}>
          <div className={`h-2 w-2 rounded-full animate-pulse ${
            doctor.available ? 'bg-green-500' : 'bg-gray-500'
          }`} />
          <span className={`text-xs font-medium ${
            doctor.available ? 'text-green-700' : 'text-gray-700'
          }`}>
            {doctor.available ? 'Available Now' : 'Unavailable'}
          </span>
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(139, 92, 246, 0.03) 50%, rgba(236, 72, 153, 0.03) 100%)'
            : 'transparent'
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-6">
        {/* Doctor Header */}
        <div className="flex items-start gap-4 mb-6">
          {/* Doctor Avatar */}
          <div className="relative">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Verified Badge */}
              {doctor.verified && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-full border-2 border-white"
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-sm mb-1">
              {doctor.specialization}
            </p>
            
            {/* Rating with Trend */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {renderStars()}
              </div>
              <span className="text-sm font-semibold text-gray-900">{doctor.rating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
              {doctor.ratingTrend > 0 && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium text-green-600">+{doctor.ratingTrend}</span>
                </div>
              )}
            </div>
          </div>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              isLiked 
                ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-500 shadow-md' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
        
        {/* Doctor Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">{doctor.experience}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
              <MapPin className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">{doctor.city}</span>
            </div>
          </div>

          {/* Quick Stats */}
          {doctor.quickStats && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{doctor.quickStats.successRate}%</span>
                <span>Success Rate</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{doctor.quickStats.patients}</span>
                <span>Patients</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Section */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-200">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">{doctor.fee}</span>
              <span className="text-sm text-gray-500">/consultation</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Insurance accepted</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBook}
            disabled={!doctor.available}
            className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 overflow-hidden ${
              doctor.available 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/25' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {doctor.available ? (
              <>
                <Zap className="h-5 w-5" />
                <span>Book Now</span>
              </>
            ) : (
              <span>Unavailable</span>
            )}
          </motion.button>
        </div>
        
        {/* Hover Bottom Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Floating Badges */}
      {doctor.badges && (
        <div className="absolute -top-3 left-6 flex gap-2">
          {doctor.badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-2.5 py-1 bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <span className="text-xs font-medium text-gray-700">{badge}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Default props
DoctorCard.defaultProps = {
  doctor: {
    isLiked: false,
    isPremium: false,
    verified: true,
    ratingTrend: 0,
    badges: ['Top Rated', 'Fast Response'],
    quickStats: {
      successRate: 95,
      patients: '1.2k'
    }
  }
};
