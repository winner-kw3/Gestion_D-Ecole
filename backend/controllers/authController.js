const authService = require('../services/authService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Appel au service métier pour vérifier login
    const token = await authService.login(email, password);
    
    if (!token) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }
    
    // Répond avec le token JWT
    res.json({ token });
  } catch (error) {
    console.error('Erreur dans authController.login:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCreated = await authService.register(email, password);

    if (!userCreated) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur dans authController.register:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.email);
    console.log('Utilisateur trouvé:', user); // Ajouté
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    console.error('Erreur dans getMe:', err); // Ajouté
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Erreur dans getAllUsers:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await authService.deleteUser(id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error('Erreur dans deleteUser:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  login,
  register,
  getMe,
  getAllUsers,
  deleteUser,
};
