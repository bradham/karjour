var db = require("../models");
var Sequelize = require("sequelize");
// We are going to bring in the opt object
// so we can use the like operator.
var Op = Sequelize.Op;

module.exports = function(app) {
  app.get("/api/search/:keyword", function(req, res) {
    var term = req.params.keyword;
    // To make lower case.
    term = term.toLowerCase();
    console.log("term is: " + term);

    // This is saying "anything" search term "anything".(As long as the serch term is there it will pick it up)
    //This findAll will give us a promise back.
    //jobs will be the records we get back from the database.
    db.Job.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })

      .then(function(jobs) {
        console.log("Job records from db: " + JSON.stringify(jobs));
        //return the jobs
        res.render("jobsearch", { jobs });
      })
      .catch(err => console.log(err));
  });

  app.post("/api/jobs", function(req, res) {
    console.log("Technology in post: " + req.body.technologies);
    // var data = {
    //   title: req.body.title,
    //   tBody: req.body.tBody,
    //   user: req.body.user
    // };
    db.Job.create(req.body).then(function(dbJob) {
      res.json(dbJob);
    });
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new testimonial
  app.post("/api/testimonial", function(req, res) {
    console.log("Name in post: " + req.body.user);
    // var data = {
    //   title: req.body.title,
    //   tBody: req.body.tBody,
    //   user: req.body.user
    // };
    db.Testimonial.create(req.body).then(function(dbTestimonial) {
      res.json(dbTestimonial);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
