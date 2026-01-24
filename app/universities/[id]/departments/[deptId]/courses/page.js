// app/universities/[id]/departments/[deptId]/courses/page.js
import React from "react";

export default async function CoursesPage({ params }) {
  const { id: university, deptId } = params;

  const res = await fetch(
    `http://localhost:3000/api/courses?university=${university}&dept=${deptId}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!res.ok || data.error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600 text-lg">
          ❌ Veri alınamadı: {data.error || "Bilinmeyen hata"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📘 {university.toUpperCase()} – {deptId.toUpperCase()} Dersleri
      </h1>

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

      {data.courses.length === 0 ? (
        <p className="text-gray-500">Bu bölüm için ders bulunamadı.</p>
      ) : (
        <ul className="list-disc ml-6 text-lg text-gray-700 space-y-2">
          {data.courses.map((course, index) => (
            <li key={index}>
              {course.code} – {course.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
