import Link from "next/link";
/* eslint-disable react/prop-types */
import React from "react";
export default function DepartmentPage({ params }) {
  const { id, deptId } = params;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        {deptId.toUpperCase()} Bölümü
      </h1>

      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          href={`/universities/${id}/departments/${deptId}/courses`}
          className="bg-gradient-to-r from-orange-400 to-gray-500 text-white py-6 rounded-xl text-center font-semibold"
        >
          📘 Ders Müfredatı
        </Link>

        <Link
          href={`/universities/${id}/departments/${deptId}/staff`}
          className="bg-gradient-to-r from-orange-400 to-gray-500 text-white py-6 rounded-xl text-center font-semibold"
        >
          👨‍🏫 Akademik Kadro
        </Link>

        <Link
          href={`/universities/${id}/departments/${deptId}/location`}
          className="bg-gradient-to-r from-orange-400 to-gray-500 text-white py-6 rounded-xl text-center font-semibold"
        >
          📍 Fakülte Konumu
        </Link>
      </div>
    </div>
  );
}
