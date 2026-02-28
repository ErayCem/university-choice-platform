export default async function StaffPage({ params }) {
  const { id, deptId } = params;

  const res = await fetch(
    `http://localhost:3000/api/data?type=staff&university=${id}&dept=${deptId}`,
    { cache: "no-store" },
  );

  const data = await res.json();

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-10">
        {deptId.toUpperCase()} Akademik Kadro
      </h1>

      {data.staff && data.staff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.staff.map((person, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-white">
                {person.name}
              </h2>
              <p className="text-gray-400 mt-2">{person.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          Bu bölüm için akademik kadro verisi bulunamadı.
        </p>
      )}
    </div>
  );
}
