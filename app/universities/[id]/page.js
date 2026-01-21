// app/universities/[id]/page.js
import React from "react";

import { universities } from "../../page";
import Link from "next/link";

export default function UniversityPage({ params }) {
  const { id } = params;
  const university = universities.find((u) => u.id === id);

  if (!university) return <div>Üniversite bulunamadı</div>;

  const sections = [
    { name: "Bölümler", path: "departments" },
    { name: "Sıralamalar", path: "rankings" },
    { name: "Bulunduğu Yerler", path: "locations" },
    { name: "Kampüs Ortamı", path: "campus" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sol kısım */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
        <img
          src={university.image}
          alt={university.name}
          className="rounded-lg mb-4 w-full h-60 object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {university.name}
        </h1>
        <p className="text-gray-700 text-center">{university.description}</p>
        <Link
          href="/"
          className="mt-4 text-orange-500 hover:text-orange-700 underline"
        >
          ← Ana sayfaya dön
        </Link>
      </div>

      {/* Orta frame */}
      <div className="flex-1 p-10 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Üniversite Bilgileri
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link
              key={section.path}
              href={`/universities/${id}/${section.path}`}
              className="bg-gradient-to-r from-orange-400 to-gray-500 text-white px-8 py-6 rounded-lg shadow-lg text-center text-xl font-semibold hover:scale-105 transition-transform"
            >
              {section.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
