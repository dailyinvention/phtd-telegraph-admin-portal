const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
const jsonParser = bodyParser.json()

const url = 'mongodb://localhost:27017/phtd'
let dbResponse


// Create listener on port 3000
app.listen(3000, () => {
  console.log('listening on 3000')
})

// At site root, load management page
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/site/index.html')
})

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res, next) => {
  res.setHeader('Last-Modified', (new Date()).toUTCString())
  next()
})

// When posting new messages store in database
app.post('/new-message', jsonParser, (request, response) => {
  let message = JSON.parse(request.body).message
  let timestamp = Date.now()
  dbResponse = queryDB('/new-message', { 'message': message, 'timestamp': timestamp }, () => {
    response.send(dbResponse)
  })
})

// Get all messages from database
app.get('/get-controls', jsonParser, (request, response) => {
  queryDB('get-controls', null, (dbResponse) => {
    console.log('dbResponse: ' + dbResponse)
    response.type('json')
    response.json(dbResponse)
  })
})

// Updates control value
app.put('/update-control-value', jsonParser, (request, response) => {
  console.log(request.body)
  let type = request.body.type
  let label = request.body.label
  let name = request.body.name
  let value = request.body.value
  let order = request.body.value
  queryDB('update-control-value', { 'type': type, 'label': label, 'name': name, 'value': value, 'order': order }, (dbResponse) => {
    console.log('dbResponse: ' + dbResponse)
    response.type('json')
    response.json(dbResponse)
  })
})

// Funtion to handle query actions liking getting messages or posting messages.
let queryDB = (request, obj, callback) => {
  let response
  MongoClient.connect(url, (err, db) => {
    let collection
    switch (request) {
      case 'new-message':
        collection = db.collection('messages')
        collection.insert(obj)
        response = 'Message successfully stored.'
        db.close()
        break
      case 'get-controls':
        let controlResponse = {}
        loadItems(db.collection('controls'), (controlsItems) => {
          controlResponse.controls = controlsItems
          loadItems(db.collection('messages'), (messagesItems) => {
            controlResponse.messages = messagesItems
            callback(controlResponse)
            db.close()
          })
        })
        break
      case 'update-control-value':
        collection = db.collection('controls')
        collection.update(
          { 'name': obj.name },
          { 'type': obj.type,
            'label': obj.label,
            'name': obj.name,
            'value': obj.value,
            'order': obj.order
         },
          (err, result) => {
            if (result) {
              callback(result)
            }
            if (err) {
              callback(err)
            }
            db.close()
          }
        )
        break
    }
  })
}

let loadItems = (collection, callback) => {
  collection.find().toArray(function (err, items) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(items)
    }
  })
}
