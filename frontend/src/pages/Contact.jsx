// src/pages/Contact.jsx
import { useState } from "react";
import { Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Left Card - Info */}
        <div className="flex-1 bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col justify-center text-gray-200">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            We'd love to hear from you! Fill out the form or reach us via email.
          </p>
          <p className="text-gray-200 font-medium">Email: TrafficControl@support.com</p>
          <p className="text-gray-200 font-medium">Phone: +91 9977 1414 17 </p>
        </div>

        {/* Right Card - Form */}
        <div className="flex-1 bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 text-gray-200">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Mail className="text-blue-400 w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-200">Send a Message</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
