import { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "../components/common/button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/card.jsx"
import {
  Play,
  Star,
  Users,
  Target,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Smart Workout Tracking",
      description:
        "Track every rep, set, and exercise with our intelligent logging system that adapts to your routine.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Progress",
      description: "Monitor your gains with detailed analytics and visual progress reports that keep you motivated.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Join thousands of fitness enthusiasts sharing their journey and supporting each other.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Personalized Plans",
      description: "Get custom workout plans tailored to your goals, fitness level, and available equipment.",
    },
  ]

  const testimonials = [
    {
      name: "Priyanshu Jha",
      role: "Fitness Enthusiast",
      content: "FitTracker transformed my workout routine. I've never been more consistent and motivated!",
      rating: 5,
      image: "/images/pj.jpg"
    },
    {
      name: "Samriddh Diwan",
      role: "Personal Trainer",
      content: "I recommend FitTracker to all my clients. The tracking features are incredibly detailed.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Neha",
      role: "Athlete",
      content: "The progress analytics helped me identify weak points and improve my performance significantly.",
      rating: 5,
      image: "/images/neha.jpg",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      features: ["Basic workout tracking", "Exercise library access", "Progress charts", "Community access","Goal setting & milestone tracking"],
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Custom workout plans",
        "Priority support",
        "Export data",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "$19.99",
      period: "per month",
      features: [
        "Everything in Pro",
        "Personal trainer consultation",
        "Nutrition tracking",
        "Advanced integrations",
        "White-label options",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/images/logo1.jpg" alt="FitLife" className="h-12 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-white hover:text-red-400 transition-colors">
                  Home
                </a>
                <a href="#features" className="text-gray-300 hover:text-red-500 transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-red-500 transition-colors">
                  Pricing
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-red-500 transition-colors">
                  Reviews
                </a>
                <a href="#contact" className="text-gray-300 hover:text-red-500 transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button onClick={() => navigate("/signin")} variant="ghost" className="text-white hover:text-red-500">
                Sign In
              </Button>
              <Button onClick={() => navigate("/signup")} className="bg-red-600 hover:bg-red-700 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-white hover:text-red-500">
                Home
              </a>
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-red-500">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-red-500">
                Pricing
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-red-500">
                Reviews
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-red-500">
                Contact
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button
                  onClick={() => navigate("/signin")}
                  variant="ghost"
                  className="w-full text-white hover:text-red-500"
                >
                  Sign In
                </Button>
                <Button onClick={() => navigate("/signup")} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0.1, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/landing_page.jpg')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Build Your <span className="text-red-500">Perfect Body</span>
              <br />
              With Clean Mind
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay max-w-3xl mx-auto">
              Transform your fitness journey with our comprehensive tracking platform. Monitor progress, stay motivated,
              and achieve your goals faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
              <Button
                onClick={() => navigate("/signup")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                className="border-white text-red-400 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">50K+</div>
                <div className="text-gray-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">1M+</div>
                <div className="text-gray-300">Workouts Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">98%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-red-500">FitTracker</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the features that make FitTracker the ultimate fitness companion for achieving your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-700 hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-700">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/client/src/assets/home.jpg')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-red-500">Plan</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select the perfect plan for your fitness journey. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gray-900 border-gray-700 hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up ${
                  plan.popular ? "ring-2 ring-red-500 scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-700 mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-red-500">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-500">
                        <CheckCircle className="h-5 w-5 text-red-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
                    } transition-all duration-300`}
                    onClick={() => navigate("/signup")}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="text-red-500">Users</span> Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their fitness journey with FitTracker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-700 hover:border-red-500 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-500 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="text-gray-700 font-semibold">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/client/src/assets/newsession.jpg')`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="text-red-500">Fitness Journey</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already started their transformation. Your perfect body is just one click
            away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/signup")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-white text-red-400 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img src="/images/logo1.jpg" alt="FitLife" className="h-8 w-auto mb-4" />
              <p className="text-gray-300 mb-6 max-w-md">
                Transform your fitness journey with our comprehensive tracking platform. Monitor progress, stay
                motivated, and achieve your goals.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-300 hover:text-red-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-300 hover:text-red-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-300 hover:text-red-400 transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 FitTracker. All rights reserved. Built with passion for fitness enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
