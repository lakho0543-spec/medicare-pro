import { motion } from 'framer-motion';
import { Shield, Video, FileText, MessageSquare, Smartphone, Globe, Zap, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Verified Doctors",
      description: "All doctors are verified with medical licenses and credentials checked",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: <Video className="h-10 w-10" />,
      title: "Video Consultations",
      description: "Consult doctors online from the comfort of your home",
      color: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Digital Prescriptions",
      description: "Get digital prescriptions that you can use at any pharmacy",
      color: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries",
      color: "from-yellow-500 to-orange-500",
      delay: 0.4
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "Mobile App",
      description: "Download our mobile app for on-the-go appointments",
      color: "from-red-500 to-rose-500",
      delay: 0.5
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Multiple Languages",
      description: "Available in English, Urdu, and regional languages",
      color: "from-indigo-500 to-violet-500",
      delay: 0.6
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-4">
            <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gradient">Why Choose Us</span>
            <Zap className="h-4 w-4 text-yellow-500 ml-2 animate-pulse" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Features That <span className="text-gradient">Make Difference</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the best healthcare experience with cutting-edge technology
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 hover-lift"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
              
              {/* Animated Border */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: feature.delay + 0.2 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}