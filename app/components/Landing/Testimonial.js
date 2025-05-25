import { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Abhishek Kumar Singh",
    role: "FullStack Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQH4cjNvPO4PtA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714847637948?e=1753920000&v=beta&t=ciTNN3YwnZ7MJODUy8ffQwyapHyThs3BlK9hRrwI750",
    quote:
      "This platform has transformed the way I work! It's smooth, efficient, and beautifully designed.",
    rating: 5,
  },
  {
    name: "Aniket Kumar",
    role: "Software Engineer",
    image: "https://media-ccu2-2.cdn.whatsapp.net/v/t61.24694-24/491840168_2134672586973066_3108291364009475638_n.jpg?ccb=11-4&oh=01_Q5Aa1gH8xYIPvGJUuegrZktZfgcVX8-igGX9E7xcrexmFy-nKA&oe=683E6A83&_nc_sid=5e03e0&_nc_cat=105",
    quote:
      "Absolutely love the UI! The colors and animations make the experience seamless and engaging.",
    rating: 5,
  },
  {
    name: "Ruman Sarwar",
    role: "Digital Marketer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQHfa3UMxB_ppQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724386299698?e=1753920000&v=beta&t=8g7ONNixPGFxLk8DT79YRZPz781Sm3kDdIAsWP_7n2Q",
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
              index === activeIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
          >
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center max-w-lg mx-auto">
              <FaQuoteLeft className="text-3xl text-gray-400 mb-3" />
              <p className="text-lg text-center italic mb-4">
                "{testimonial.quote}"
              </p>
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
