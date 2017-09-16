const express = require('express')
const app = express()

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/site/index.html')
})