/* eslint-disable react/prop-types */
import React from "react";
export default function LocationPage({ params }) {
  const { deptId } = params;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">
        {deptId.toUpperCase()} Fakülte Konumu
      </h1>

      <p className="text-gray-600">
        Fakülte konumu bilgileri yakında eklenecek.
      </p>
    </div>
  );
}
