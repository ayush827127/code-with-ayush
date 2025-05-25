"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout, loginWithGoogle } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsNavbarFixed(window.scrollY > 10);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize the state
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Navbar */}
      <nav
        className={`${
          isNavbarFixed
            ? "fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-pink-500/95 shadow-lg"
            : "relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"
        } transition-all duration-300 border-b border-purple-800/30`}
      >
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-white flex items-center group"
          >
            <span className="bg-clip-text text-transparent bg-white">
              Code with Ayush
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {[
                ["APIs", "/interface"],
                ["Designs", "/designs"],
                ["Upload", "/upload"],
                ["Courses", "/courses"],
                ["Notes", "/notes"],
                ["Blogs", "/blogs"],
              ].map(([label, path]) => (
                <Link
                  key={label}
                  href={path}
                  className="text-white/90 hover:text-white font-medium text-sm relative group"
                >
                  {label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-white/20 mx-2" />

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                  <FiChevronDown
                    className={`text-white/70 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-gradient-to-b from-blue-900/95 to-purple-900/95 rounded-lg shadow-xl border border-purple-800/30 z-50 overflow-hidden backdrop-blur-md">
                    <div className="px-4 py-3 border-b border-purple-800/30">
                      <p className="text-sm font-medium text-white">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-white/60 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <FiUser className="mr-3" size={14} />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <FiSettings className="mr-3" size={14} />
                      Settings
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <FiHelpCircle className="mr-3" size={14} />
                      Help
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors border-t border-purple-800/30"
                    >
                      <FiLogOut className="mr-3" size={14} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="relative overflow-hidden bg-white text-blue-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-white/90 transition-all group"
              >
                <span className="relative z-10">Sign in</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={toggleDrawer}
            className="md:hidden text-white focus:outline-none transition-transform hover:scale-110"
          >
            {isDrawerOpen ? (
              <FiX size={24} className="text-white" />
            ) : user ? (
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                {user.displayName?.charAt(0) || "U"}
              </div>
            ) : (
              <FiMenu size={24} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-blue-900 to-purple-900 text-white transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-2xl border-l border-purple-800/30`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-purple-800/30">
          <h2 className="text-lg font-bold">
            {user ? (
              <div>
                <p className="text-white">{user.displayName}</p>
                <p className="text-xs text-white/60">{user.email}</p>
              </div>
            ) : (
              "Menu"
            )}
          </h2>
          <button
            onClick={toggleDrawer}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col px-4 py-2 h-[calc(100%-72px)] overflow-y-auto">
          <div className="space-y-1">
            {[
              ["Home", "/"],
              ["Designs", "/designs"],
              ["Upload", "/upload"],
              ["Courses", "/courses"],
              ["Notes", "/notes"],
              ["APIs", "/interface"],
              ["Blogs", "/blogs"],
            ].map(([label, path]) => (
              <Link
                key={label}
                href={path}
                onClick={toggleDrawer}
                className="block px-4 py-3 rounded-md hover:bg-white/10 text-sm font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <hr className="h-2 text-white mt-8" />
          <div className=" pt-4 border-t border-purple-800/30">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={toggleDrawer}
                  className="flex items-center px-4 py-3 rounded-md hover:bg-white/10 text-sm font-medium transition-colors"
                >
                  <FiUser className="mr-3" size={16} />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleDrawer();
                  }}
                  className="flex items-center w-full px-4 py-3 rounded-md hover:bg-white/10 text-sm font-medium transition-colors"
                >
                  <FiLogOut className="mr-3" size={16} />
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  loginWithGoogle();
                  toggleDrawer();
                }}
                className="w-full bg-white text-blue-900 px-4 py-3 rounded-md text-sm font-semibold mt-2 transition-colors hover:bg-white/90 flex items-center justify-center"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleDrawer}
        />
      )}

      {/* Spacer when navbar is fixed */}
      {isNavbarFixed && <div className="h-16"></div>}
    </>
  );
};

export default Navbar;
