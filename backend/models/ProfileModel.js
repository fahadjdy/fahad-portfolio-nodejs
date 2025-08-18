// models/ProfileModel.js
const db = require('./index');

// Only these fields will be allowed for update
const allowedFields = [
  "full_name", "about", "tagline", "dob", "age", "gender","address", "nationality",
  "email", "phone", "website", "location_city", "location_country", "image" , "favicon" , "logo"
];


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
        const filteredData = {};
        for (const field of allowedFields) {
            if (profileData[field] !== undefined) {
                filteredData[field] = profileData[field];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            throw new Error('No valid fields provided for update');
        }

        const [result] = await db.query('UPDATE profile SET ? WHERE id = ?', [filteredData, id]);
        if (result.affectedRows === 0) {
            throw new Error('Profile not found');
        }

        return this.getProfileById(id);
    }
};

module.exports = ProfileModel;
