//Switch to load test data into database
var iWantData = false;

require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  //Load our database with seed data
  if (iWantData) {
    loadData(db.Job, "test/job_seeds.csv");
    loadData(db.Testimonial, "test/testimonial_seeds.csv");
  }

  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

function loadData(model, filename) {
  //Code by Evan Siroky via https://stackoverflow.com/questions/29461908/how-to-do-bulk-insert-using-sequelize-and-node-js
  //I utilized the cargo utility of the async library to load in up to 1000 rows at a time.
  //See the following code for loading a csv into a database:

  var fs = require("fs"),
    async = require("async"),
    csv = require("csv");

  var input = fs.createReadStream(filename);
  var parser = csv.parse({
    columns: true,
    relax: true
  });
  var inserter = async.cargo(function(tasks, inserterCallback) {
    model.bulkCreate(tasks).then(function() {
      inserterCallback();
    });
  }, 1000);
  parser.on("readable", function() {
    while ((line = parser.read())) {
      inserter.push(line);
    }
  });
  //Removed count from argument in parser.on callback. It was unused
  parser.on("end", function() {
    inserter.drain = function() {
      doneLoadingCallback();
    };
  });
  input.pipe(parser);
}

module.exports = app;
