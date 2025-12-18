import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ShoppingCart, Heart, Star, Shield,
  Truck, Clock, Pill, Thermometer, Heart as HeartIcon,
  Brain, Activity, Eye, ChevronDown, ChevronRight, 
  CheckCircle, X, Sparkles, Zap, TrendingUp, MapPin,
  MessageSquare, CreditCard, Package, ShieldCheck,
  ArrowRight, Plus, Minus, Trash2, UserCheck,
  FileText, Users, Baby, Calendar, Smile
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Pharmacy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState('express');
  const [orderType, setOrderType] = useState('delivery');
  const [loading, setLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);

  // Using available icons - replaced Tooth with Smile for Dental Care
  const categories = [
    { id: 'all', name: 'All Medicines', icon: Pill, color: 'from-blue-500 to-cyan-500' },
    { id: 'pain', name: 'Pain Relief', icon: Activity, color: 'from-red-500 to-pink-500' },
    { id: 'fever', name: 'Fever & Cold', icon: Thermometer, color: 'from-purple-500 to-violet-500' },
    { id: 'heart', name: 'Heart Care', icon: HeartIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'neuro', name: 'Neurology', icon: Brain, color: 'from-yellow-500 to-orange-500' },
    { id: 'eye', name: 'Eye Care', icon: Eye, color: 'from-indigo-500 to-blue-500' },
    { id: 'dental', name: 'Dental Care', icon: Smile, color: 'from-teal-500 to-cyan-500' }, // Changed from Tooth to Smile
    { id: 'child', name: 'Child Care', icon: Baby, color: 'from-pink-500 to-rose-500' },
  ];

  const medicines = [
    {
      id: 1,
      name: 'Panadol Extra',
      brand: 'GSK',
      price: 150,
      originalPrice: 180,
      discount: 17,
      category: 'pain',
      prescription: false,
      stock: 45,
      rating: 4.7,
      reviews: 124,
      description: 'Fast relief from headache, fever, and body pain',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      delivery: '2-3 hours',
      tags: ['Best Seller', 'Fast Relief']
    },
    {
      id: 2,
      name: 'Brufen 400mg',
      brand: 'Abbott',
      price: 120,
      originalPrice: 150,
      discount: 20,
      category: 'pain',
      prescription: true,
      stock: 28,
      rating: 4.5,
      reviews: 89,
      description: 'For inflammation and severe pain relief',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      delivery: '4-6 hours',
      tags: ['Prescription', 'Strong Relief']
    },
    {
      id: 3,
      name: 'Augmentin 625mg',
      brand: 'GSK',
      price: 450,
      originalPrice: 500,
      discount: 10,
      category: 'fever',
      prescription: true,
      stock: 15,
      rating: 4.8,
      reviews: 203,
      description: 'Broad spectrum antibiotic for infections',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      delivery: 'Same Day',
      tags: ['Antibiotic', 'Prescription']
    },
    {
      id: 4,
      name: 'Concor 5mg',
      brand: 'Merck',
      price: 320,
      originalPrice: 350,
      discount: 9,
      category: 'heart',
      prescription: true,
      stock: 32,
      rating: 4.9,
      reviews: 156,
      description: 'For hypertension and heart conditions',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      delivery: '1-2 days',
      tags: ['Heart Care', 'Prescription']
    },
    {
      id: 5,
      name: 'Vitamin C 500mg',
      brand: 'Nature\'s Best',
      price: 280,
      originalPrice: 320,
      discount: 12,
      category: 'all',
      prescription: false,
      stock: 67,
      rating: 4.6,
      reviews: 187,
      description: 'Immune system booster with antioxidants',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      delivery: '2-3 hours',
      tags: ['Vitamins', 'Immunity']
    },
    {
      id: 6,
      name: 'Eye Drops Refresh',
      brand: 'Allergan',
      price: 180,
      originalPrice: 200,
      discount: 10,
      category: 'eye',
      prescription: false,
      stock: 42,
      rating: 4.4,
      reviews: 98,
      description: 'Lubricating eye drops for dry eyes',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      delivery: '3-4 hours',
      tags: ['Eye Care', 'OTC']
    },
    {
      id: 7,
      name: 'Amoxicillin 500mg',
      brand: 'Pfizer',
      price: 380,
      originalPrice: 420,
      discount: 10,
      category: 'fever',
      prescription: true,
      stock: 25,
      rating: 4.7,
      reviews: 142,
      description: 'Antibiotic for bacterial infections',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      delivery: '1-2 days',
      tags: ['Antibiotic', 'Prescription']
    },
    {
      id: 8,
      name: 'Aspirin 75mg',
      brand: 'Bayer',
      price: 95,
      originalPrice: 110,
      discount: 14,
      category: 'heart',
      prescription: false,
      stock: 58,
      rating: 4.3,
      reviews: 76,
      description: 'Blood thinner and pain reliever',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      delivery: '2-3 hours',
      tags: ['Heart Care', 'OTC']
    },
  ];

  const deliveryOptions = [
    { type: 'express', label: 'Express Delivery', time: '2-3 hours', price: 100, icon: Zap },
    { type: 'standard', label: 'Standard Delivery', time: '4-6 hours', price: 50, icon: Truck },
    { type: 'scheduled', label: 'Scheduled Delivery', time: 'Choose time', price: 30, icon: Calendar },
  ];

  const pharmacies = [
    { name: 'Medicare Pharmacy', distance: '0.5 km', rating: 4.8, delivery: '30 min', open: true },
    { name: 'Health Plus', distance: '1.2 km', rating: 4.6, delivery: '45 min', open: true },
    { name: 'City Medical', distance: '2.0 km', rating: 4.9, delivery: '60 min', open: false },
    { name: 'Care First', distance: '0.8 km', rating: 4.7, delivery: '40 min', open: true },
  ];

  // Calculate cart total
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cart]);

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = !searchQuery || 
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item => 
          item.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
    
    toast.success(`Added ${medicine.name} to cart`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  const removeFromCart = (medicineId) => {
    setCart(prev => prev.filter(item => item.id !== medicineId));
    toast.success('Removed from cart', {
      icon: '🗑️',
    });
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(medicineId);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.id === medicineId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const toggleWishlist = (medicineId) => {
    setWishlist(prev => 
      prev.includes(medicineId)
        ? prev.filter(id => id !== medicineId)
        : [...prev, medicineId]
    );
    
    const isInWishlist = wishlist.includes(medicineId);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: isInWishlist ? '❌' : '💖',
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    toast.success(`Found ${filteredMedicines.length} medicines`, {
      icon: '🔍',
      duration: 2000,
    });
    
    setTimeout(() => setLoading(false), 1000);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    toast.success(`Order placed successfully! Total: Rs. ${cartTotal}`, {
      icon: '🎉',
      duration: 4000,
    });
    
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5" />
        
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-green-400/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-30 animate-pulse" />
                  <div className="relative p-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600">
                    <Pill className="h-12 w-12 text-white" />
                    <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-300" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Online <span className="text-gradient bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">Pharmacy</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Get genuine medicines delivered to your doorstep. 
                Prescription verification, live tracking, and 24/7 support.
              </p>
            </motion.div>

            {/* Main Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-2 shadow-2xl mb-16"
            >
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-2">
                <div className="flex-1">
                  <div className="flex items-center p-6">
                    <div className="relative">
                      <Search className="h-7 w-7 text-gray-400 mr-6" />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-2 bg-green-500/10 rounded-full"
                      />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search medicines, brands, or symptoms..."
                      className="flex-1 text-xl bg-transparent outline-none placeholder-gray-400"
                    />
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="ml-4 p-2 rounded-lg hover:bg-gray-100"
                      >
                        <X className="h-5 w-5 text-gray-400" />
                      </motion.button>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-6 rounded-2xl hover:shadow-2xl transition-all flex items-center justify-center space-x-4 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-white/20 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Search className="h-6 w-6" />
                      <span className="text-lg font-semibold">Search Medicines</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Prescription Upload */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Have a prescription?</div>
                  <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium">
                    <FileText className="h-5 w-5" />
                    <span>Upload Prescription</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { value: '10K+', label: 'Medicines', icon: Pill, color: 'from-green-500 to-emerald-500' },
                { value: '24/7', label: 'Delivery', icon: Clock, color: 'from-blue-500 to-cyan-500' },
                { value: '100%', label: 'Genuine', icon: ShieldCheck, color: 'from-purple-500 to-pink-500' },
                { value: '1M+', label: 'Customers', icon: Users, color: 'from-yellow-500 to-orange-500' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-3xl text-center hover-lift"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Sidebar - Categories & Filters */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-1/4"
              >
                {/* Categories */}
                <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 border border-green-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} mr-3`}>
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">{category.name}</span>
                        <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Delivery Options</h3>
                  <div className="space-y-4">
                    {deliveryOptions.map(option => (
                      <button
                        key={option.type}
                        onClick={() => setSelectedDelivery(option.type)}
                        className={`flex items-center w-full p-4 rounded-xl border transition-all ${
                          selectedDelivery === option.type
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className={`p-2 rounded-lg mr-4 ${
                          selectedDelivery === option.type
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <option.icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.time}</div>
                        </div>
                        <div className="ml-auto font-bold">Rs. {option.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nearby Pharmacies */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Nearby Pharmacies</h3>
                  <div className="space-y-4">
                    {pharmacies.map((pharmacy, index) => (
                      <div key={index} className="p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">{pharmacy.name}</div>
                          <div className={`px-2 py-1 rounded text-xs ${
                            pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {pharmacy.open ? 'OPEN' : 'CLOSED'}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          {pharmacy.distance} away
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            {pharmacy.rating}
                          </div>
                          <div className="text-green-600 font-medium">Delivers in {pharmacy.delivery}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Medicines Grid */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:w-3/4"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      Available Medicines
                      <span className="text-gradient"> ({filteredMedicines.length})</span>
                    </h2>
                    <p className="text-gray-600 mt-2">Genuine products with verified quality</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowCart(!showCart)}
                      className="relative p-3 bg-white rounded-xl shadow-lg hover:shadow-xl"
                    >
                      <ShoppingCart className="h-6 w-6 text-gray-700" />
                      {cart.length > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cart.length}
                        </div>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
                    >
                      <Filter className="h-5 w-5" />
                      <span>Filters</span>
                    </button>
                  </div>
                </div>

                {/* Medicines Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMedicines.map((medicine, index) => (
                    <motion.div
                      key={medicine.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                    >
                      {/* Medicine Image */}
                      <div className="relative h-48">
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="w-full h-full object-cover"
                        />
                        {medicine.discount > 0 && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -{medicine.discount}%
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleWishlist(medicine.id)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl"
                          >
                            <Heart className={`h-5 w-5 ${
                              wishlist.includes(medicine.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                            }`} />
                          </motion.button>
                        </div>
                        {medicine.prescription && (
                          <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                              Prescription Required
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Medicine Info */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{medicine.name}</h3>
                            <p className="text-gray-600 text-sm">{medicine.brand}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span className="font-bold">{medicine.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({medicine.reviews})</span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{medicine.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {medicine.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                            Delivers in {medicine.delivery}
                          </span>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-2xl font-bold text-gray-900">Rs. {medicine.price}</div>
                            {medicine.originalPrice > medicine.price && (
                              <div className="text-sm text-gray-500 line-through">
                                Rs. {medicine.originalPrice}
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-3">
                            {medicine.stock > 0 ? (
                              <>
                                {cart.find(item => item.id === medicine.id) ? (
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => updateQuantity(medicine.id, cart.find(item => item.id === medicine.id).quantity - 1)}
                                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="font-medium">
                                      {cart.find(item => item.id === medicine.id).quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(medicine.id, cart.find(item => item.id === medicine.id).quantity + 1)}
                                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => addToCart(medicine)}
                                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg"
                                  >
                                    Add to Cart
                                  </motion.button>
                                )}
                              </>
                            ) : (
                              <span className="text-red-500 font-medium">Out of Stock</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                {filteredMedicines.length > 0 && (
                  <div className="text-center mt-12">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 text-lg font-semibold"
                    >
                      Load More Medicines
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 h-full w-full lg:w-1/3 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Your cart is empty</h3>
                    <p className="text-gray-600 mb-8">Add some medicines to get started</p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-6 mb-8">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center p-4 border border-gray-200 rounded-xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover mr-4"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <div className="text-lg font-bold text-gray-900">Rs. {item.price}</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-200 rounded-l-lg"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-200 rounded-r-lg"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">Rs. {cartTotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery</span>
                          <span className="font-medium">Rs. {
                            deliveryOptions.find(d => d.type === selectedDelivery)?.price || 100
                          }</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (16%)</span>
                          <span className="font-medium">Rs. {(cartTotal * 0.16).toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>Rs. {(
                            cartTotal + 
                            (deliveryOptions.find(d => d.type === selectedDelivery)?.price || 100) + 
                            (cartTotal * 0.16)
                          ).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Delivery Options */}
                      <div className="mb-8">
                        <h4 className="font-medium text-gray-900 mb-4">Select Delivery Option</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {deliveryOptions.map(option => (
                            <button
                              key={option.type}
                              onClick={() => setSelectedDelivery(option.type)}
                              className={`p-3 rounded-xl border text-sm ${
                                selectedDelivery === option.type
                                  ? 'border-green-500 bg-green-50 text-green-600'
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                            >
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-gray-500">{option.time}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                        className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-lg font-semibold hover:shadow-lg"
                      >
                        <div className="flex items-center justify-center space-x-3">
                          <CreditCard className="h-6 w-6" />
                          <span>Proceed to Checkout</span>
                        </div>
                      </motion.button>
                      
                      <div className="mt-4 text-center text-sm text-gray-500">
                        <div className="flex items-center justify-center space-x-4">
                          <div className="flex items-center">
                            <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                            <span>Secure Payment</span>
                          </div>
                          <div className="flex items-center">
                            <Package className="h-4 w-4 text-green-500 mr-2" />
                            <span>Free Returns</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Our <span className="text-gradient bg-gradient-to-r from-green-600 to-emerald-600">Pharmacy</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We ensure your health comes first with premium services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "100% Genuine",
                  description: "Verified medicines from licensed manufacturers",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: Clock,
                  title: "24/7 Delivery",
                  description: "Medicine delivery at your convenience",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: UserCheck,
                  title: "Expert Pharmacists",
                  description: "Round-the-clock consultation available",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: Shield,
                  title: "Safe & Secure",
                  description: "Your health data is completely protected",
                  color: "from-yellow-500 to-orange-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl shadow-lg p-8 text-center hover-lift"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50" />
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-12"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
                <Shield className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Need Prescription Medicines?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Upload your prescription and get verified medicines delivered safely.
                Our pharmacists are available 24/7 for consultation.
              </p>
              
              <div className="flex flex-col lg:flex-row gap-6 justify-center">
                <Link to="/video-consultation">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-2xl text-lg font-semibold flex items-center justify-center space-x-3"
                  >
                    <MessageSquare className="h-6 w-6" />
                    <span>Consult Pharmacist</span>
                  </motion.button>
                </Link>
                
                <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 text-lg font-semibold flex items-center justify-center space-x-3">
                  <FileText className="h-6 w-6" />
                  <span>Upload Prescription</span>
                </button>
              </div>
              
              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mb-2" />
                  <span>Verified Medicines</span>
                </div>
                <div className="flex flex-col items-center">
                  <UserCheck className="h-5 w-5 text-green-500 mb-2" />
                  <span>Certified Pharmacists</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="h-5 w-5 text-green-500 mb-2" />
                  <span>Track Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-5 w-5 text-green-500 mb-2" />
                  <span>100% Safe</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}