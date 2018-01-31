# Lab 12 - Express Middleware

**Author**: Steve Carpenter
**Version**: 1.0.0

## Overview
This is an example usage of the Express JS module as well as a simple
implementation of a quote API to POST, GET, PUT, and DELETE quotes from a file
based database.

## Getting Started
The user needs to do the following to use this Express REST API
-Clone the repository from github [here](https://github.com/stevegcarpenter/12-middleware)
-Install all the necessary `npm` packages by executing `npm install`
-To run the `linter` check execute `npm run lint`
-In order to test all the four HTTP methods (POST, GET, PUT, DELETE), start the nodemon server by executing `nodemon`
-Following this, use a program like [HTTPie](https://httpie.org/) or [Postman](https://www.getpostman.com/) to test calls
-In order to launch the test suite, run `npm run test` on the command line inside the `lab-steve` directory

## HTTP Method Directions
Currently `quote` is the only data category supported using this REST Express API. It contains the following necessary data:
-`quote`: The quote itself
-`author`: The quote's author

The following HTTP routes are supported:
-POST: `/quote` with the `quote` and `author` data fields provided in the body
-GET: Both `/quote` to fetch all quotes and `/quote/:_id` to get a single quote
-PUT: `/quote:_id` with updated `quote` and `author` fields in the body
-DELETE: `/quote/:_id`

## Architecture
-NodeJS
-Express
-npm
-JS
-cors

## Change Log

## Credits and Collaborations
[NodeJS](https://nodejs.org)
[npm](https://www.npmjs.com/)
[JavaScript](https://www.javascript.com/)
[Express](https://expressjs.com/)
[Cors](https://www.npmjs.com/package/cors)
