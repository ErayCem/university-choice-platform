/* eslint-disable react/prop-types */
import React from "react";

export default async function RankingsPage({ params }) {
  const res = await fetch(
    `http://localhost:3000/api/data?type=rankings&university=${params.id}`,
    { cache: "no-store" },
  );

  const data = await res.json();

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-8">
        📊 Sıralamalar ({params.id.toUpperCase()})
      </h1>

      {data.data.length === 0 && (
        <p className="text-gray-400">Veri bulunamadı.</p>
      )}

      <div className="grid gap-4">
        {data.data.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-gradient-to-r from-orange-500 to-gray-600 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">🎓 {item.department}</h2>

            <div className="flex gap-6 text-sm">
              <p>📈 Tavan: {item.tavanRank}</p>
              <p>📉 Taban: {item.tabanRank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
