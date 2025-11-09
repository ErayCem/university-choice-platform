// app/universities/[id]/departments/page.js
import Link from "next/link";

export default function DepartmentsPage({ params }) {
  const { id } = params;

  // Geçici örnek veri (ileride JSON’dan çekeriz)
  const departments = [
    { id: "cse", name: "Bilgisayar Mühendisliği" },
    { id: "ee", name: "Elektrik Elektronik Mühendisliği" },
    { id: "me", name: "Makine Mühendisliği" },
    { id: "ie", name: "Endüstri Mühendisliği" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Bölümler</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {departments.map((dept) => (
          <Link
            key={dept.id}
            href={`/universities/${id}/departments/${dept.id}`}
            className="bg-gradient-to-r from-orange-400 to-gray-500 text-white text-center py-6 rounded-xl shadow-lg hover:scale-105 transition-transform text-xl font-semibold"
          >
            {dept.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href={`/universities/${id}`}
          className="text-orange-600 underline hover:text-orange-800"
        >
          ← Üniversite sayfasına dön
        </Link>
      </div>
    </div>
  );
}
