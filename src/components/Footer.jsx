import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const quickLinks = [
    { label: 'Find Doctors', href: '#' },
    { label: 'Book Appointment', href: '#' },
    { label: 'Video Consultation', href: '#' },
    { label: 'Doctor Login', href: '#' },
    { label: 'Admin Panel', href: '#' },
    { label: 'Emergency', href: '#' }
  ]

  const specialties = [
    'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics',
    'Neurology', 'Gynecology', 'Psychiatry', 'Dentistry',
    'General Physician', 'ENT Specialist', 'Eye Specialist', 'Surgeon'
  ]

  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi',
    'Faisalabad', 'Multan', 'Peshawar', 'Quetta'
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Medicare Pro</h2>
                <p className="text-sm text-gray-400">Healthcare Revolution</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting patients with trusted healthcare professionals across Pakistan. 
              Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 6).map((spec) => (
                <span 
                  key={spec} 
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  {spec}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-semibold mt-8 mb-4">Cities</h3>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span 
                  key={city} 
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-400">support@medicarepro.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-400">+92 300 123 4567</p>
                  <p className="text-gray-400">+92 42 123 4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-400">Healthcare Street, Medical District</p>
                  <p className="text-gray-400">Lahore, Pakistan</p>
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-medium mb-3">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white outline-none"
                />
                <button className="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 Medicare Pro. All rights reserved. | Built with ❤️ for better healthcare
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}