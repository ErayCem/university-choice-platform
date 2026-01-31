export default function StaffPage({ params }) {
  const { deptId } = params;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">
        {deptId.toUpperCase()} Akademik Kadro
      </h1>

      <p className="text-gray-600">
        Akademik kadro bilgileri yakında eklenecek.
      </p>
    </div>
  );
}
