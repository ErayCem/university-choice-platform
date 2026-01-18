export default async function DepartmentPage({ params }) {
  const { deptId } = params;

  let data;

  try {
    const res = await fetch("http://localhost:3000/api/courses", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API hatası: ${res.status}`);
    }

    data = await res.json();
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        ❌ Veri çekilemedi: {err.message}
      </div>
    );
  }

  const courses = data.courses.filter(
    (c) => !c.toLowerCase().includes("dersin kodu"),
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-orange-400 mb-6">
        🎓 {deptId.toUpperCase()} Müfredatı
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">
                Ders Kodu
              </th>
              <th className="border border-gray-700 px-4 py-2 text-left">
                Ders Adı
              </th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => {
              const [code, ...nameParts] = course.split(" - ");
              const name = nameParts.join(" - ");

              return (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="border border-gray-700 px-4 py-2 text-orange-400 font-semibold">
                    {code}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">{name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-gray-500 text-sm mt-6">
        Kaynak:{" "}
        <a
          href={data.source}
          target="_blank"
          className="underline text-orange-400"
        >
          {data.source}
        </a>
      </p>
    </div>
  );
}
