"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const techStack = ["Java", "React", "Vue.js", "Next.js", "Tailwind CSS"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20 text-center">
      <div className="container mx-auto px-4 justify-start">
        <h1 className="text-5xl font-extrabold mb-4">Code with Ayush</h1>
        <h2 className="text-3xl font-semibold">
          Learn <span className="text-white">{techStack[index]}</span>
        </h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto ">
          Unlock the power of coding with interactive lessons. <br />
          Master the latest technologies with step-by-step guidance. <br />
          Access detailed notes and real-world projects. <br />
          Enhance your skills with stunning design inspirations. <br />
          Join a growing community of passionate developers today!
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link href="#designs">
            <span className="bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
              Explore Designs
            </span>
          </Link>
          <Link href="#notes">
            <span className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition">
              Free Notes
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
