// models/EducationModel.js
const db = require('./index');

const EducationModel = {
    async getEducations() {
        const [rows] = await db.query('SELECT * FROM education');
        return rows;
    }
};
module.exports = EducationModel;
