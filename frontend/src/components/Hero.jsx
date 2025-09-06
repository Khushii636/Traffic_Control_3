import { ArrowRight, Zap, Shield, Activity, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";

// ✅ Simple Badge component
const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${className}`}
    >
      {children}
    </span>
  );
};

// ✅ Simple Button component
const Button = ({ children, variant = "solid", size = "md", className = "" }) => {
  const base = "inline-flex items-center justify-center font-semibold rounded-2xl transition";
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants = {
    solid: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-primary text-primary hover:bg-primary/10",
    hero: "bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg hover:opacity-90",
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Smart Mobility Device Dashboard"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <div className="w-32 h-32 rounded-full bg-gradient-primary blur-xl" />
      </div>
      <div
        className="absolute bottom-20 right-10 animate-float opacity-20"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-24 h-24 rounded-full bg-primary/30 blur-xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-4 h-4 mr-2" />
            Next-Gen Traffic Intelligence
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Smart Mobility
            <span className="block gradient-text">Revolution</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforming transportation with AI-driven traffic management,
            real-time monitoring, and intelligent safety systems for every
            vehicle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="group">
                Explore Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span>AI Safety Monitoring</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              <Activity className="w-4 h-4 text-primary" />
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Dynamic Tolling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
