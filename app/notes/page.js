"use client";
import { useState } from "react";
import notesData from "@/public/data/notes.json";

const NotesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notesData.notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">
          Programming Notes
        </h1>

        {/* Enhanced Search Bar with Button */}
        <div className="mb-12 max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full px-6 py-4 border-none rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all text-lg bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-4 top-4 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

        {/* Notes Grid with Enhanced Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="group bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col transform hover:-translate-y-2 border border-purple-100"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity z-10"></div>
                  <img
                    src={note.image}
                    alt={note.title}
                    className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-purple-600/90 text-white text-xs font-medium px-2 py-1 rounded-full z-20">
                    Handwritten
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
                    {note.title}
                  </h2>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-blue-400 to-purple-500 my-3"></div>
                  <p className="text-slate-600 mt-2 flex-grow text-sm">
                    {note.description}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={note.fileLink}
                      download
                      className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-sm hover:shadow-md font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Notes
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-purple-100 p-5 rounded-full mb-4">
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-xl font-medium text-purple-600">No notes found</p>
              <p className="text-slate-500 mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;