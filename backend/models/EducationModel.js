// models/EducationModel.js
const db = require('./index');

const allowedFields = [
    `id`,
    `school`,
    `degree`,
    `location`,
    `from_date`,
    `to_date`,
    `is_current`,
    `grade`,
    `description`,
    `order_no`,
    `created_at`,
    `updated_at`
];

const EducationModel = {
    async getEducation() {
        const [rows] = await db.query('SELECT * FROM education ORDER BY order_no ASC, from_date DESC');
        return rows;
    },

    async getEducationById(id) {
        const [rows] = await db.query('SELECT * FROM education WHERE id = ?', [id]);
        return rows[0];
    },

    async addEducation(educationData) {
        const [result] = await db.query('INSERT INTO education SET ?', [educationData]);
        return this.getEducationById(result.insertId);
    },
    async updateEducation(id, educationData) {
        const filteredData = {};
        for (const field of allowedFields) {
            if (educationData[field] !== undefined) {
                filteredData[field] = educationData[field];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            throw new Error('No valid fields provided for update');
        }

        const [result] = await db.query('UPDATE education SET ? WHERE id = ?', [filteredData, id]);
        if (result.affectedRows === 0) {
            throw new Error('Education record not found');
        }

        return this.getEducationById(id);
    },

    async deleteEducation(id) {
        const [result] = await db.query('DELETE FROM education WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error('Education record not found');
        }
        return result;
    }
};

module.exports = EducationModel;
