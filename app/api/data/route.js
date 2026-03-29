import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

const UNIVERSITY_LOCATIONS = {
  bogazici: [
    {
      campus: "Güney Kampüs",
      location: "İstanbul / Bebek",
      faculties: [
        "Bilgisayar Mühendisliği",
        "Elektrik-Elektronik Mühendisliği",
      ],
    },
    {
      campus: "Kuzey Kampüs",
      location: "İstanbul / Sarıyer",
      faculties: ["Endüstri Mühendisliği", "Makine Mühendisliği"],
    },
  ],

  itu: [
    {
      campus: "Ayazağa Kampüsü",
      location: "İstanbul / Maslak",
      faculties: [
        "Bilgisayar Mühendisliği",
        "Elektrik Mühendisliği",
        "Endüstri Mühendisliği",
      ],
    },
  ],

  odtu: [
    {
      campus: "ODTÜ Ana Kampüs",
      location: "Ankara / Çankaya",
      faculties: [
        "Bilgisayar Mühendisliği",
        "Elektrik-Elektronik Mühendisliği",
        "Makine Mühendisliği",
        "Endüstri Mühendisliği",
      ],
    },
  ],
};
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
  bogazici: {
    cse: "https://cmpe.bogazici.edu.tr/tr/people/faculty/",
    ee: "https://ee.bogazici.edu.tr/tr/pages/ogretim-uyeleri/1451",
    me: "https://me.bogazici.edu.tr/tr/rehber",
    ie: "https://ie.bogazici.edu.tr/tr/faculty",
  },
  odtu: {
    cse: "https://ceng.metu.edu.tr/tr/ogretim-uyeleri-ve-gorevlileri",
    ee: "https://eee.metu.edu.tr/tr/people_faculty",
    me: "https://me.metu.edu.tr/tr/personel/mevcut-ogretim-uyeleri",
    ie: "https://ie.metu.edu.tr/tr/personel",
  },
  itu: {
    cse: "https://bm.itu.edu.tr/personel",
    ee: "https://elk.itu.edu.tr/personel/akademik-personel",
    me: "https://mkn.itu.edu.tr/personel/akademik-kadro-test",
    ie: "https://end.itu.edu.tr/personel/akademik-personel",
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

  // 🔥 LOCATION API
  if (type === "locations") {
    if (!university) {
      return Response.json({ error: "university zorunlu" }, { status: 400 });
    }

    return Response.json({
      type: "locations",
      university,
      data: UNIVERSITY_LOCATIONS[university] || [],
    });
  }

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
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    if (type === "courses") {
      return parseCourses($, university, dept, url);
    }

    if (type === "staff") {
      return await parseStaff($, university, dept, url);
    }

    return Response.json({ error: "Geçersiz type" });
  } catch (err) {
    return Response.json(
      { error: "Scrape başarısız", detail: err.message },
      { status: 500 },
    );
  }
}

/* ===========================
   🎓 COURSES PARSER
=========================== */
function parseCourses($, university, dept, url) {
  const courses = [];

  $("table tr").each((_, el) => {
    const tds = $(el).find("td");
    const code = $(tds[0]).text().trim();
    const name = $(tds[1]).text().trim();

    if (code && name && code.length < 12) {
      courses.push({ code, name });
    }
  });

  return Response.json({
    type: "courses",
    university,
    department: dept,
    source: url,
    total: courses.length,
    courses,
  });
}

/* ===========================
   👨‍🏫 STAFF DISPATCHER
=========================== */
async function parseStaff($, university, dept, url) {
  if (university === "odtu") {
    return parseOdtüStaff($, university, dept, url);
  }

  if (university === "itu") {
    return await parseItuStaff($, university, dept, url);
  }

  if (university === "bogazici") {
    return parseBogaziciStaff($, university, dept, url);
  }

  return Response.json({
    error: "Staff parser tanımlı değil",
  });
}

