// models/ProfileModel.js
const db = require('./index');

const ProfileModel = {
    async getProfile() {
        const [rows] = await db.query('SELECT * FROM profile');
        return rows;
    },
    async getProfileById(id) {
        const [rows] = await db.query('SELECT * FROM profile WHERE id = ?', [id]);
        return rows[0];
    },
    async updateProfile(id, profileData) {
        const [result] = await db.query('UPDATE profile SET ? WHERE id = ?', [profileData, id]);
        if (result.affectedRows === 0) {
            throw new Error('Profile not found');
        }
        return this.getProfileById(id);
    }
};

module.exports = ProfileModel;
