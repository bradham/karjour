module.exports = function(sequelize, DataTypes) {
  var Testimonial = sequelize.define("Testimonial", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    tBody: DataTypes.TEXT,
    user: DataTypes.STRING
  });
  return Testimonial;
};
