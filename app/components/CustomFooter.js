import Link from "next/link";

export default function CustomFooter() {
  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-12">
    <div className="container mx-auto px-6">
      {/* Footer Top Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Code with Ayush</h2>
        <div className="flex space-x-6">
          {/* Social Media Icons */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 hover:text-gray-200 transition-colors duration-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 19c3 0 4-2 4-4V5c0-2-1-4-4-4h-1c-2 0-3 1-3 3v6c0 2 1 3 3 3h1z"
              />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 hover:text-gray-200 transition-colors duration-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 2.5H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4.5c0-1.1-.9-2-2-2zM9.6 16.6V12h1.6v4.6h2.1c.1 0 .2.1.2.2v2.2h-2.3v2.4h-2.1v-2.4H9.6v-2.2c0-.1.1-.2.2-.2h2.1z"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 hover:text-gray-200 transition-colors duration-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8c2 0 3-2 3-2s1 1 1 2v12h-4v-6h-2v6h-4V8h2v1c.2-.4.6-.6 1-.6h1v-.4zM3 3h18v18H3z"
              />
            </svg>
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
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-200"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.25 6h19.5M2.25 12h19.5M2.25 18h19.5"
                />
              </svg>
              <span className="text-gray-200">support@codewithayush.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-200"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17l3-3 3 3M9 7l3 3 3-3"
                />
              </svg>
              <span className="text-gray-200">+1 234 567 890</span>
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
  </div>;
}
