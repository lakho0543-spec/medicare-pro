import { Search, Calendar, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const specializations = [
    'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics',
    'Orthopedics', 'Gynecology', 'Dentistry', 'Psychiatry'
  ]

  return (
    <section className="relative bg-gradient-to-r from-primary-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find & Book Appointments with
            <span className="text-primary-600"> Trusted Doctors</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Pakistan's leading platform for medical appointments. 
            Verified doctors, instant booking, and secure consultations.
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-2 md:p-4 mb-12">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <div className="flex items-center p-3 md:p-4">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by doctor name, specialization, or symptoms..."
                    className="w-full outline-none text-lg"
                  />
                </div>
              </div>
              
              <div className="flex-1 flex items-center p-3 md:p-4 border-t md:border-t-0 md:border-l">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <select className="w-full outline-none text-lg bg-transparent">
                  <option value="">Select City</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="rawalpindi">Rawalpindi</option>
                </select>
              </div>
              
              <button className="bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 font-medium text-lg flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Doctors</span>
              </button>
            </div>
          </div>

          {/* Specialization Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Popular Specializations:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-primary-500 hover:text-primary-600 transition-colors"
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Available Support</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="btn-primary text-lg px-8 py-4">
              <Calendar className="inline-block mr-2 h-5 w-5" />
              Book Appointment
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Are You a Doctor? Join Us
            </button>
          </div>
        </div>
      </div>
      
      {/* Wave Background */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  )
}