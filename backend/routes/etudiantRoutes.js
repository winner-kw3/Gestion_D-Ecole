const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const authMiddleware = require('../middlewares/authMiddleware'); // exemple si besoin d’auth

router.get('/', authMiddleware, etudiantController.getAllEtudiants);
router.get('/:id', authMiddleware, etudiantController.getEtudiantById);
router.post('/', authMiddleware, etudiantController.createEtudiant);
router.put('/:id', authMiddleware, etudiantController.updateEtudiant);
router.delete('/:id', authMiddleware, etudiantController.deleteEtudiant);

module.exports = router;
