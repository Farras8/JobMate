const { db, admin } = require("../../config/firebase.config.js");
const { FieldValue } = admin.firestore;

const getGlobalSkills = async (collectionName) => {
  const snapshot = await db.collection(collectionName).get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.id,
    ...doc.data(),
  }));
};

const addGlobalSkills = async (collectionName, skills) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    const error = new Error("Request body must be a non-empty array of skills");
    error.status = 400;
    throw error;
  }

  const collectionRef = db.collection(collectionName);
  const batch = db.batch();
  const addedSkills = [];

  for (const skill of skills) {
    if (!skill.name) {
      const error = new Error("Each skill must have a name");
      error.status = 400;
      throw error;
    }

    const skillRef = collectionRef.doc(skill.name);
    const existingSkill = await skillRef.get();
    if (existingSkill.exists) {
      const error = new Error(`Skill '${skill.name}' already exists`);
      error.status = 409;
      throw error;
    }

    const skillData = { createdAt: FieldValue.serverTimestamp() };
    batch.set(skillRef, skillData);
    addedSkills.push({ id: skill.name, name: skill.name, ...skillData });
  }

  await batch.commit();
  return addedSkills;
};
const getUserSkills = async (uid, collectionName) => {
  const snapshot = await db.collection("users").doc(uid).collection(collectionName).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addUserSkills = async (uid, collectionName, skills) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    const err = new Error("Request body must be a non-empty array of skills");
    err.status = 400;
    throw err;
  }

  const skillsCol = db.collection("users").doc(uid).collection(collectionName);
  const batch = db.batch();
  const addedSkills = [];

  for (const skill of skills) {
    if (!skill.name || !skill.level) {
      const err = new Error("Each skill must have a name and level");
      err.status = 400;
      throw err;
    }
    const existingSkillSnapshot = await skillsCol.where("name", "==", skill.name).get();
    if (!existingSkillSnapshot.empty) {
      const err = new Error(`Skill with name '${skill.name}' already exists`);
      err.status = 409;
      throw err;
    }
    const newSkillRef = skillsCol.doc();
    const skillData = {
      name: skill.name,
      level: skill.level,
      createdAt: FieldValue.serverTimestamp()
    };
    batch.set(newSkillRef, skillData);
    addedSkills.push({ id: newSkillRef.id, ...skillData });
  }

  await batch.commit();
  return addedSkills;
};

const updateUserSkills = async (uid, collectionName, skillsToUpdate) => {
  if (!Array.isArray(skillsToUpdate) || skillsToUpdate.length === 0) {
    const err = new Error("Request body must be a non-empty array of skills to update");
    err.status = 400;
    throw err;
  }
  const skillsCol = db.collection("users").doc(uid).collection(collectionName);
  const batch = db.batch();

  for (const skill of skillsToUpdate) {
    if (!skill.id || !skill.name || !skill.level) {
      const err = new Error("Each skill to update must have an id, name, and level");
      err.status = 400;
      throw err;
    }
    const skillRef = skillsCol.doc(skill.id);
    batch.update(skillRef, {
      name: skill.name,
      level: skill.level,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
};

const deleteUserSkills = async (uid, collectionName, skillIds) => {
  if (!skillIds || !Array.isArray(skillIds) || skillIds.length === 0) {
    const err = new Error("Request body must contain a non-empty array of skill IDs");
    err.status = 400;
    throw err;
  }
  const skillsCol = db.collection("users").doc(uid).collection(collectionName);
  const batch = db.batch();

  skillIds.forEach(id => {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error(`Invalid skill ID: ${id}.`);
    }
    batch.delete(skillsCol.doc(id));
  });

  await batch.commit();
};

module.exports = {
  getGlobalSkills,
  addGlobalSkills,
  getUserSkills,      
  addUserSkills,      
  updateUserSkills,   
  deleteUserSkills
};