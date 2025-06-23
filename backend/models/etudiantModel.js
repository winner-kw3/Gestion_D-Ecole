const db = require('../config/dbConfig');

const findAll = async () => {
  const [rows] = await db.query('SELECT * FROM etudiants');
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM etudiants WHERE id = ?', [id]);
  return rows[0];
};

const create = async (etudiantData) => {
  const { nom, prenom, email, age } = etudiantData;
  const [result] = await db.query(
    'INSERT INTO etudiants (nom, prenom, email, age) VALUES (?, ?, ?, ?)',
    [nom, prenom, email, age]
  );
  return { id: result.insertId, nom, prenom, email, age };
};

const update = async (id, etudiantData) => {
  const { nom, prenom, email, age } = etudiantData;
  await db.query(
    'UPDATE etudiants SET nom = ?, prenom = ?, email = ?, age = ? WHERE id = ?',
    [nom, prenom, email, age, id]
  );
  return findById(id);
};

const deleteEtudiant = async (id) => {
  const [result] = await db.query('DELETE FROM etudiants WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteEtudiant,
};
