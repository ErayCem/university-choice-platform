/* eslint-disable react/prop-types */
import React from "react";
export default async function LocationsPage({ params }) {
  console.log("PARAMS:", params.id);

  const res = await fetch(
    `http://localhost:3000/api/data?type=locations&university=${params.id}`,
  );

  const data = await res.json();

  console.log("DATA:", data);

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Bulunduğu Yerler</h1>

      {data.data.map((campus, i) => (
        <div key={i} className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{campus.campus}</h2>
          <p className="text-gray-400">{campus.location}</p>

          <ul className="mt-2 list-disc ml-5">
            {campus.faculties.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
