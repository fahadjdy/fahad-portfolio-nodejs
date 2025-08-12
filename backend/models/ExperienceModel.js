// models/ExperienceModel.js
const db = require('./index');

const ExperienceModel = {
    async getExperience() {
        const [rows] = await db.query('SELECT * FROM experience');
        return rows;
    }
};
module.exports = ExperienceModel;
