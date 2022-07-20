const express = require('express')
const app = express()
const router = express.Router()
var cors = require('cors')
app.use(cors())
app.use(express.json())
const port = 9000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const api = require('./router')
// app.use('/api', api)

app.get('/', (req, res) => {
  res.json({ status: 200 })
})
