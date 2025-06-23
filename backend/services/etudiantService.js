const etudiantModel = require('../models/etudiantModel');

const getAllEtudiants = async () => {
  return await etudiantModel.findAll();
};

const getEtudiantById = async (id) => {
  return await etudiantModel.findById(id);
};

const createEtudiant = async (etudiantData) => {
  // Ici, tu peux ajouter validations métier (ex : vérif email)
  return await etudiantModel.create(etudiantData);
};

const updateEtudiant = async (id, etudiantData) => {
  const etudiant = await etudiantModel.findById(id);
  if (!etudiant) return null;
  return await etudiantModel.update(id, etudiantData);
};

const deleteEtudiant = async (id) => {
  const etudiant = await etudiantModel.findById(id);
  if (!etudiant) return false;
  return await etudiantModel.delete(id);
};

module.exports = {
  getAllEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
};
