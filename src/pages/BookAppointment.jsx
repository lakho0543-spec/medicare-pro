import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, CreditCard, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', fee: 150, rating: 4.9 },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', fee: 180, rating: 4.8 },
    { id: 3, name: 'Dr. Emily Davis', specialization: 'Pediatrician', fee: 120, rating: 4.7 },
  ];

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleBookAppointment = () => {
    toast.success('Appointment booked successfully!');
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    {['Select Doctor', 'Choose Time', 'Confirm', 'Complete'][s-1]}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <motion.div 
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(step-1) * 33.33}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Select a Doctor</h2>
              <div className="space-y-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setStep(2);
                    }}
                    className="border rounded-xl p-6 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{doctor.name}</h3>
                          <p className="text-gray-600">{doctor.specialization}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{doctor.rating}</span>
                            <span className="mx-2">•</span>
                            <span className="text-blue-600 font-semibold">${doctor.fee}</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && selectedDoctor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <button
                onClick={() => setStep(1)}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-4 border rounded-xl"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Time Slot</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border rounded-lg ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h3 className="font-semibold mb-2">Appointment Summary</h3>
                <p>Doctor: {selectedDoctor.name}</p>
                <p>Specialization: {selectedDoctor.specialization}</p>
                <p>Fee: ${selectedDoctor.fee}</p>
              </div>
              
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Confirm Appointment</h2>
              
              <div className="space-y-6">
                <div className="p-6 border rounded-xl">
                  <h3 className="font-semibold mb-4">Appointment Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Doctor:</span> {selectedDoctor.name}</p>
                    <p><span className="font-medium">Date:</span> {selectedDate}</p>
                    <p><span className="font-medium">Time:</span> {selectedTime}</p>
                    <p><span className="font-medium">Fee:</span> ${selectedDoctor.fee}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleBookAppointment}
                  className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center justify-center space-x-3"
                >
                  <CreditCard className="h-6 w-6" />
                  <span>Confirm & Pay ${selectedDoctor.fee}</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
              <p className="text-gray-600 mb-8">
                Your appointment with {selectedDoctor.name} has been booked successfully.
                You will receive a confirmation email shortly.
              </p>
              <div className="space-y-4">
                <Link to="/patient-dashboard">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                    Go to Dashboard
                  </button>
                </Link>
                <Link to="/">
                  <button className="w-full py-3 border border-gray-300 rounded-xl hover:bg-gray-50">
                    Back to Home
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}