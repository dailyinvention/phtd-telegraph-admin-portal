const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/phtd'
const jsonParser = bodyParser.json()

let dbResponse

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/site/index.html')
})

app.post('/new-message', jsonParser, (request, response) => {
  let message = JSON.parse(request.body).message
  let timestamp = Date.now()
  dbResponse = queryDB('new-message', { 'message': message, 'timestamp': timestamp })
  response.send(dbResponse)
})

app.get('/get-messages', jsonParser, (request, response) => {
  dbResponse = queryDB('get-message', null)
  response.send(dbResponse)
})

let queryDB = (request, obj) => {
  let response
  MongoClient.connect(url, (err, db) => {
    let collection
    switch (request) {
      case 'new-message':
        collection = db.collection('messages')
        collection.insert(obj)
        response = 'Message successfully stored.'
        break
      case 'get-messages':
        collection = db.collection('messages')
        response = collection.find()
        break
    }
    db.close()
  })
  return response
}