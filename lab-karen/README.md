## Lab 12 - middleware

This project creates a single resource API using the express framework.  It also uses 3rd party middleware and custom middleware.

### Installation
This project requires Node JS.
Run *npm init* to set up program dependancies.
Use *npm i uuid bluebird express body-parser cors* to install dependancies for (in order)
- unique ids
- promisifying library (specifically Node fs)
- express  which is middleware, providing a thin layer of fundamental web application features to create an API
- body-parser which parses incoming request bodies in a middleware before your handlers, in the req.body property
- handling cross origin resource sharing.

Use *npm i -D jest eslist superagent dotenv* to install developer dependancies for (in order)
- linter
- testing
- setting up the environment variables.


## Accessing each method
The CRUD methods can be entered from the CLI using a utility like HTTpie. The format is http CRUD method, the localhost:PORT, the route and the the information be send/updated/deleted from storage.  In these examples, the PORT=4000.

GET request for all the items in the database.  Returns an array of ids.
 GET http://localhost:4000/api/v1/note/

GET request for one record, where "unique-id" is the id of an existing record
 GET http://localhost:4000/api/v1/note/"unique-id"

POST request to create a new record The "unique-id" is generated when a new record is created. An example may look like "90f8dfed-ec8f-4300-84a1-101a304b7c96".
 POST http://localhost:4000/api/v1/note title=test content=case

PUT request to update a record, where "unique-id" is the id of the record to update.
http PUT http://localhost:4000/api/v1/note/"unique-id" title=review content="this test".

DELETE request to delete one record, where "unique-id" is the id of an existing record.
 DELETE http://localhost:4000/api/v1/note/"unique-id"


### Running tests
From the command line, type *npm run test:watch* to start testing.
