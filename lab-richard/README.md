<h1>Code: 12 Express</h1>

<h2>API Routes and Methods</h2>
<strong>POST: "/api/v1/note"</strong> 
Requires title and content to construct a new note to be stored using the storage module.
It creates the note, sends a 201 status, and then writes the json to the directory.

router.post('/note', bodyParser, (request, response) => {
    debug('#router.post create');
    new Note(request.body.title, request.body.content)
        .then(note => storage.create('note', note))
        .then(item => response.status(201).json(item))
        .catch(err => errorHandler(err, response));

storage.create = function(schema, item) {
    debug('#storage.create Create');
    let json = JSON.stringify(item);
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
        .then(() => item);
<HR>
<strong>GET: "/api/v1/note/:_id"</strong>
Requires the ID to fetch a note, then reads the buffer as a string, sends a 200 status, and returns that file.

router.get('/note:_id', (request, response) => {
    debug('#router.get fetchOne');
    storage.fetchOne('note', request.params._id)
        .then(buffer => buffer.toString())
        .then(note => response.status(200).json(note))
        .catch(err => errorHandler(err, response));

storage.fetchOne = (schema, itemId) => {
    debug('#storage.fetchOne Just one');
    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
<HR>
<strong>GET: "/api/v1/note"</strong>
Fetches all notes,, reads buffer as a string, sends 200 status, and returns all schema.

router.get('/note', (request, response) => {
    debug('#router.get fetchAll');
    storage.fetchAll('note')
        .then(buffer => buffer.toString())
        .then(json => JSON.parse(json))
        .then(note => response.status(200).json(note))
        .catch(err => errorHandler(err, response));

storage.fetchAll = (schema) => {
    debug('#storage.fetchAll ALL');
    return fs.readFileProm(`${__dirname}/../data/${schema}.json`)
        .then(dir => dir.map(file => file.split('.')[0]));
<HR>
<strong>PUT: "/api/v1/note/:_id"</strong>
Takes in title and content to create a new note, it then finds that ID and updates that file, sends a 204 status,
stringifies the data into JSON, and writes the file to the directory.


router.put('/note:_id', (request, response) => {
    debug('#router.put Update');
    new Note(request.body.title, request.body.content)
        .then(item => {
            item._id = request.body._id;
            return item;
        })
        .then(updated => storage.update('note', request.params._id, updated))
        .then(() => response.status(204).send())
        .catch(err => errorHandler(err, response));

storage.update = (schema, itemId, item) => {
    debug('#storage.update Update');
    if(item._id !== itemId) return Promise.reject(new Error('Validation Error: Cannot update file with unmatched ID'));
    let json = JSON.stringify(item);
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json)
        .then(() => item);
<HR>
<strong>DELETE: "/api/v1/note/:_id"</strong>
Uses ID to remove file from directory, sends a 204 status.

router.delete('/note:_id', (request, response) => {
    debug('#router.delete Delete');
    storage.delete('note', request.params._id)
        .then(() => response.status(204).send())
        .catch(err => errorHandler(err, response));

storage.delete = (schema, itemId) => {
    debug('#storage.delete Seek and Destroy');
    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);