"use client";
import Link from "next/link";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function CustomFooter() {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Code with Ayush</h2>
          <div className="flex space-x-6">
            {/* Social Media Icons */}
            <a
              href="https://twitter.com/_ayu_ssss_h"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://m.facebook.com/profile.php?id=100012083976241&_rdr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-gupta-4332731b1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Footer Middle Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-200 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/designs"
                  className="hover:text-gray-200 transition-colors duration-300"
                >
                  Designs
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-gray-200 transition-colors duration-300"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/notes"
                  className="hover:text-gray-200 transition-colors duration-300"
                >
                  Notes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-200">support@codewithayush.com</span>
              </li>
              <li>
                <span className="text-gray-200">+91 8271274460</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-200">
              Code with Ayush provides learning resources, tutorials, and
              interactive courses for developers and students.
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center text-sm">
          <p>&copy; 2025 Code with Ayush. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
