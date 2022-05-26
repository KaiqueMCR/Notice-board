const express = require('express')
const app = express()
const path = require('path')
const apiRoute = require('./routes/api')

app.use(express.json())
app.use('/api', apiRoute)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT || 8080, () => {
  console.log('HTTP server ruinning')
})
