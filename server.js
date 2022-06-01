const express = require('express')
const app = express()
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const dbHash = process.env.DB_HASH
const connectionString = `mongodb+srv://BeeJayTee:${dbHash}@ftc.359pd.mongodb.net/?retryWrites=true&w=majority`
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('farmer-inventory')
        const farmerInventory = db.collection('farmer-inventory')

        app.set('view engine', 'ejs')

        app.use(express.urlencoded( {extended: true} ))
        app.use(express.static('public'))
        app.use(express.json())

        app.get('/', (req, res) => {
            farmerInventory.find().toArray()
                .then(results => {
                    res.render('index.ejs', { inventoryItems: results })
                })
                .catch(err => console.error(err))
            
        })

        app.put('/farm-inventory', (req, res) => {
            console.log(req.body._id)
            farmerInventory.findOne(ObjectId(req.body._id))
                .then(result => res.json(result))
                .catch(err => console.error(err))
        })


        app.post('/farm-inventory', (req, res) => {
            farmerInventory.insertOne(req.body)
                .then(result => {
                    // console.log(result)
                    res.redirect('/')
                })
                .catch(err => console.error(err))
        })




        app.listen(3000, _ => {
            console.log('Listening on 3000')
        })
    })


    .catch(err => console.error(err))

