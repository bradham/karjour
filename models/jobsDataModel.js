module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    //TODO: COMPANY name short
    // LOCATION SHORT string
    //CULTURE long text
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    technologies: {
      type: DataTypes.TEXT
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
