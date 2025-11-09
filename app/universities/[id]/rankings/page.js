export default function RankingsPage({ params }) {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Üniversite Sıralamaları</h1>
      <p>
        Burada {params.id} numaralı üniversitenin sıralama bilgileri
        gösterilecek.
      </p>
    </div>
  );
}
