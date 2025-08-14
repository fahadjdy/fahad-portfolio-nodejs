// models/ExperienceModel.js
const db = require('./index');

const allowedFields = [`id`,`title`, `company`, `location`, `from_date`, `to_date`, `is_current`, `description`, `order_no`, `created_at`, `updated_at`]; 

const ExperienceModel = {
    async getExperience() {
        const [rows] = await db.query('SELECT * FROM experience');
        return rows;
    },

    async getExperienceById(id) {
        const [rows] = await db.query('SELECT * FROM experience WHERE id = ?', [id]);
        return rows[0];
    },
    async updateExperience(id, experienceData) {
        
        const filteredData = {};
        for (const field of allowedFields) {
            if (experienceData[field] !== undefined) {
                filteredData[field] = experienceData[field];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            throw new Error('No valid fields provided for update');
        }

        const [result] = await db.query('UPDATE experience SET ? WHERE id = ?', [filteredData, id]);
        if (result.affectedRows === 0) {
            throw new Error('Experience not found');
        }
        return this.getExperienceById(id);
    },
    async deleteExperience(id) {
        const [result] = await db.query('DELETE FROM experience WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error('Experience not found');
        }
        return result;
    }
};
module.exports = ExperienceModel;
