"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Detect scroll for fixed navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle drawer function
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`${
          isNavbarFixed ? "fixed top-0 left-0 w-full z-50" : "relative"
        } bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white py-4 px-8 shadow-md transition duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Code with Ayush</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-pink-300 transition">
              Home
            </Link>
            <Link href="#designs" className="hover:text-pink-300 transition">
              Designs
            </Link>
            <Link href="/courses" className="hover:text-pink-300 transition">
              Courses
            </Link>
            <Link href="/notes" className="hover:text-pink-300 transition">
              Notes
            </Link>

            {/* Vertical line */}
            <div className="h-8 w-px bg-white mx-4"></div>

            {/* Contact Section */}
            <Link
            href="tel:+918271274460"
            className="bg-white text-blue-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleDrawer}
            className="md:hidden text-white text-3xl focus:outline-none"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Right-side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={toggleDrawer}
            className="text-white text-3xl focus:outline-none"
          >
            <FiX />
          </button>
        </div>
        <div className="space-y-6 px-6">
          <Link
            href="/"
            onClick={toggleDrawer}
            className="hover:text-gray-200 transition block"
          >
            Home
          </Link>
          <Link
            href="#designs"
            onClick={toggleDrawer}
            className="hover:text-gray-200 transition block"
          >
            Designs
          </Link>
          <Link
            href="/courses"
            onClick={toggleDrawer}
            className="hover:text-gray-200 transition block"
          >
            Courses
          </Link>
          <Link
            href="/notes"
            onClick={toggleDrawer}
            className="hover:text-gray-200 transition block"
          >
            Notes
          </Link>

          {/* Line Divider */}
          <div className="border-t border-white my-4"></div>

          {/* Additional Menu Item */}
          <Link
            href="tel:+918271274460"
            onClick={toggleDrawer}
            className="bg-white text-blue-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition block"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
