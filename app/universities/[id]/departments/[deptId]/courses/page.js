// app/universities/[id]/departments/[deptId]/courses/page.js
import React from "react";

export default async function CoursesPage() {
  // API'den scraping verisini çek
  const res = await fetch("http://localhost:3000/api/courses", {
    cache: "no-store", // her seferinde en güncel veriyi getir
  });

  const data = await res.json();

  // Eğer hata dönerse kullanıcıya göster
  if (data.error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600 text-lg">❌ Veri alınamadı: {data.error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📘 Çekilen Dersler
      </h1>

      {/* Kaynak linki */}
      <p className="text-gray-600 mb-4">
        Kaynak:{" "}
        <a
          href={data.source}
          className="text-orange-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.source}
        </a>
      </p>

      {/* Eğer hiç ders yoksa bilgilendirme */}
      {data.courses.length === 0 ? (
        <p className="text-gray-500">Bu sayfada ders bulunamadı.</p>
      ) : (
        <ul className="list-disc ml-6 text-lg text-gray-700 space-y-2">
          {data.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
