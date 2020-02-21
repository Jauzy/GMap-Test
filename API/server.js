require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.port || 4000

//mongoose
const mongoose = require('mongoose')

//db URL
const mongodbUri = "mongodb+srv://root:root@firstcluster-zqwwp.gcp.mongodb.net/test?retryWrites=true&w=majority"

//setting up DB params (mongodbUri, optional) (wajib)
// useNewURLParser buat ignore warning (wajib)
mongoose 
    .connect(mongodbUri, {useNewUrlParser : true})
    .then(()=>{
        console.log('MongoDb connected on',mongodbUri)
    })
    .catch(err => {
        console.log(err)
    })

//cors
app.use(require('cors')())

//body-parser express
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routers in index.js
const router = require('./routes/index')
app.use('/',router)

app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log(`Server running on port ${PORT}`)
})