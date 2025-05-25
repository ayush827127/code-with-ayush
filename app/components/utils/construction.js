"use client";
import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const UnderConstruction = () => {
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30); // Launch in 30 days

  const calculateDaysLeft = () => {
    const today = new Date();
    const timeDiff = launchDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  };

  const [daysRemaining, setDaysRemaining] = useState(calculateDaysLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysRemaining(calculateDaysLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const progressPercent = `${100 - (daysRemaining / 30) * 100}%`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#ece9e6] to-[#ffffff] p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-200">
        <div className="text-6xl mb-6 text-yellow-500 animate-bounce">🚧</div>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Under Construction
        </h1>

        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          We’re crafting something amazing! Stay tuned — we’ll be launching
          soon.
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-700 ease-in-out"
            style={{ width: progressPercent }}
          />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Contact us:{" "}
          <a
            href="mailto:codewithayushgupta@gmail.com"
            className="text-blue-600 font-medium hover:underline"
          >
            codewithayushgupta@gmail.com
          </a>
        </p>

        <div className="flex justify-center space-x-5 mt-4">
          <a
            href="https://www.instagram.com/codewithayushgupta/"
            className="text-pink-500 hover:text-pink-700 transition"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/ayush-gupta-4332731b1/"
            className="text-blue-700 hover:text-blue-900 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
