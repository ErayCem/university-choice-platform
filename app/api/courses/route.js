// app/api/courses/route.js
import * as cheerio from "cheerio";

export async function GET() {
  const url = "https://ceng.metu.edu.tr/tr/ogretim-programi";

  try {
    // 1️⃣ Sayfayı çek
    const response = await fetch(url);
    const html = await response.text();

    // 2️⃣ HTML içeriğini cheerio ile yükle
    const $ = cheerio.load(html);

    // 3️⃣ Dersleri bulmak için tablo satırlarını tara
    const courses = [];

    $("table tr").each((i, el) => {
      const columns = $(el).find("td");
      const code = $(columns[0]).text().trim();
      const name = $(columns[1]).text().trim();

      // Kod ve isim varsa listeye ekle
      if (code && name) {
        courses.push(`${code} - ${name}`);
      }
    });

    // 4️⃣ JSON olarak döndür
    return new Response(
      JSON.stringify({
        source: url,
        total: courses.length,
        courses,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Veri alınamadı" }),
      { status: 500 }
    );
  }
}
asdasdaessdfsdsd;
