# 12 Express Middleware
This app has the ability to create, read, update, and delete (CRUD) notes by a user with the assitance of Express.js. 

---
## Intalling and Getting Started
To use this app, for and git clone this repository to your local computer. Navigate to the `lab-melanie` directory and enter `npm install` in your command line, this will install all necessary dependencies.

Either use the Postman app or Httpie to have the ability to create and modify notes. The following examples will be demonstrated with Httpie.

#### Create a Note
In your terminal type:
```
http POST http://localhost:3000/api/v1/note title=<your title> content=<your content>
```
Be sure to use single quotes if the title or content contain more than one word.

If your filepath is incorrect, you will recieve an error message, otherwise you will see a status code of 201.

#### Get a Note (or all notes)
To get a specific note, type in your command line:
```
http GET http://localhost:3000/api/v1/note/<note id>
```

To get all notes:
```
http GET http://localhost:3000/api/v1/note
```

This will return a list of all note ids.

#### Update a Note
In your command line, type:
```
http PUT http://localhost:3000/api/v1/note/<note id> title=<new title> content=<new content>
```
Just as creating a note, be sure to use single quotes if the title and content are longer than one word.

#### Delete a Note
In your command line, type:
```
http DELETE http://localhost:3000/api/v1/note/<note id>
```

---

## Data Structures

### Storage Module
This contains five methods:
* `create` - adds a note to storage
* `fetchOne` - reads a specific note from storage
* `fetchAll` - reads all notes of a schema from storage
* `update` - updates a specific note in storage
* `delete` - removes a note from storage

### Route-Note Module
This contains five methods that routes requests and responses from storage:
* `router.post` - sends info from the http request to storage to create a note and sends a response back to the viewer
* `router.get` - this has two methods, one that uses a specific id of a note to read the file and send the response back to the viewer, the other only needs the schema (in this case `note`) and returns the response from storage as a list of note ids
* `router.put` - takes info from the http request and updates a note in storage, then sends a response back to the viewer
* `router.delete` - takes in the http request with a specific note id, sends it to storage to `unlink` the file, then sends a status message back to the viewer

---

## Tests
The test directory is separated into three subdirectories: 

`integration-note` contains files to test each http method, `POST`, `GET`, `PUT`, `DELETE`.

`lib` contains the jest port configuration

`unit-tests` contains files to test modules that the router and server rely on for requests and responses including:

 * `storage` - contains create, fetchOne, fetchAll, update, and delete
 * `note` - builds a note promise
 * `error-handler` - customizes error messages and returns the corresponding response