/* ===========================
   🏛 BOĞAZİÇİ STAFF
=========================== */
function parseBogaziciStaff($, university, dept, url) {
  const staff = [];

  /* ===========================
     1️⃣ CSE – Kart Yapısı (.card-body)
  =========================== */
  $(".card-body").each((_, el) => {
    const name = $(el).find("h5").text().trim();
    const title = $(el).find("p").first().text().trim();

    if (isRealName(name)) {
      staff.push({ name, title: title || "Akademisyen" });
    }
  });

  /* ===========================
     2️⃣ EE – title-name yapısı
  =========================== */
  if (staff.length === 0) {
    $(".title-name").each((_, el) => {
      const name = $(el).text().trim();

      if (isRealName(name)) {
        staff.push({ name, title: "Akademisyen" });
      }
    });
  }

  /* ===========================
     3️⃣ ME – views-field-title a
  =========================== */
  if (staff.length === 0) {
    $(".views-field-title a").each((_, el) => {
      const name = $(el).text().trim();

      if (isRealName(name)) {
        staff.push({ name, title: "Akademisyen" });
      }
    });
  }

  /* ===========================
     4️⃣ IE – faculty_name a
  =========================== */
  if (staff.length === 0) {
    $(".faculty_name a").each((_, el) => {
      const name = $(el).text().trim();

      if (isRealName(name)) {
        staff.push({ name, title: "Akademisyen" });
      }
    });
  }

  /* ===========================
     5️⃣ En Son Generic Güvenlik
  =========================== */
  if (staff.length === 0) {
    $("a").each((_, el) => {
      const name = $(el).text().trim();

      if (isRealName(name)) {
        staff.push({ name, title: "Akademisyen" });
      }
    });
  }

  return Response.json({
    type: "staff",
    university,
    department: dept,
    source: url,
    total: staff.length,
    staff,
  });
}
function parseOdtüStaff($, university, dept, url) {
  const staff = [];

  /* ===========================
     1️⃣ Genel ODTÜ yapısı (a içinde)
  =========================== */
  $(".views-field-title a").each((_, el) => {
    const name = $(el).text().trim();
    if (isRealName(name)) {
      staff.push({ name, title: "Akademisyen" });
    }
  });

  /* ===========================
     2️⃣ CSE için h5 yapısı
  =========================== */
  if (staff.length === 0) {
    $(".views-field-title h5").each((_, el) => {
      const name = $(el).text().trim();
      if (isRealName(name)) {
        staff.push({ name, title: "Akademisyen" });
      }
    });
  }

  /* ===========================
     3️⃣ IE tablo yapısı
  =========================== */
  if (staff.length === 0) {
    $("table ul li a").each((_, el) => {
      const name = $(el).text().trim();
      if (isRealName(name)) {
        staff.push({ name, title: "Akademisyen" });
      }
    });
  }

  return Response.json({
    type: "staff",
    university,
    department: dept,
    source: url,
    total: staff.length,
    staff,
  });
}
/* ===========================
   🏛 İTÜ STAFF
=========================== */
async function parseItuStaff($, university, dept, url) {
  // 👉 CSE
  if (dept === "cse") {
    const res = await fetch(
      "https://bm.itu.edu.tr/docs/librariesprovider92/assets/static_html_bm/staff__all_staff_tr.html",
    );

    const html = await res.text();
    const $$ = cheerio.load(html);

    const staff = [];

    $$(".name").each((_, el) => {
      const name = $$(el).text().trim();
      const title = $$(el).prev(".title").text().trim() || "Akademisyen";

      if (name.length > 5) {
        staff.push({ name, title });
      }
    });

    return Response.json({
      type: "staff",
      university,
      department: dept,
      source: "itu-cse-static",
      total: staff.length,
      staff,
    });
  }

  // 👉 EE (PUPPETEER)
  if (dept === "ee") {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const staff = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".person")).map((el) => ({
        name: el.querySelector(".person__name")?.innerText.trim(),
        title: el.querySelector(".person__title")?.innerText.trim(),
      }));
    });

    await browser.close();

    return Response.json({
      type: "staff",
      university,
      department: dept,
      source: url,
      total: staff.length,
      staff,
    });
  }

  // 👉 EE (PUPPETEER)
  if (dept === "ie") {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const staff = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".person")).map((el) => ({
        name: el.querySelector(".person__name")?.innerText.trim(),
        title: el.querySelector(".person__title")?.innerText.trim(),
      }));
    });

    await browser.close();

    return Response.json({
      type: "staff",
      university,
      department: dept,
      source: url,
      total: staff.length,
      staff,
    });
  }

  // 👉 diğer İTÜ bölümleri (makine vs)
  const staff = [];

  $(".person__name").each((_, el) => {
    const name = $(el).text().trim();
    const title = $(el).prev(".person__title").text().trim() || "Akademisyen";

    if (name.length > 5) {
      staff.push({ name, title });
    }
  });

  if (staff.length === 0) {
    $(".personel-adi, h3, h4").each((_, el) => {
      const name = $(el).text().trim();
      if (name.length > 5) {
        staff.push({ name, title: "Akademisyen" });
      }
    });
  }

  return Response.json({
    type: "staff",
    university,
    department: dept,
    source: url,
    total: staff.length,
    staff,
  });
}
function isRealName(text) {
  if (!text) return false;
  if (text.length < 6) return false;

  // Menü ve alakasız kelimeleri engelle
  const banned = [
    "English",
    "İletişim",
    "Ara",
    "Anasayfa",
    "Hakkımızda",
    "Detaylı",
    "Çalışanlar",
    "Araştırma",
  ];

  for (let word of banned) {
    if (text.includes(word)) return false;
  }

  // En az iki kelime olmalı
  if (!text.includes(" ")) return false;

  // Büyük harfle başlamalı
  return /^[A-ZÇĞİÖŞÜ]/.test(text);
}
