export default async function StaffPage({ params }) {
  const { id, deptId } = params;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/departments/${deptId}`,
    {
      cache: "no-store",
    }
  );
  const dept = await res.json();

  if (dept.error) return <div className="p-10">Bölüm bulunamadı.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        👨‍🏫 {dept.name} - Akademik Kadro
      </h1>
      <ul className="space-y-4">
        {dept.staff.map((person, i) => (
          <li key={i} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-gray-800">{person.name}</p>
            <p className="text-gray-600">{person.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
