"use client";
import Link from "next/link";
import Head from "next/head";
import DesignCard from "./components/DesignCard";
import coursesData from "@/public/data/courses.json";
import notesData from "@/public/data/notes.json";
import apiData from "@/public/data/apiData.json";
import { useDesigns } from "@/app/context/DesignContext";
import Testimonials from "./components/Landing/Testimonial";
import Hero from "./components/Landing/Hero";
import ApiCard from "./components/ApiCard";

export default function HomePage() {
  const { designs, loading, error } = useDesigns();
  const courses = coursesData.courses.slice(0, 6);
  const notes = notesData.notes.slice(0, 6);
  const apis = apiData.slice(0, 6);

  const SkeletonLoader = () => (
    <div className="border-2 border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-3/4 h-6 bg-blue-300 rounded mb-4 animate-pulse"></div>
      <div className="relative overflow-hidden rounded-lg shadow-md mb-4">
        <div className="w-full h-72 bg-purple-300 animate-pulse rounded-lg"></div>
      </div>
      <div className="w-1/2 h-12 bg-pink-300 rounded-full mb-4 animate-pulse"></div>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Code with Ayush - Learn Coding, Explore APIs & UI Designs</title>
        <meta name="description" content="A platform for developers and students to explore UI designs, APIs, coding tutorials, and notes for learning and building projects." />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Welcome Section */}
      {/* <section className="bg-white py-12 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Welcome to Code with Ayush</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A one-stop platform for aspiring developers, students, and coding enthusiasts. Explore a curated collection of design elements, powerful APIs, beginner-friendly courses, and detailed programming notes—all in one place.
          </p>
        </div>
      </section> */}

      {/* Hero Section */}
      <Hero />

      {/* Designs Section */}
      <section id="designs" className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent drop-shadow-sm">Innovative Interface Elements</h2>
          <p className="text-center text-indigo-800 font-medium mb-8 text-lg italic">"Experience a design that's not just beautiful—but built for users."</p>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><SkeletonLoader /><SkeletonLoader /><SkeletonLoader /></div>
          ) : error ? (
            <p className="text-red-500 text-center font-bold">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {designs.map((design) => <DesignCard key={design._id} design={design} />)}
            </div>
          )}
          <div className="text-center mt-8">
            <Link href="/designs">
              <span className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l transition">Explore All Designs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* APIs Section */}
      <section id="apis" className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">Supercharge Your Website with APIs</h2>
          <p className="text-center text-purple-800 font-medium mb-8 text-lg italic">"Bring dynamic features to life with fast, secure, and flexible APIs designed for modern web development."</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apis.map((api) => <ApiCard key={api.id} api={api} />)}
          </div>
          <div className="text-center mt-8">
            <Link href="/apis">
              <span className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l transition">View All APIs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">Begin Your Learning Adventure</h2>
          <p className="text-center text-pink-800 font-medium mb-8 text-lg">Level up your coding skills with these expert picks.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border-2 border-gray-200 p-6 rounded-lg shadow-lg flex flex-col h-full">
                <a href={course.videoLink} target="_blank" rel="noopener noreferrer">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4 hover:opacity-80 transition" />
                </a>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
                  <a href={course.videoLink} target="_blank" rel="noopener noreferrer">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-full hover:from-purple-500 hover:to-blue-500 transition-all duration-300 mt-auto">Start Watching</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/courses">
              <span className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l transition">Explore More Courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section id="notes" className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent drop-shadow-sm">Developer's Cheat Sheets</h2>
          <p className="text-center text-blue-800 font-medium mb-8 text-lg">Quick, structured, and logical notes to make your coding journey smooth.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="border-2 border-gray-200 p-6 rounded-lg shadow-lg flex flex-col">
                <img src={note.image} alt={note.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-xl text-gray-800 mb-4">{note.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{note.description}</p>
                <a href={note.fileLink} download className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 font-semibold py-3 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 text-center block mt-auto">Download Notes</a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/notes">
              <span className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l transition">Explore More Notes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">Why Choose Code with Ayush?</h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">Built by developers, for developers. Here’s what makes us stand out:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl text-blue-600 mb-2">Curated Content</h3>
              <p className="text-gray-600">Every course, note, and API is handpicked to ensure relevance and quality.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl text-purple-600 mb-2">Beginner-Friendly</h3>
              <p className="text-gray-600">Our materials are designed to be clear, practical, and beginner-focused.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl text-pink-600 mb-2">Developer Tools</h3>
              <p className="text-gray-600">Use real APIs and ready-made UI designs to build and practice like a pro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <Testimonials />
      </section>
        
        {/* Features Overview Section */}
<section className="bg-white py-20">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold text-indigo-700 mb-6">Everything You Need in One Place</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
      <div className="bg-gradient-to-br from-blue-100 to-purple-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Hands-On Learning</h3>
        <p className="text-gray-700">Explore practical coding tutorials and build real-world projects step by step.</p>
      </div>
      <div className="bg-gradient-to-br from-purple-100 to-pink-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-purple-700 mb-2">Built for Beginners</h3>
        <p className="text-gray-700">Start from scratch with beginner-friendly resources and intuitive designs.</p>
      </div>
      <div className="bg-gradient-to-br from-pink-100 to-blue-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-pink-700 mb-2">Developer Tools</h3>
        <p className="text-gray-700">Access APIs, UI kits, code snippets, and quick notes to speed up your development process.</p>
      </div>
    </div>
  </div>
</section>

{/* Popular Categories */}
<section className="py-20 bg-gradient-to-r from-indigo-50 to-pink-100">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold text-indigo-800 mb-6">Popular Categories</h2>
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      <Link href="/designs">
        <span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow hover:scale-105 transition">UI Designs</span>
      </Link>
      <Link href="/courses">
        <span className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-semibold shadow hover:scale-105 transition">Courses</span>
      </Link>
      <Link href="/apis">
        <span className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold shadow hover:scale-105 transition">APIs</span>
      </Link>
      <Link href="/notes">
        <span className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold shadow hover:scale-105 transition">Notes</span>
      </Link>
    </div>
  </div>
</section>

{/* Newsletter Signup */}
<section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">Stay Updated with New Content</h2>
    <p className="mb-6 text-lg">Join our newsletter for weekly tips, project ideas, and resource updates.</p>
    <form className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-3 rounded-lg text-black w-full md:w-2/3"
      />
      <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
        Subscribe
      </button>
    </form>
  </div>
</section>

{/* FAQ Section */}
<section className="bg-white py-20">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h3 className="font-semibold text-xl text-indigo-700">Is this platform free to use?</h3>
        <p className="text-gray-700 mt-1">Yes, most of the content including APIs, notes, and design resources are completely free to explore and use.</p>
      </div>
      <div>
        <h3 className="font-semibold text-xl text-indigo-700">Who can benefit from this website?</h3>
        <p className="text-gray-700 mt-1">Beginners, students, and aspiring developers looking for curated, beginner-friendly resources to level up their coding skills.</p>
      </div>
      <div>
        <h3 className="font-semibold text-xl text-indigo-700">How often is content updated?</h3>
        <p className="text-gray-700 mt-1">New designs, APIs, and learning materials are added every month. Make sure to subscribe to stay updated!</p>
      </div>
    </div>
  </div>
</section>

{/* Final CTA (Already Present — Enhanced below for completeness) */}
<section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold mb-4">Ready to Dive In?</h2>
    <p className="text-lg mb-6 max-w-2xl mx-auto">Code with Ayush is the perfect place to start your development journey—fun, beginner-friendly, and completely free to get started!</p>
    <Link href="/courses">
      <span className="bg-white text-indigo-600 py-3 px-6 rounded-full font-semibold shadow hover:bg-gray-100 transition">
        Start Learning Now
      </span>
    </Link>
  </div>
</section>

      {/* Final Call to Action */}
      {/* <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Dive In?</h2>
          <p className="text-lg mb-8">Explore, learn, and build amazing projects. Whether you're starting out or sharpening your skills—we’ve got you covered.</p>
          <Link href="/courses">
            <span className="bg-white text-indigo-600 py-3 px-6 rounded-full font-semibold shadow hover:bg-gray-100 transition">Start Learning Now</span>
          </Link>
        </div>
      </section> */}
    </div>
  );
}
