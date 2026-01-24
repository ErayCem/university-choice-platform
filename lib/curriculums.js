/**
 * MOCK CURRICULUM DATA
 * -------------------
 * Bu dosya geçici olarak DB yerine kullanılır.
 * Gerçek DB’ye geçildiğinde sadece bu dosyanın içi değişecek.
 *
 * ÖNEMLİ:
 * - Müfredat = universityId + departmentId
 * - ODTÜ fallback YOK
 * - Default bölüm YOK
 */

export const curriculums = {
  bogazici: {
    "computer-engineering": [
      {
        code: "CMPE150",
        name: "Introduction to Computing",
      },
      {
        code: "CMPE230",
        name: "Systems Programming",
      },
      {
        code: "CMPE250",
        name: "Data Structures and Algorithms",
      },
    ],

    "electrical-engineering": [
      {
        code: "EE201",
        name: "Circuit Theory",
      },
      {
        code: "EE202",
        name: "Electronics",
      },
    ],
  },

  odtu: {
    "computer-engineering": [
      {
        code: "CENG111",
        name: "Introduction to Computer Engineering",
      },
      {
        code: "CENG140",
        name: "C Programming",
      },
    ],

    "electrical-engineering": [
      {
        code: "EEE201",
        name: "Circuit Theory",
      },
      {
        code: "EEE202",
        name: "Electronics",
      },
    ],
  },
};

/**
 * DB gibi davranan fonksiyon
 * -------------------------
 * @param {string} universityId
 * @param {string} departmentId
 * @returns {Array|null}
 */
export function getCurriculumFromDB(universityId, departmentId) {
  return curriculums?.[universityId]?.[departmentId] || null;
}
