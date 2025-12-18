import { motion } from 'framer-motion';
import { Star, MapPin, Clock, CheckCircle, Heart, Zap } from 'lucide-react';
import { useState } from 'react';

export default function DoctorCard({ doctor }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -10 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden group hover-lift"
    >
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-500 ${
        isHovered ? 'from-blue-500/5 to-purple-500/5' : ''
      }`} />
      
      <div className="relative p-6">
        {/* Doctor Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {doctor.available && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
              <p className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 font-medium">
                {doctor.specialization}
              </p>
            </div>
          </div>
          
          {/* Like Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-lg ${
              isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
        
        {/* Doctor Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">{doctor.experience} experience</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-purple-500" />
            <span className="text-sm">{doctor.city}</span>
          </div>
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'fill-current' : ''}`}
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm">({doctor.rating}) • {doctor.reviews} reviews</span>
          </div>
        </div>
        
        {/* Fee and Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">{doctor.fee}</span>
            <span className="text-gray-600 text-sm ml-1">/consultation</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!doctor.available}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              doctor.available 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover-glow'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {doctor.available ? (
              <span className="flex items-center">
                Book Now
                <Zap className="h-4 w-4 ml-2" />
              </span>
            ) : (
              'Not Available'
            )}
          </motion.button>
        </div>
        
        {/* Hover Effect Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}