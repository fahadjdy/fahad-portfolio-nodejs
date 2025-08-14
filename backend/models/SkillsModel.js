// models/SkillsModel.js
const db = require('./index');

const allowedFields = [
    `id`,
    `name`,
    `level`,
    `order_no`,
    `created_at`,
    `updated_at`
];

const SkillsModel = {
    async getSkills() {
        const [rows] = await db.query('SELECT * FROM skills ORDER BY order_no ASC, name ASC');
        return rows;
    },

    async getSkillById(id) {
        const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);
        return rows[0];
    },

    async addSkill(skillData) {
        const [result] = await db.query('INSERT INTO skills SET ?', [skillData]);
        return this.getSkillById(result.insertId);
    },

    async updateSkill(id, skillData) {
        const filteredData = {};
        for (const field of allowedFields) {
            if (skillData[field] !== undefined) {
                filteredData[field] = skillData[field];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            throw new Error('No valid fields provided for update');
        }

        const [result] = await db.query('UPDATE skills SET ? WHERE id = ?', [filteredData, id]);
        if (result.affectedRows === 0) {
            throw new Error('Skill not found');
        }

        return this.getSkillById(id);
    },

    async deleteSkill(id) {
        const [result] = await db.query('DELETE FROM skills WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error('Skill not found');
        }
        return result;
    }
};

module.exports = SkillsModel;
