const { db, admin } = require("../../config/firebase.config.js");
const { FieldValue } = admin.firestore;

// Menambah satu atau lebih company baru
const addCompanies = async (companies) => {
  if (!Array.isArray(companies) || companies.length === 0) {
    const err = new Error("Request must contain an array of companies");
    err.status = 400;
    throw err;
  }

  const companyRef = db.collection("companies");
  const promises = companies.map(async (company) => {
    const { companyName, city, aboutCompany, website, industry, email, phone } = company;
    if (!companyName || !city || !aboutCompany) {
      throw new Error("Missing required fields in one of the companies");
    }

    const companyData = {
      companyName,
      companyNameLowercase: companyName.toLowerCase(),
      city,
      aboutCompany,
      activeJobCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      ...(website && { website }),
      ...(industry && { industry }),
      ...(email && { email }),
      ...(phone && { phone }),
    };
    return companyRef.add(companyData);
  });
  await Promise.all(promises);
};

// Mendapatkan semua company atau memfilternya
const getCompanies = async (queryParams) => {
  const { city, minActiveJobCount } = queryParams;
  let query = db.collection("companies");

  if (city) {
    query = query.where("city", "==", city);
  }
  if (minActiveJobCount) {
    query = query.where("activeJobCount", ">=", Number(minActiveJobCount));
  }
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Mendapatkan detail satu company
const getCompanyById = async (companyId) => {
  const companyRef = db.collection("companies").doc(companyId);
  const companyDoc = await companyRef.get();
  if (!companyDoc.exists) {
    const err = new Error("Company not found");
    err.status = 404;
    throw err;
  }
  return { id: companyDoc.id, ...companyDoc.data() };
};

// Update satu company
const updateCompany = async (companyId, updates) => {
  if (!updates || Object.keys(updates).length === 0) {
    const err = new Error("No data provided to update");
    err.status = 400;
    throw err;
  }
  const companyRef = db.collection("companies").doc(companyId);
  await getCompanyById(companyId); // Memanfaatkan pengecekan apakah company ada
  return companyRef.update(updates);
};

// Hapus satu company
const deleteCompany = async (companyId) => {
  const companyRef = db.collection("companies").doc(companyId);
  await getCompanyById(companyId); // Memanfaatkan pengecekan apakah company ada
  return companyRef.delete();
};

// Update jumlah pekerjaan aktif untuk semua company
const updateActiveJobCount = async () => {
  const companyRef = db.collection("companies");
  const jobRef = db.collection("jobs");
  const companySnapshot = await companyRef.get();
  const batch = db.batch();

  for (const doc of companySnapshot.docs) {
    const companyData = doc.data();
    const jobsSnapshot = await jobRef
      .where("companyName", "==", companyData.companyName)
      .where("isActive", "==", true)
      .get();
    batch.update(companyRef.doc(doc.id), { activeJobCount: jobsSnapshot.size });
  }
  await batch.commit();
  return companySnapshot.size;
};

module.exports = {
  addCompanies,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  updateActiveJobCount,
};