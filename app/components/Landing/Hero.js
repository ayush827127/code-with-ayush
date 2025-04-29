//seo metadata 
export const metadata = {
  title:'Code with Ayush- Learn Java,React,Next.js & more with free notes & Projects',
  description:"Code with Ayush provides an all in one learning hub for mastering Java,React,Next.js,Tailwind CSS,HTML,CSS,Javascript and also provides notes of all tech related subjects.Explore free coding resource, design ideas, and practical projects.We also provide free APIs for developers to integrate into their projects. Perfect for students, beginners and professionals looking to enhance their skills with detailed notes and real-world applications. ",
  keywords:[
    "Code with Ayush",
    "learn Java",
    "React for beginners",
    "Next.js tutorials",
    "free coding notes",
    "Tailwind CSS projects",
    "Vue.js learning",
    "frontend development",
    "backend development",
    "web development resources",
    "developer community",
    "programming for students",
    "projects for beginners",
    "coding for professionals",
  ]
}

"use client";
import { useState, useEffect } from "react";

const techStack = ["Java", "React", "Vue.js", "Next.js", "Tailwind CSS"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % techStack.length);
        setAnimate(true);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderFloatingDots = () => {
    return [...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 40 + 10}px`,
          height: `${Math.random() * 40 + 10}px`,
          opacity: Math.random() * 0.5,
        }}
      />
    ));
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple to-pink-600 text-white py-8 md:py-12 lg:py-16">
      {/* Background floating dots */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {mounted && renderFloatingDots()}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mr-6 mb-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Code with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
                {" "}
                Ayush
              </span>
            </h1>
          </div>

          <div className="h-12 flex items-center justify-center mb-2">
            <h2 className="text-xl md:text-2xl font-semibold">
              Learn{" "}
              <span
                className={`inline-block px-2 py-1 rounded bg-white/20 font-bold ${
                  animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
                } transition-all duration-200`}
              >
                {techStack[index]}
              </span>
            </h2>
          </div>

          <div className="relative ml-10">
            <div className="absolute -left-6 top-0 w-3 h-full bg-gradient-to-blue from-yellow-300 to-transparent rounded-full hidden md:block"></div>
            <p className="text-sm md:text-base mt-4 max-w-xl mx-auto px-3 md:px-0 leading-relaxed text-white/90">
              Unlock the power of coding with interactive lessons. Master the
              latest technologies with step-by-step guidance.
              <br />
              Access detailed notes and real-world projects. Join a growing
              community of passionate developers today!
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <a href="#designs" className=" sm:w-auto">
              <span className="block bg-white text-purple-600 py-2 px-5 rounded-lg text-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Explore Design
              </span>
            </a>
            <a href="#notes" className=" sm:w-auto">
              <span className="block bg-white text-purple-600 py-2 px-5 rounded-lg text-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Free Notes
              </span>
            </a>
          </div>

          {/* Floating badges */}
          <div className="hidden md:block absolute bottom-4 right-4 transform rotate-12">
            <div className="bg-purple-800/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-purple-400/30">
              Premium Content
            </div>
          </div>

          <div className="hidden md:block absolute top-0 right-16 transform rotate-6">
            <div className="bg-blue-800/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-blue-400/30">
              Updated Weekly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
