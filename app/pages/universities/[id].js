// app/universities/[id].js
import { useRouter } from "next/router";

const universities = [
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
    image: "/images/hacettepe.jpg",
    description: "Sağlık ve sosyal bilimler alanında güçlü bir üniversite.",
  },
  {
    id: "5",
    name: "Sabancı Üniversitesi",
    image: "https://example.com/sabanci.jpg",
    description:
      "İnovatif ve disiplinlerarası eğitim anlayışıyla öne çıkan bir üniversite.",
  },
];

export default function UniversityDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Üniversiteyi id'ye göre bul
  const university = universities.find((uni) => uni.id === id);

  if (!university) {
    return <p>Üniversite bulunamadı.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{university.name}</h1>
      <img
        src={university.image}
        alt={university.name}
        className="w-full h-64 object-cover my-4"
      />
      <p className="text-gray-600">{university.description}</p>
    </div>
  );
}
