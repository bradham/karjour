var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    //db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", {
      msg: "Welcome!"
      //examples: dbExamples
    });
    //});
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load testimonials page
  app.get("/testimonial", function(req, res) {
    // This is saying "anything" search term "anything".(As long as the serch term is there it will pick it up)
    //This findAll will give us a promise back.
    //jobs will be the records we get back from the database.
    db.Testimonial.findAll({})

      .then(function(testimonials) {
        console.log(
          "Testimonial records from db: " + JSON.stringify(testimonials)
        );
        //return the Testimonials
        res.render("testimonial", { testimonials });
      })
      .catch(err => console.log(err));

    // db.Example.findAll({}).then(function (dbExamples) {
    //   res.render("testimonial", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // Load resources page
  app.get("/resources", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("resources", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Testimonial Form page
  app.get("/testimonialform", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("testimonialform", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // JobSearch Form page.
  app.get("/jobsearch", function(req, res) {
    db.Example.findAll({}).then(function() {
      var jobs = JSON.parse('[{"text": "Please search above for jobs"}]');
      res.render("jobsearch", { jobs });
    });
  });

  // Employer page
  app.get("/employer", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("employer", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
