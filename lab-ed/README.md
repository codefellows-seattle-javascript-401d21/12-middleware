# Lab 12: Single Resource Express API

This app is an Express API that will respond to a GET, POST, DELETE, or PUT request.

To install the app clone the git repository. To run the app using nodemon type: 'nodemon server.js' on the terminal commmand line.
The dependencies are:
bluebird
body-parser
express
uuid

The developer dependecies are: debug and dotenv To install: NPM i -D 'dependency name'. To get debug messages use: npm run start:debug

Use Postman or httpie to make a request.

Below are sample requests and responses using httpie:

http POST http://localhost:3000/api/v1/note title=bar content=foo

    "_id": "804669d5-b938-4cdd-bf35-90acf8190a2e",
    "content": "foo",
    "title": "bar"

http GET http://localhost:3000/api/v1/note/804669d5-b938-4cdd-bf35-90acf8190a2e

"_id": "804669d5-b938-4cdd-bf35-90acf8190a2e",
    "content": "foo",
    "title": "bar"

http GET http://localhost:3000/api/v1/note

    "1779e90e-1156-4241-8ba4-1bc3338002f5",
    "eec9b9b6-89cb-4a8e-ae6c-8c5f401e29f8"

http DELETE http://localhost:3000/api/v1/note/1779e90e-1156-4241-8ba4-1bc3338002f5


Colloaorator(s):