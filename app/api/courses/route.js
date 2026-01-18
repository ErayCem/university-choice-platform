import * as cheerio from "cheerio";

const DEPT_URLS = {
  cse: "https://ceng.metu.edu.tr/tr/ogretim-programi",
  ee: "https://eee.metu.edu.tr/tr/all-courses",
  me: "https://me.metu.edu.tr/tr/anadal",
  ie: "https://ie.metu.edu.tr/tr/endustri-muhendisligi-lisans-ogretim-programi",
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const dept = searchParams.get("dept");

  const url = DEPT_URLS[dept];

  if (!url) {
    return new Response(JSON.stringify({ error: "Geçersiz bölüm" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const courses = [];

    // GENEL TABLO OKUMA (şimdilik ortak)
    $("table tr").each((_, el) => {
      const tds = $(el).find("td");
      const code = $(tds[0]).text().trim();
      const name = $(tds[1]).text().trim();

      if (code && name && code.length < 10) {
        courses.push(`${code} - ${name}`);
      }
    });

    return new Response(
      JSON.stringify({
        department: dept,
        source: url,
        total: courses.length,
        courses,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Scrape başarısız" }), {
      status: 500,
    });
  }
}
