import * as cheerio from "cheerio";

const UNIVERSITY_DEPT_URLS = {
  bogazici: {
    cse: "https://cmpe.bogazici.edu.tr/tr/undergraduate/curriculum/",
    ee: "https://ee.bogazici.edu.tr/tr/pages/ders-programi/1204",
    me: "https://me.bogazici.edu.tr/tr/pages/ders-programi/2240",
    ie: "https://ie.bogazici.edu.tr/tr/icerik/akademik-program",
  },

  odtu: {
    cse: "https://ceng.metu.edu.tr/tr/ogretim-programi",
    ee: "https://eee.metu.edu.tr/tr/all-courses",
    me: "https://me.metu.edu.tr/tr/anadal",
    ie: "https://ie.metu.edu.tr/tr/endustri-muhendisligi-lisans-ogretim-programi",
  },

  itu: {
    cse: "https://obs.itu.edu.tr/public/DersPlan/DersPlanDetay/1562",
    ee: "https://obs.itu.edu.tr/public/DersPlan/DersPlanDetay/1456",
    me: "https://obs.itu.edu.tr/public/DersPlan/DersPlanDetay/1918",
    ie: "https://obs.itu.edu.tr/public/DersPlan/DersPlanDetay/1551",
  },
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const university = searchParams.get("university");
  const dept = searchParams.get("dept");

  if (!university || !dept) {
    return new Response(
      JSON.stringify({ error: "university ve dept zorunlu" }),
      { status: 400 },
    );
  }

  const universityData = UNIVERSITY_DEPT_URLS[university];
  const url = universityData?.[dept];

  if (!url) {
    return new Response(
      JSON.stringify({ error: "Bu üniversite/bölüm bulunamadı" }),
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const courses = [];

    // ŞİMDİLİK: basit tablo okuma
    $("table tr").each((_, el) => {
      const tds = $(el).find("td");
      const code = $(tds[0]).text().trim();
      const name = $(tds[1]).text().trim();

      if (code && name && code.length < 10) {
        courses.push({
          code,
          name,
        });
      }
    });

    return new Response(
      JSON.stringify({
        university,
        department: dept,
        source: url,
        total: courses.length,
        courses,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Scrape başarısız", detail: err.message }),
      { status: 500 },
    );
  }
}
