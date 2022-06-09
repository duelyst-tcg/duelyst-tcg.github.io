const path = require('path')
const express = require('express')

const app = express()
const port = 3000
const dir = path.join(__dirname, '../cards/')

app.use('/', express.static(dir))

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
