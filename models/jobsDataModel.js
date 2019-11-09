const Sequelize = require("sequelize");
const db = require("../models/jobs.sql");

const job = db.define("job", {
    title: {
        type: Sequelize.STRING
    },
    technologies: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.STRING
    },
    contact_email: {
        type: Sequelize.STRING
    }
})

module.exports = jobsDataModel.js;

