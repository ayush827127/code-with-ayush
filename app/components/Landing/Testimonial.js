import { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "This platform has transformed the way I work! It's smooth, efficient, and beautifully designed.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    quote:
      "Absolutely love the UI! The colors and animations make the experience seamless and engaging.",
    rating: 5,
  },
  {
    name: "Rohan Singh",
    role: "Digital Marketer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "Fantastic platform! It has improved my workflow and the support team is always helpful.",
    rating: 4,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-lg mb-8">Real feedback from our amazing users.</p>
      </div>

      {/* Testimonial Container with Fixed Height */}
      <div className="relative max-w-3xl mx-auto h-[320px] flex items-center justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute w-full transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center max-w-lg mx-auto">
              <FaQuoteLeft className="text-3xl text-gray-400 mb-3" />
              <p className="text-lg text-center italic mb-4">"{testimonial.quote}"</p>
              <FaQuoteRight className="text-3xl text-gray-400 mb-3" />
              
              {/* User Info */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full border-4 border-purple-500 shadow-lg"
              />
              <h3 className="text-xl font-semibold mt-3">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>

              {/* Star Rating */}
              <div className="flex mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-lg" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white scale-125" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
