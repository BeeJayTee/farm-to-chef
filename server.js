const express = require('express')
const app = express()
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const PORT = 3000

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
                    res.render('inventory.ejs', { inventoryItems: results })
                })
                .catch(err => console.error(err))
            
        })

        app.get('/farm-inventory/:id', (req, res) => {
            farmerInventory.findOne(ObjectId(req.params.id))
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

        app.put('/farm-inventory', (req, res) => {
            farmerInventory.updateOne(
                {_id: ObjectId(req.body.id)},
                {$set: {
                    'productName': req.body.productName,
                    'productType': req.body.productType,
                    'productQuantity': req.body.productQuantity,
                    'quantityType': req.body.quantityType
                }}
            )
            .then(response => {
                res.json(response)
            })
        })

        app.delete('/farmer-inventory', (req, res) => {
            farmerInventory.deleteOne(
                {_id: ObjectId(req.body.id)}
            )
            .then(response => {
                res.json(response)
            })
            .catch(err => console.error(err))
        })






        app.listen(process.env.PORT || PORT, _ => {
            console.log('Listening on 3000')
        })
    })


    .catch(err => console.error(err))

