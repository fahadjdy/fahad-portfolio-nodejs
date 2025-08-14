// models/HobbiesModel.js
const db = require('./index');

const allowedFields = [
    `id`,
    `name`,
    `description`,
    `order_no`,
    `created_at`,
    `updated_at`
];

const HobbiesModel = {
    async getHobbies() {
        const [rows] = await db.query('SELECT * FROM hobbies ORDER BY order_no ASC, name ASC');
        return rows;
    },

    async getHobbyById(id) {
        const [rows] = await db.query('SELECT * FROM hobbies WHERE id = ?', [id]);
        return rows[0];
    },

    async addHobby(hobbyData) {
        const [result] = await db.query('INSERT INTO hobbies SET ?', [hobbyData]);
        return this.getHobbyById(result.insertId);
    },

    async updateHobby(id, hobbyData) {
        const filteredData = {};
        for (const field of allowedFields) {
            if (hobbyData[field] !== undefined) {
                filteredData[field] = hobbyData[field];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            throw new Error('No valid fields provided for update');
        }

        const [result] = await db.query('UPDATE hobbies SET ? WHERE id = ?', [filteredData, id]);
        if (result.affectedRows === 0) {
            throw new Error('Hobby not found');
        }

        return this.getHobbyById(id);
    },

    async deleteHobby(id) {
        const [result] = await db.query('DELETE FROM hobbies WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error('Hobby not found');
        }
        return result;
    }
};

module.exports = HobbiesModel;
