//We need moment for displayig time of post
//var moment = require("moment");

$(document).ready(function() {
  // Testimonial Container holds all of our testimonials
  var testimonialContainer = $(".testimonial-container");
  //var postCategorySelect = $("#category");

  var targetForm = $("#tmForm");
  var fromDataTestimonial; //used for getting our return data from the db
  // Click events for the edit button
  //$(document).on("click", "button.edit", handlePostEdit);

  //Listen for the submit button on our testimonial form
  targetForm.on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var tName = $("#tmName")
      .val()
      .trim();

    var tTitle = $("#tmTitle")
      .val()
      .trim();

    var tBody = $("#tmBody")
      .val()
      .trim();

    console.log("Tesimonial name is: " + tName);

    var newTestimonial = {
      title: tTitle,
      tBody: tBody,
      user: tName
    };

    $.ajax("/api/testimonial", {
      type: "POST",
      data: newTestimonial
    }).then(function(data) {
      console.log("created new testimonial");

      console.log("testimonial data", data);

      fromDataTestimonial = data;
      //If the data is empty then call displayEmpty to show message
      //Else render the testimonial and hide the form
      if (!fromDataTestimonial.id) {
        //old check: || !fromDataTestimonial.length) {
        displayEmpty();
      } else {
        testimonialContainer.empty();
        var finalTestimonial = createNewRow(fromDataTestimonial);
        $("#tmForm").hide();
        testimonialContainer.append(finalTestimonial);

        //initializeRows(fromDataTestimonial);
      }

      // Reload the page to get the updated list
      //location.reload();
    });
  });

  //postCategorySelect.on("change", handleCategoryChange);
  //var posts;

  // This function grabs testimonial from the database and updates the view
  // function getPosts(category) {
  //   var categoryString = category || "";
  //   if (categoryString) {
  //     categoryString = "/category/" + categoryString;
  //   }
  //   $.get("/api/posts" + categoryString, function(data) {
  //     console.log("Posts", data);
  //     posts = data;
  //     if (!posts || !posts.length) {
  //       displayEmpty();
  //     } else {
  //       initializeRows();
  //     }
  //   });
  // }

  // Getting the initial list of posts
  //getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // testimonialContainer
  // function initializeRows() {
  //   testimonialContainer.empty();
  //   var testimonialToAdd = [];
  //   for (var i = 0; i < fromDataTestimonial.length; i++) {
  //     testimonialToAdd.push(createNewRow(fromDataTestimonial[i]));
  //   }
  //   testimonialContainer.append(testimonialToAdd);
  // }

  // This function constructs a post's HTML
  function createNewRow(data) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");

    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");

    var newPostTitle = $("<h5>");
    //var newPostDate = $("<small>");

    var newPostName = $("<h5>");
    newPostName.text("Name: " + data.user);
    newPostName.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px"
    });

    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");

    var newPostBody = $("<p>");

    newPostTitle.text(
      "Your testimonial about '" + data.title + "' was created successfully."
    );
    newPostBody.text(data.tBody);

    //moment npm needs linking
    //var formattedDate = new Date(post.createdAt);
    //formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //newPostDate.text(formattedDate);
    //newPostTitle.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostName);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", data);
    return newPostCard;
  }

  // Appropriate url
  // function handlePostEdit() {
  //   var currentPost = $(this)
  //     .parent()
  //     .parent()
  //     .data("post");
  //   window.location.href = "/cms?post_id=" + currentPost.id;
  // }

  // This function displays a message when there are no posts
  function displayEmpty() {
    testimonialContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No one has posted a testimonial on this category as yet, feel free to navigate to another category or navigate to <a href='/testimonialform'>here</a> in order to create a new post."
    );
    testimonialContainer.append(messageH2);
  }
});
