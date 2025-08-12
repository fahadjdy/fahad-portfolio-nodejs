// models/UserModel.js
const db = require('./index');

const UserModel = {
  async getAll(page, limit) {
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
    const offset = (pageNum - 1) * limitNum;

    // Get data
    const [users] = await db.query('SELECT * FROM users LIMIT ? OFFSET ?', [limitNum, offset]);

    // Get total count
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM users');

    const totalPages = Math.ceil(total / limitNum);

    return {
      data: users,
      total,
      currentPage: pageNum,
      totalPages,
      nextPage: pageNum < totalPages ? pageNum + 1 : null,
      prevPage: pageNum > 1 ? pageNum - 1 : null,
    };
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  },

 async findOne(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async create({  email, password }) {
    const [result] = await db.query(
      'INSERT INTO users ( email, password) VALUES (?, ?)',
      [ email, password]
    );
    return result.insertId;
  },

  async updateById (id, data) {
    const [result] = await db.query(
      `UPDATE users SET  email = ?, password = ? WHERE id = ?`,
      [data.email, data.password, id]
    );
    return result;
  },

  async deleteById(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }

};

module.exports = UserModel;
