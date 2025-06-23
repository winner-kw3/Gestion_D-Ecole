const etudiantService = require('../services/etudiantService');

// Récupérer tous les étudiants
const getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await etudiantService.getAllEtudiants();
    res.json(etudiants);
  } catch (error) {
    console.error('Erreur getAllEtudiants:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer un étudiant par ID
const getEtudiantById = async (req, res) => {
  try {
    const id = req.params.id;
    const etudiant = await etudiantService.getEtudiantById(id);

    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    res.json(etudiant);
  } catch (error) {
    console.error('Erreur getEtudiantById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un nouvel étudiant
const createEtudiant = async (req, res) => {
  try {
    const etudiantData = req.body;
    const newEtudiant = await etudiantService.createEtudiant(etudiantData);
    res.status(201).json(newEtudiant);
  } catch (error) {
    console.error('Erreur createEtudiant:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour un étudiant existant
const updateEtudiant = async (req, res) => {
  try {
    const id = req.params.id;
    const etudiantData = req.body;
    const updatedEtudiant = await etudiantService.updateEtudiant(id, etudiantData);

    if (!updatedEtudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    res.json(updatedEtudiant);
  } catch (error) {
    console.error('Erreur updateEtudiant:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un étudiant
const deleteEtudiant = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await etudiantService.deleteEtudiant(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    res.json({ message: 'Étudiant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteEtudiant:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
};
