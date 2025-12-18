import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

// Contact information data
const CONTACT_INFO = [
  {
    icon: <Mail className="h-8 w-8" />,
    title: "Email",
    content: "support@medicarepro.com",
    description: "We'll respond within 24 hours",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Phone className="h-8 w-8" />,
    title: "Phone",
    content: "+92 300 123 4567",
    description: "Mon-Fri, 9AM-6PM",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Office",
    content: "Healthcare Street, Medical District",
    description: "Lahore, Pakistan",
    color: "bg-purple-100 text-purple-600"
  }
];

// Support hours data
const SUPPORT_HOURS = [
  { day: "Monday - Friday", time: "9:00 AM - 8:00 PM" },
  { day: "Saturday", time: "10:00 AM - 4:00 PM" },
  { day: "Sunday", time: "Emergency Support Only" }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized handler for input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.', {
        icon: '📧',
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <MessageSquare className="h-12 w-12 text-blue-600" />
              </div>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to our team for support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <AnimatePresence>
                {CONTACT_INFO.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-card p-6 rounded-2xl hover-lift"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-gray-900">
                          {item.title}
                        </h3>
                        <p className="font-medium text-gray-800">
                          {item.content}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Support Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6 sm:p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-xl bg-white/20">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Support Hours</h3>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="ml-auto"
                  >
                    <Sparkles className="h-5 w-5 text-yellow-300" />
                  </motion.div>
                </div>
                <div className="space-y-3">
                  {SUPPORT_HOURS.map((item, index) => (
                    <motion.div
                      key={item.day}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/10 rounded-xl"
                    >
                      <span className="font-medium">{item.day}</span>
                      <span className="font-semibold">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 mr-4">
                  <Send className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 mt-1">We'd love to hear from you</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                    placeholder="Tell us about your inquiry..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all relative overflow-hidden ${
                    isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-6 w-6 border-2 border-white border-t-transparent rounded-full mr-3"
                      />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                      <span className="relative flex items-center justify-center">
                        <Send className="h-6 w-6 mr-3" />
                        Send Message
                      </span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24 hours during business days.
                  For urgent matters, please call our support line.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Additional Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Other Ways to Connect
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Live Chat', 'Social Media', 'FAQ', 'Documentation'].map((method) => (
                  <button
                    key={method}
                    className="px-4 py-2 border border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
