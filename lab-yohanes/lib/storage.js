'use strict';

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

const storage = module.exports = {}
//optional lines demoed in class to use
// const basePath = `${__dirname}/../data`

// let writer = (schema, id, json) => fs.writeFileProm(`${basePath}/${schema}/${id}.json,` json)
// let reader = (schema, id) => fs.readFileProm(`${basePath}/${schema}/${id}.json`)

storage.create = function(schema, item) {

  let json = JSON.stringify(item) //stringify item
  return fs.writeFileProm(`${__dirname}/../data/${schema}/{item._id}.json`, json) //stringify schema memory and item id query
  .then(() => item) //TRY .then(() => item)
  .catch(err => {
    console.error('Error occured in #storage.create', err)
    return err
  })
}

storage.fetchOne = (schema, itemId) => fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)//stringify quiried data

storage.fetchAll = (schema) =>
  fs.readdirProm(`${__dirname}/../data/${schema}`)//fetch all data within schema

storage.update = (schema, itemId, item) => {

  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`) //stringify schema memory and item id query
  .then(() => {
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`) //stringify schema memory and item id query
  })
}

storage.destroy = (schema, itemId) => fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)


//testing for POST works. Paste this into new window wghen nodemon is running : http POST http://localhost:3000/api/v1/note title=new-shit content=fuego
//testing for GET WORKS. http GET http://localhost:3000/api/v1/note/(PASTE IN ID NUMER HERE)
