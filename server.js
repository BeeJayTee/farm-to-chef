const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})




app.listen(3000, _ => {
    console.log('Listening on 3000')
})