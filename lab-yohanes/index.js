'use strict';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const server = require('./lib/server');
server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));

// const server = require('./lib/server');
// server.start(3000, () => console.log(`Listening on 4000`));


//brew install httpie
//npm i bluebird, express, jest, body-parser, uuid, file-system, eslint
//launch nodemon
//npm i -D dotenv

//TEST FOR POST: http POST http://localhost:4000/api/v1/note content="hello" title="modasuka"
//TEST FOR GET: 