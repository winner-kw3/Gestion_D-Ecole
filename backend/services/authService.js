const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const JWT_EXPIRES_IN = '1h';

// Inscription d’un nouvel utilisateur
const register = async (email, password) => {
  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    return null; // Utilisateur déjà existant
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer l'utilisateur dans la DB
  const newUser = await userModel.create(email, hashedPassword);
  return newUser;
};

// Connexion (login)
const login = async (email, password) => {
  const user = await userModel.findByEmail(email);
  if (!user) {
    return null;
  }

  // Vérifier le mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  // Générer un token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return token;
};

const getMe = async (email) => {
  const user = await userModel.findByEmail(email);
  if (!user) return null;
  // On ne retourne pas le mot de passe !
  return { id: user.id, email: user.email, role: user.role };
};

const getAllUsers = async () => {
  const users = await userModel.findAll();
  return users.map(user => ({ id: user.id, email: user.email, role: user.role }));
};

const deleteUser = async (id) => {
  const result = await userModel.deleteUser(id);
  return result;
};

module.exports = {
  register,
  login,
  getMe,
  getAllUsers,
  deleteUser,
};



