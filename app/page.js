// app/page.js
import Link from 'next/link';


export const universities = [
  {
    id: "1",
    name: "Boğaziçi Üniversitesi",
    image: "/images/bogazici.jpg",
    description: "Türkiye'nin önde gelen üniversitelerinden biri.",
  },
  {
    id: "2",
    name: "Orta Doğu Teknik Üniversitesi",
    image: "/images/odtu.jpg",
    description: "Mühendislik ve fen bilimleri alanında ünlü bir üniversite.",
  },
  {
    id: "3",
    name: "İstanbul Teknik Üniversitesi",
    image: "/images/itu.jpg",
    description: "Köklü bir teknik üniversite.",
  },
  {
    id: "4",
    name: "Hacettepe Üniversitesi",
    image: "https://example.com/hacettepe.jpg",
    description: "Sağlık ve sosyal bilimler alanında güçlü bir üniversite.",
  },
  {
    id: "5",
    name: "Sabancı Üniversitesi",
    image: "https://example.com/sabanci.jpg",
    description: "İnovatif ve disiplinlerarası eğitim anlayışıyla öne çıkan bir üniversite.",
  },
];

export default function Home() {
 

  return (
    <div className="flex flex-col md:flex-row h-screen p-6 bg-gradient-to-r from-orange-400 to-gray-200">
      <div className="flex-1 bg-white rounded-lg shadow-xl p-6 overflow-y-auto relative">
        <h1 className="text-2xl font-bold text-orange-600 absolute top-6 left-6">Univerchoose</h1>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4 mt-14">En Ünlü Üniversiteler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {universities.map((uni) => (
            <Link key={uni.id} href={`/universities/${uni.id}`} passHref>
              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <img src={uni.image} alt={uni.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{uni.name}</h3>
                  <p className="mt-2 text-gray-600">{uni.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Sağ Frame */}
      <div className="flex-none w-1/4 bg-white rounded-lg shadow-xl p-6 ml-4 flex flex-col h-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Üniversite Ara</h1>
        <div className="flex items-center justify-end mb-4">
          <input
            type="text"
            placeholder="Üniversite ismi girin..."
            className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="bg-gradient-to-r from-orange-500 to-gray-500 text-white py-3 rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-lg ml-2">
            Ara
          </button>
        </div>
        <p className="text-gray-600 text-center">Arama yaparken, önerilerden yararlanmayı unutmayın!</p>
      </div>
    </div>
  );
}
