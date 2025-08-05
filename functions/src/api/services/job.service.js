const { db, admin } = require("../../config/firebase.config.js");
const { FieldValue } = admin.firestore;
const { cleanDescription } = require("../../utils/stringUtils.js"); // Kita akan buat file ini nanti

// Menambah satu atau lebih job baru
const addJobs = async (jobs) => {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    const err = new Error("Request must contain an array of jobs");
    err.status = 400;
    throw err;
  }

  const jobRef = db.collection("jobs");
  const companyRef = db.collection("companies");

  const jobPromises = jobs.map(async (job) => {
    const {
      jobTitle,
      jobDescription,
      companyId,
      category,
      jobType,
      skillsRequired,
      salaryMin,
      salaryMax,
      salaryCurrency,
      isActive,
    } = job;

    if (!jobTitle || !jobDescription || !companyId || !category || !jobType || !skillsRequired) {
      throw new Error("Missing required fields (jobTitle, jobDescription, companyId, category, jobType, skillsRequired)");
    }

    const companyDoc = await companyRef.doc(companyId).get();
    if (!companyDoc.exists) {
      throw new Error(`Company with id ${companyId} not found`);
    }
    const companyData = companyDoc.data();

    const jobData = {
      jobTitle,
      jobTitleLowercase: jobTitle.toLowerCase(),
      jobDescription,
      cleanedDescription: cleanDescription(jobDescription),
      companyName: companyData.companyName,
      companyNameLowercase: companyData.companyName.toLowerCase(),
      city: companyData.city,
      aboutCompany: companyData.aboutCompany || "",
      category,
      jobType,
      skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : [],
      salary: {
        min: salaryMin || 0,
        max: salaryMax || 0,
        currency: salaryCurrency || "IDR",
      },
      postedAt: FieldValue.serverTimestamp(),
      isActive: isActive !== undefined ? isActive : true,
    };
    return jobRef.add(jobData);
  });

  await Promise.all(jobPromises);
};

// Mendapatkan semua job dengan filter dan pencarian
const getJobs = async (queryParams) => {
  const {
    jobTitle,
    companyName,
    city,
    jobType,
    category,
    minSalary,
    lastDocId
  } = queryParams;

  let query = db.collection("jobs").where("isActive", "==", true);

  if (city) {
    query = query.where("city", "==", city);
  }
  if (jobType) {
    query = query.where("jobType", "==", jobType);
  }
  if (category) {
    query = query.where("category", "==", category);
  }
  if (minSalary) {
    query = query.where("salary.min", ">=", Number(minSalary));
  }
  
  if (jobTitle) {
    query = query.orderBy("jobTitleLowercase")
                 .startAt(jobTitle.toLowerCase())
                 .endAt(jobTitle.toLowerCase() + '\uf8ff');
  } else if (companyName) {
    query = query.orderBy("companyNameLowercase")
                 .startAt(companyName.toLowerCase())
                 .endAt(companyName.toLowerCase() + '\uf8ff');
  } else {
    query = query.orderBy("postedAt", "desc");
  }

  if (lastDocId) {
    const lastDoc = await db.collection("jobs").doc(lastDocId).get();
    if (lastDoc.exists) {
      query = query.startAfter(lastDoc);
    }
  }

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Mendapatkan 3 job terbaru
const getRecentJobs = async () => {
  const snapshot = await db.collection("jobs")
    .where("isActive", "==", true)
    .orderBy("postedAt", "desc")
    .limit(3)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Mendapatkan detail satu job
const getJobById = async (jobId) => {
  const jobDoc = await db.collection("jobs").doc(jobId).get();
  if (!jobDoc.exists) {
    const err = new Error("Job not found");
    err.status = 404;
    throw err;
  }
  return { id: jobDoc.id, ...jobDoc.data() };
};

module.exports = {
  addJobs,
  getJobs,
  getRecentJobs,
  getJobById,
};