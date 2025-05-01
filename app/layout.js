import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CustomFooter from "./components/CustomFooter";
import { DesignProvider } from "@/app/context/DesignContext";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar /> {/* Use the Navbar component here */}
          <DesignProvider>{children}</DesignProvider>
          <CustomFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
