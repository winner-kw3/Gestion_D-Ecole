const db = require('../config/dbConfig');

const findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};


const findAll = async () => {
  const [rows] = await db.query('SELECT id, email, role FROM users');
  return rows;
};


const create = async (email, hashedPassword) => {
  const [result] = await db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword]
  );
  return { id: result.insertId, email };
};

const deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  findByEmail,
  findAll,
  create,
  deleteUser,
};
