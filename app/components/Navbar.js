"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isNavbarFixed ? "fixed top-0 left-0 w-full z-50" : "relative"
      } bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white py-4 px-8 shadow-md transition duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">Code with Ayush</span>
        </Link>
        <div className="space-x-4">
          <Link href="#home" className="hover:text-pink-300">
            Home
          </Link>
          <Link href="#designs" className="hover:text-pink-300">
            Designs
          </Link>
          <Link href="/courses" className="hover:text-pink-300">
            Courses
          </Link>
          <Link href="/notes" className="hover:text-pink-300">
            Notes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
