'use strict'

const uuid = require('uuid/v4')

module.exports = function Note(title, content) { //body  title and body content wwe will be using in other files.
  return new Promise((resolve, reject) => {
    if(!title || !content) return new reject(new Error('Validation Error. Cannot create note. Title and Content required.'))
    this._id = uuid()
    this.title = title
    this.content = content

    return resolve(this)
  })
}