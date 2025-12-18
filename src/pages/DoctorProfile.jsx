import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Calendar, MessageSquare, Phone, Award, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function DoctorProfile() {
  const [selectedTab, setSelectedTab] = useState('about');

  const doctor = {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: "12 years",
    fee: "$150",
    city: "New York",
    rating: 4.9,
    reviews: 128,
    education: "MD from Harvard Medical School",
    languages: ["English", "Spanish"],
    availability: ["Mon-Fri: 9AM-5PM", "Sat: 10AM-2PM"]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Doctor Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="w-32 h-32 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Users className="h-16 w-16 text-blue-600" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
                <p className="text-xl text-blue-600 mb-4">{doctor.specialization}</p>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 text-green-500 mr-2" />
                    <span>{doctor.city}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/book-appointment">
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                      Book Appointment
                    </button>
                  </Link>
                  <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50">
                    <MessageSquare className="inline-block h-5 w-5 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex border-b mb-8">
            {['about', 'reviews', 'availability'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-3 font-medium ${
                  selectedTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {selectedTab === 'about' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">About Dr. {doctor.name.split(' ')[1]}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Education & Qualifications</h4>
                    <p className="text-gray-600">{doctor.education}</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-green-500 mr-2" />
                        Board Certified Cardiologist
                      </li>
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-green-500 mr-2" />
                        Fellowship in Interventional Cardiology
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Languages Spoken</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang) => (
                        <span key={lang} className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="font-semibold mt-6 mb-4">Consultation Fee</h4>
                    <div className="text-3xl font-bold text-gray-900">{doctor.fee}</div>
                    <p className="text-gray-600">Per consultation (30 minutes)</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Patient Reviews</h3>
                {/* Reviews would go here */}
              </div>
            )}

            {selectedTab === 'availability' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Availability</h3>
                <div className="space-y-4">
                  {doctor.availability.map((slot, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                      <Calendar className="h-6 w-6 text-blue-600 mr-4" />
                      <span className="text-lg">{slot}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}