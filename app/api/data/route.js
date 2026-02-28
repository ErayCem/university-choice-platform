import * as cheerio from "cheerio";

/* ===========================
   🎓 COURSE URLS
=========================== */
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

/* ===========================
   👨‍🏫 STAFF URLS
=========================== */
const UNIVERSITY_STAFF_URLS = {
  odtu: {
    cse: "https://ceng.metu.edu.tr/index.php/tr/ogretim-uyeleri",
    ee: "https://eee.metu.edu.tr/academic-staff",
    me: "https://me.metu.edu.tr/tr/ogretim-uyeleri",
  },
};

/* ===========================
   🚀 API
=========================== */
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") || "courses";
  const university = searchParams.get("university");
  const dept = searchParams.get("dept");

  if (!university || !dept) {
    return Response.json(
      { error: "university ve dept zorunlu" },
      { status: 400 },
    );
  }

  const url =
    type === "staff"
      ? UNIVERSITY_STAFF_URLS?.[university]?.[dept]
      : UNIVERSITY_DEPT_URLS?.[university]?.[dept];

  if (!url) {
    return Response.json(
      { error: "Bu üniversite/bölüm için veri yok" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    /* ===========================
       🎓 COURSES
    ============================ */
    if (type === "courses") {
      const courses = [];

      $("table tr").each((_, el) => {
        const tds = $(el).find("td");
        const code = $(tds[0]).text().trim();
        const name = $(tds[1]).text().trim();

        if (code && name && code.length < 10) {
          courses.push({ code, name });
        }
      });

      return Response.json({
        type,
        university,
        department: dept,
        source: url,
        total: courses.length,
        courses,
      });
    }
    console.log(html.length);
    /* ===========================
       👨‍🏫 STAFF – ODTÜ (GENEL)
    ============================ */
    if (type === "staff" && university === "odtu" && dept === "cse") {
      const staff = [];

      $(".views-field-title h5").each((_, el) => {
        const name = $(el).text().trim();

        if (name && name.length > 5) {
          staff.push({
            name,
            title: "Öğretim Üyesi",
          });
        }
      });

      console.log("Bulunan kişi sayısı:", staff.length);

      return Response.json({
        type,
        university,
        department: dept,
        total: staff.length,
        staff,
      });
    }

    return Response.json({
      error: "Bu üniversite için staff scrape desteklenmiyor",
    });
  } catch (err) {
    return Response.json(
      { error: "Scrape başarısız", detail: err.message },
      { status: 500 },
    );
  }
}
