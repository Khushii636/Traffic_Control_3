// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-gray-600">
        
        {/* Left Side */}
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-600">Traffic Control</span>. All rights reserved.
        </p>

        {/* Right Side */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-600 transition">About</a>
          <a href="#" className="hover:text-blue-600 transition">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
