export default function Card({ children }) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-gray-600 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
      {children}
    </div>
  );
}
