"use client";
import { useState } from "react";
import notesData from "@/public/data/notes.json";

const NotesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notesData.notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Programming Notes
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
              >
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {note.title}
                  </h2>
                  <p className="text-gray-600 mt-2 flex-grow">{note.description}</p>
                  <div className="mt-auto">
                    <a
                      href={note.fileLink}
                      download
                      className="block text-center bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l hover:from-pink-700 hover:to-blue-700 transition"
                    >
                      Download Notes
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No notes found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;