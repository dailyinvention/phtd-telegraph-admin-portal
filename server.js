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
app.use(express.static(path.join(__dirname, 'site')))

app.get('/*', (req, res, next) => {
  res.setHeader('Last-Modified', (new Date()).toUTCString())
  next()
})

// When posting new messages store in database
app.post('/change-messages', jsonParser, (request, response) => {
  let messages = request.body.messages
  console.log('Messages: ' + JSON.stringify(messages))
  dbResponse = queryDB('change-messages', { 'messages': messages }, (dbResponse) => {
    console.log(JSON.stringify(dbResponse))
    response.type('json')
    response.json(dbResponse)
  })
})

app.put('/update-message-value', jsonParser, (request, response) => {
  let message = request.body.message
  let timestamp = request.body.timestamp
  let order = request.body.order
  let isNew = (request.body.isNew) ? request.body.isNew : null
  dbResponse = queryDB('update-message-value', { 'message': message, 'timestamp': timestamp, 'order': order, 'isNew': isNew }, (dbResponse) => {
    console.log('dbResponse: ' + JSON.stringify(dbResponse))
    response.type('json')
    response.json(dbResponse)
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
  let order = request.body.order
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
      case 'change-messages':
        collection = db.collection('messages')
        collection.remove({}, (err, result) => {
          if (result) {
            for (var i = 0; i < obj.messages.length; i++) {
              collection.insert(obj.messages[i])
              if (i === obj.messages.length - 1) {
                callback({'message': 'complete'})
                db.close()
              }
            }
          }
          if (err) {
            console.log(err)
            callback(err)
          }
        })      
        break
      case 'update-message-value':
        collection = db.collection('messages')
        collection.update(
          { 'timestamp': obj.timestamp },
          { 'message': obj.message,
            'timestamp': obj.timestamp,
            'order': obj.order,
            'isNew': (obj.isNew) ? obj.isNew : null
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
            'value': parseInt(obj.value),
            'order': parseInt(obj.order)
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
  collection.find().sort({'order': 1}).toArray(function (err, items) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(items)
    }
  })
}
