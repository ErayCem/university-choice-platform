import * as cheerio from "cheerio";

const UNIVERSITY_ID_MAP = {
  1: "bogazici",
  2: "odtu",
  3: "itu",
  4: "hacettepe",
  5: "sabanci",
};

const COURSE_URLS = {
  odtu: {
    cse: "https://ceng.metu.edu.tr/tr/ogretim-programi",
    ee: "https://eee.metu.edu.tr/tr/all-courses",
    me: "https://me.metu.edu.tr/tr/anadal",
    ie: "https://ie.metu.edu.tr/tr/endustri-muhendisligi-lisans-ogretim-programi",
  },
  itu: {},
  bogazici: {},
  hacettepe: {},
  sabanci: {},
};

export default async function handler(req, res) {
  const { university, dept } = req.query;

  if (!university || !dept) {
    return res.status(400).json({ error: "university veya dept eksik" });
  }

  const universitySlug = UNIVERSITY_ID_MAP[university];

  if (!universitySlug) {
    return res.status(404).json({ error: "Geçersiz üniversite id" });
  }

  const url = COURSE_URLS?.[universitySlug]?.[dept];

  if (!url) {
    return res
      .status(404)
      .json({ error: "Bu üniversite/bölüm için müfredat yok" });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const courses = [];

    $("table tr").each((_, el) => {
      const tds = $(el).find("td");
      const code = $(tds[0]).text().trim();
      const name = $(tds[1]).text().trim();

      if (code && name) {
        courses.push({ code, name });
      }
    });

    return res.status(200).json({
      university: universitySlug,
      department: dept,
      source: url,
      total: courses.length,
      courses,
    });
  } catch (err) {
    return res.status(500).json({ error: "Scrape başarısız" });
  }
}
