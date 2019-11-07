$(document).ready(function() {
  // jobSearchContainer holds all of our vacancies
  var jobSearchContainer = $(".jobSearch-container");
  var jobCategorySelect = $("#category");
  // Click events for the edit button
  $(document).on("click", "button.edit", handleJobSearch);
  jobCategorySelect.on("change", handleCategoryChange);
  var jobs;

  // This function grabs vacancies from the database and updates the view
  function getJobs(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/jobs" + categoryString, function(data) {
      console.log("Jobs", data);
      jobs = data;
      if (!jobs || !jobs.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // Getting the initial list of job vacancies
  getJobs();
  // InitializeRows handles appending all of our constructed post HTML inside
  // jobSearchContainer
  function initializeRows() {
    jobSearchContainer.empty();
    var jobsToAdd = [];
    for (var i = 0; i < jobs.length; i++) {
      jobsToAdd.push(createNewRow(jobs[i]));
    }
    jobsContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCategory = $("<h5>");
    newPostCategory.text(post.category);
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function displays a message when there are no jobs within that category
  function displayEmpty() {
    jobPostsContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "Unfortunately we do not have any job posts under this category at the moment. Please try another category or check back with us sometime soon."
    );
    jobSearchContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newJobCategory = $(this).val();
    getJobs(newJobCategory);
  }
});
