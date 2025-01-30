"use client";
import { useState } from "react";
import Link from "next/link";

const NotesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      name: "C Programming",
      description: "Learn C from basics",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Programming_Language.png",
      file: "/notes/c-notes.pdf",
    },
    {
      name: "C++ Programming",
      description: "Master C++ concepts",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/18/C%2B%2B_logo.png",
      file: "/notes/cpp-notes.pdf",
    },
    {
      name: "JavaScript",
      description: "JavaScript for web development",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      file: "/notes/js-notes.pdf",
    },
    {
      name: "Data Structures",
      description: "Essential data structures for problem-solving",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Data_structure_icon.png",
      file: "/notes/ds-notes.pdf",
    },
    {
      name: "Python Programming",
      description: "Introduction to Python programming",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      file: "/notes/python-notes.pdf",
    },
    {
      name: "Java Programming",
      description: "Learn Java for object-oriented programming",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/30/Java_programming_language_logo.svg",
      file: "/notes/java-notes.pdf",
    },
    {
      name: "Web Development",
      description: "Building websites with HTML, CSS, and JavaScript",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/HTML5_logo.svg",
      file: "/notes/webdev-notes.pdf",
    },
    {
      name: "SQL Databases",
      description: "Learn SQL for database management",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/SQL_Logo.svg",
      file: "/notes/sql-notes.pdf",
    },
    {
      name: "Machine Learning",
      description: "Introduction to machine learning algorithms",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Scikit-learn_logo_small.svg",
      file: "/notes/ml-notes.pdf",
    },
    {
      name: "Android Development",
      description: "Develop Android applications",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3e/Android_logo_2019.png",
      file: "/notes/android-notes.pdf",
    },
    {
      name: "iOS Development",
      description: "Create applications for iOS devices",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Swift_logo.svg",
      file: "/notes/ios-notes.pdf",
    },
    {
      name: "Game Development",
      description: "Learn to develop games using Unity",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0f/Unity_Technologies_logo.svg",
      file: "/notes/game-dev-notes.pdf",
    },
    {
      name: "Cybersecurity",
      description: "Fundamentals of cybersecurity practices",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4e/Cybersecurity_logo.svg",
      file: "/notes/cybersecurity-notes.pdf",
    },
    {
      name: "Cloud Computing",
      description: "Introduction to cloud services and architecture",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Amazon_Web_Services_Logo.svg",
      file: "/notes/cloud-computing-notes.pdf",
    },
    {
      name: "Blockchain Technology",
      description: "Understanding blockchain and its applications",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Blockchain_logo.svg",
      file: "/notes/blockchain-notes.pdf",
    },
    {
      name: "DevOps Practices",
      description: "Learn DevOps tools and methodologies",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/DevOps_logo.svg",
      file: "/notes/devops-notes.pdf",
    },
    {
      name: "Artificial Intelligence",
      description: "Introduction to AI concepts and applications",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Artificial_Intelligence_Logo.svg",
      file: "/notes/ai-notes.pdf",
    },
    {
      name: "Data Science",
      description: "Learn data analysis and visualization techniques",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8c/Data_Science_logo.svg",
      file: "/notes/data-science-notes.pdf",
    },
    {
      name: "Internet of Things (IoT)",
      description: "Explore IoT devices and their programming",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/IoT_logo.svg",
      file: "/notes/iot-notes.pdf",
    },
    {
      name: "Virtual Reality (VR) Development",
      description: "Create immersive VR experiences",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/VR_logo.svg",
      file: "/notes/vr-dev-notes.pdf",
    },
    {
      name: "Augmented Reality (AR) Development",
      description: "Develop AR applications and experiences",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/AR_logo.svg",
      file: "/notes/ar-dev-notes.pdf",
    },
    {
      name: "Robotics Programming",
      description: "Learn to program robots and automation systems",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Robotics_logo.svg",
      file: "/notes/robotics-notes.pdf",
    },
    {
      name: "Embedded Systems",
      description: "Introduction to embedded system design and programming",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Embedded_Systems_logo.svg",
      file: "/notes/embedded-systems-notes.pdf",
    },
    {
      name: "Quantum Computing",
      description: "Explore the basics of quantum computing",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4d/Quantum_Computing_logo.svg",
      file: "/notes/quantum-computing-notes.pdf",
    },
    {
      name: "Big Data Analytics",
      description: "Learn techniques for analyzing large datasets",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Big_Data_logo.svg",
      file: "/notes/big-data-notes.pdf",
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Course Notes
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={course.image}
                  alt={`${course.name} logo`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {course.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                  <div className="mt-4">
                    <a
                      href={course.file}
                      download
                      className="inline-block bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l hover:from-pink-700 hover:to-blue-700 transition"
                    >
                      Download Notes
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No courses found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
