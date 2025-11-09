// app/universities/[id]/departments/[deptId]/page.js
import React from "react";

export default async function DepartmentPage({ params }) {
  const { deptId } = params;

  let dept = null;

  try {
    const res = await fetch("http://localhost:3000/api/courses", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API yanıtı başarısız: ${res.status}`);
    }

    dept = await res.json();
  } catch (err) {
    console.error("Veri çekilemedi:", err);
    return (
      <div className="p-10 text-red-600">
        ❌ Veri çekilemedi veya JSON geçersiz. <br />
        Hata: {err.message}
      </div>
    );
  }

  if (!dept || dept.error) {
    return <div className="p-10">Bölüm bulunamadı.</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{dept.name}</h1>
      <p className="text-gray-700 mb-6">{dept.description}</p>

      <h2 className="text-2xl font-semibold mb-2">📘 Dersler</h2>
      <ul className="list-disc ml-6 mb-6">
        {dept.courses?.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">👨‍🏫 Akademik Kadro</h2>
      <ul className="list-disc ml-6">
        {dept.staff?.map((s, i) => (
          <li key={i}>
            {s.name} – {s.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
