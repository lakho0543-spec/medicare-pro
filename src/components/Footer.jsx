import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Mail, Phone, MapPin, Facebook, Twitter, 
  Instagram, Linkedin, Youtube, Shield, Award, 
  Globe, Download, ChevronRight, Sparkles, 
  FileText, Users, Calendar, Zap, CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const quickLinks = [
    { label: 'Find Doctors', href: '/find-doctors', icon: Users },
    { label: 'Book Appointment', href: '/book-appointment', icon: Calendar },
    { label: 'Video Consultation', href: '/video-consultation', icon: Calendar },
    { label: 'Emergency Services', href: '/emergency', icon: Zap },
    { label: 'Pharmacy', href: '/pharmacy', icon: Heart },
    { label: 'Medical Records', href: '/medical-records', icon: FileText },
  ];

  const doctorLinks = [
    { label: 'Doctor Login', href: '/doctor-login' },
    { label: 'Join as Doctor', href: '/doctor-signup' },
    { label: 'Doctor Dashboard', href: '/doctor-dashboard' },
    { label: 'Schedule Manager', href: '/doctor-schedule' },
  ];

  const patientLinks = [
    { label: 'Patient Login', href: '/login' },
    { label: 'Patient Signup', href: '/signup' },
    { label: 'Patient Dashboard', href: '/patient-dashboard' },
    { label: 'Health Records', href: '/records' },
  ];

  const specialties = [
    { name: 'Cardiology', count: 45 },
    { name: 'Dermatology', count: 32 },
    { name: 'Pediatrics', count: 28 },
    { name: 'Orthopedics', count: 39 },
    { name: 'Neurology', count: 22 },
    { name: 'Gynecology', count: 27 },
    { name: 'Psychiatry', count: 18 },
    { name: 'Dentistry', count: 41 },
  ];

  const cities = [
    { name: 'Karachi', doctors: 120 },
    { name: 'Lahore', doctors: 95 },
    { name: 'Islamabad', doctors: 78 },
    { name: 'Rawalpindi', doctors: 65 },
    { name: 'Faisalabad', doctors: 52 },
    { name: 'Multan', doctors: 48 },
    { name: 'Peshawar', doctors: 42 },
    { name: 'Quetta', doctors: 35 },
  ];

  const certifications = [
    { name: 'HIPAA Compliant', icon: Shield },
    { name: 'ISO 27001 Certified', icon: Award },
    { name: 'FDA Approved Partners', icon: CheckCircle },
    { name: 'Global Healthcare Standards', icon: Globe },
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
    { platform: 'Twitter', icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
    { platform: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-gradient-to-r from-purple-600 to-pink-600' },
    { platform: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:bg-blue-700' },
    { platform: 'YouTube', icon: Youtube, href: '#', color: 'hover:bg-red-600' },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (platform) => {
    toast.success(`Download link for ${platform} sent to your email`);
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-gray-900/5" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-md opacity-50" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                  <Heart className="h-8 w-8 text-white" />
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Medicare Pro
                </h1>
                <p className="text-gray-400 mt-2">Advanced Healthcare Platform</p>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              We're transforming healthcare delivery across Pakistan with technology, 
              connecting patients with trusted medical professionals through secure, 
              convenient, and accessible digital solutions.
            </p>

            {/* Download Apps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Download Our App</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload('iOS')}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
                >
                  <div className="text-2xl">📱</div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload('Android')}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
                >
                  <div className="text-2xl">🤖</div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-blue-400" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest healthcare insights, 
              platform updates, and health tips.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Subscribe Now</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </motion.button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <p className="text-sm text-gray-400">
                By subscribing, you agree to our Privacy Policy and consent to receive 
                updates from Medicare Pro.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Quick Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.label}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <a 
                    href={link.href} 
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors py-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-blue-900/30 flex items-center justify-center transition-colors">
                      <link.icon className="h-4 w-4" />
                    </div>
                    <span className="group-hover:text-blue-300 transition-colors">{link.label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* For Doctors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              For Doctors
            </h3>
            <ul className="space-y-3">
              {doctorLinks.map((link) => (
                <motion.li
                  key={link.label}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <a 
                    href={link.href} 
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors py-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:text-blue-300 transition-colors">{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mt-8 mb-6 flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-400" />
              For Patients
            </h3>
            <ul className="space-y-3">
              {patientLinks.map((link) => (
                <motion.li
                  key={link.label}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <a 
                    href={link.href} 
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors py-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:text-pink-300 transition-colors">{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Specialties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-green-400" />
              Medical Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <motion.div
                  key={spec.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="relative group"
                >
                  <div className="px-4 py-2 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-900/50 hover:to-purple-900/50 rounded-lg border border-gray-700 group-hover:border-blue-500/50 transition-all">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                        {spec.name}
                      </span>
                      <span className="text-xs text-gray-500 group-hover:text-blue-400">
                        {spec.count}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <h3 className="text-xl font-bold mt-8 mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-400" />
              Available Cities
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {cities.map((city) => (
                <motion.div
                  key={city.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/50 rounded-lg p-3 border border-gray-700 hover:border-blue-500/50 transition-colors"
                >
                  <div className="font-medium text-gray-300">{city.name}</div>
                  <div className="text-xs text-gray-500">{city.doctors} Doctors</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-400" />
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <Mail className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Email Support</div>
                  <a href="mailto:support@medicarepro.com" className="text-blue-300 hover:text-blue-200 transition-colors">
                    support@medicarepro.com
                  </a>
                  <div className="text-sm text-gray-400 mt-1">Response within 2 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <Phone className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <div className="font-semibold mb-1">24/7 Helpline</div>
                  <a href="tel:+923001234567" className="text-green-300 hover:text-green-200 transition-colors">
                    +92 300 123 4567
                  </a>
                  <div className="text-sm text-gray-400 mt-1">Emergency & Support</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <MapPin className="h-5 w-5 text-purple-400 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Headquarters</div>
                  <div className="text-gray-300">Healthcare Street, Medical District</div>
                  <div className="text-gray-300">Lahore, Punjab, Pakistan</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.platform}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    className={`p-3 rounded-xl bg-gray-800 ${social.color} transition-all`}
                    aria-label={social.platform}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-gray-800"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              whileHover={{ y: -5 }}
              className="flex items-center gap-3"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                <cert.icon className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-300">{cert.name}</div>
                <div className="text-xs text-gray-500">Certified & Verified</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Medicare Pro. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Built with ❤️ for better healthcare across Pakistan
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
              <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">English (US)</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <p className="text-xs text-gray-600 text-center max-w-3xl mx-auto">
              Medicare Pro is a healthcare technology platform. We do not provide medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or other qualified 
              health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
