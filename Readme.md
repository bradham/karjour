# Karjour

![Karjour App](https://github.com/bradham/Project2/blob/master/public/images/karjour.JPG)

## Description
Karjour is a job search database geared towards job seekers that have just completed a coding bootcamp. Not only will job seekers be able to see available jobs located near them, they will also be able to use the website for inspiration, encouragement and positive advice for those on their job hunting journey.

## Motivation
Karjour our full-stack web application makes the connection between the job seeker and the employer through job postings. Designed and build using the MVC paradigm and a server-side API, Karjour not only addresses the need to see available positions but uses an enchanced feature of including emotional support that job seekers utilize as they face rejection or feelings of inadequacy.Through testing, continuous integration and the use of linting tools our group has successfully build a full-stack web application to confront this need within the coding community.

## Results
Our group has designed, build and deployed a full-stack web application to Heroku. We have implemented unit tests through linting and continuous integration of Travis CI.

## Team Efforts
Lisa Smithen has done the frontend design work and database management. Brad Ham has done project management, testing, code review and Heroku deployment. Anissa Bartley constructed the database, assisted with testing and implementation of Sequelize.

## Installation
If you are cloning/downloading the Heroku repo, please be sure to use the
package manager [NPM](https://www.npmjs.com/) to install the needed packages for the project to run through node and express:

NPM dependencies:
    "ajax": "0.0.4",
    "async": "^3.1.0",
    "babel-eslint": "^10.0.3",
    "csv": "^5.1.3",
    "dotenv": "^8.0.0",
    "express": "^4.17.0",
    "express-handlebars": "^3.1.0",
    "moment": "^2.24.0",
    "mysql2": "^1.6.5",
    "sequelize": "^5.8.6"
This can be done by running the code below for each dependency.
npm install [program]

## How To Run The Program
The application is hosted through Heroku and is available through the link below.
https://karjour.herokuapp.com/

## Improvements
We would like to use passport js to authenticate users.

## Project Technical Specifications
Karjour employed Node and the Express Web Server to create a database backed by MySQL. Both GET and POST routes have been used to retrieve and add new data as well as, a .CSV file to import the database into MySQL. Furthermore, Karjour is hosted on Heroku with a jawsdb database.





