module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    technologies: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    budget: {
      type: DataTypes.STRING
    },
    contactEmail: {
      type: DataTypes.STRING
    }
  });
  return Job;
};
