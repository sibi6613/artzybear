import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gold-gradient">ArtzyBear</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-gray-900 transition duration-300 nav-link">Home</a>
            <a href="#portfolio" className="text-gray-700 hover:text-gray-900 transition duration-300 nav-link">Portfolio</a>
            <a href="#commissions" className="text-gray-700 hover:text-gray-900 transition duration-300 nav-link">Commissions</a>
            <a href="#about" className="text-gray-700 hover:text-gray-900 transition duration-300 nav-link">About</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 transition duration-300 nav-link">Contact</a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Home</a>
            <a href="#portfolio" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Portfolio</a>
            <a href="#commissions" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Commissions</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-gray-900">About</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen hero-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Creating
              <span className="block gold-gradient">
                Timeless Art
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Specializing in realistic pencil portraits, traditional Indian art, and custom commissioned pieces. 
              Bringing your memories to life through detailed, hand-drawn artwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#portfolio"
                className="btn-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 text-center"
              >
                View Portfolio
              </a>
              <a
                href="#commissions"
                className="btn-secondary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 text-center"
              >
                Commission Art
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1652203048330-572c21a9cf35"
              alt="Artist brushes"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-gray-900">Commission Range</p>
              <p className="text-2xl font-bold gold-gradient">₹4,400 - ₹23,900</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'portraits', name: 'Celebrity Portraits' },
    { id: 'traditional', name: 'Traditional Art' },
    { id: 'family', name: 'Family Portraits' },
    { id: 'abstract', name: 'Abstract' }
  ];

  const portfolioImages = [
    {
      category: 'portraits',
      title: 'Celebrity Portrait',
      image: 'https://images.unsplash.com/photo-1602773842897-90aea5e63427'
    },
    {
      category: 'traditional',
      title: 'Classical Dancer',
      image: 'https://images.unsplash.com/photo-1479813183133-f2e9b38ed6c4'
    },
    {
      category: 'portraits',
      title: 'Portrait Study',
      image: 'https://images.pexels.com/photos/32311678/pexels-photo-32311678.jpeg'
    },
    {
      category: 'traditional',
      title: 'Traditional Dancer',
      image: 'https://images.unsplash.com/photo-1479812627010-aa5bd9d173b1'
    },
    {
      category: 'family',
      title: 'Family Portrait',
      image: 'https://images.unsplash.com/photo-1579167728798-a1cf3d595960'
    },
    {
      category: 'traditional',
      title: 'Cultural Art',
      image: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg'
    }
  ];

  const filteredImages = activeCategory === 'all' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my collection of realistic pencil portraits, traditional Indian art, and custom commissioned pieces
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                activeCategory === category.id
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((item, index) => (
            <div key={index} className="portfolio-item">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover"
              />
              <div className="portfolio-overlay">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90 capitalize">{item.category.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Commission Form Component
const CommissionForm = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    commission_type: '',
    subject_description: '',
    size_preference: '',
    budget_range: '',
    deadline: '',
    additional_notes: ''
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Submit commission request
      const response = await axios.post(`${API}/commissions`, formData);
      
      // Upload reference images if any
      if (files.length > 0) {
        const formDataFiles = new FormData();
        files.forEach(file => {
          formDataFiles.append('files', file);
        });

        await axios.post(
          `${API}/commissions/${response.data.id}/upload-images`,
          formDataFiles,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      setSubmitStatus('success');
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        commission_type: '',
        subject_description: '',
        size_preference: '',
        budget_range: '',
        deadline: '',
        additional_notes: ''
      });
      setFiles([]);
    } catch (error) {
      console.error('Error submitting commission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="commissions" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Commission Custom Art</h2>
          <p className="text-xl text-gray-600">
            Ready to create something unique? Fill out the form below to request a custom commission
          </p>
          <div className="mt-6 inline-block bg-purple-100 px-6 py-3 rounded-lg">
            <p className="text-purple-800 font-semibold">Price Range: ₹4,400 - ₹23,900</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="client_email"
                value={formData.client_email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="client_phone"
                value={formData.client_phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commission Type *</label>
              <select
                name="commission_type"
                value={formData.commission_type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                <option value="portrait">Portrait</option>
                <option value="family">Family Portrait</option>
                <option value="traditional">Traditional Art</option>
                <option value="abstract">Abstract Art</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size Preference *</label>
              <select
                name="size_preference"
                value={formData.size_preference}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Size</option>
                <option value="small">Small (A4)</option>
                <option value="medium">Medium (A3)</option>
                <option value="large">Large (A2 or bigger)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
              <select
                name="budget_range"
                value={formData.budget_range}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Budget</option>
                <option value="4400-8000">₹4,400 - ₹8,000</option>
                <option value="8000-15000">₹8,000 - ₹15,000</option>
                <option value="15000-23900">₹15,000 - ₹23,900</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Description *</label>
            <textarea
              name="subject_description"
              value={formData.subject_description}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Describe what you'd like me to draw (e.g., family portrait with 3 people, celebrity portrait of...)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            ></textarea>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Optional)</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference Images (Optional)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">Upload reference photos for your commission</p>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleInputChange}
              rows="3"
              placeholder="Any special requirements or additional details..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            ></textarea>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Commission Request'}
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Thank you! Your commission request has been submitted successfully. I'll get back to you within 24 hours.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              There was an error submitting your request. Please try again or contact me directly.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1611755217171-67c8e51055ac"
              alt="Artist workspace"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">About the Artist</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to my world of art! I'm passionate about creating realistic pencil portraits that capture 
              the essence and emotion of my subjects. With years of experience in traditional and contemporary art, 
              I specialize in detailed pencil drawings that bring memories to life.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              My work ranges from celebrity portraits and family commissions to traditional Indian classical dance art. 
              Each piece is carefully crafted with attention to detail, ensuring that every drawing tells a unique story.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold gold-gradient">50+</h3>
                <p className="text-gray-600">Commissions Completed</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold gold-gradient">5+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300">
            Ready to start your art journey? Let's discuss your vision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-d4af37" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">artzy.bear@example.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-d4af37" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-300">Available for commissions worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Commission Process</h3>
              <div className="space-y-3 text-gray-300">
                <p>1. Submit your commission request with details</p>
                <p>2. I'll provide a quote and timeline within 24 hours</p>
                <p>3. Upon agreement, I'll start creating your artwork</p>
                <p>4. Regular updates and final delivery</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-gray-800 p-8 rounded-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-d4af37 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-d4af37 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-d4af37 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows="4"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-d4af37 focus:border-transparent text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-600 text-white rounded-lg">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-600 text-white rounded-lg">
                  Error sending message. Please try again.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400">© 2024 ArtzyBear. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Creating beautiful art, one commission at a time.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  useEffect(() => {
    // Test API connection
    const testConnection = async () => {
      try {
        const response = await axios.get(`${API}/health`);
        console.log('API Connected:', response.data);
      } catch (error) {
        console.error('API connection failed:', error);
      }
    };
    
    testConnection();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
              <HeroSection />
              <PortfolioSection />
              <CommissionForm />
              <AboutSection />
              <ContactSection />
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;