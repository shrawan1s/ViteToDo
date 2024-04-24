const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})