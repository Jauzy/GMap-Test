const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const UserSchema = new Schema ({
    name : {
        type : String,
        required : [true, 'Please input name']
    },
    email : {
        type : String,
        required : [true, "Please input email"]
    },
    password : {
        type : String,
        required: [true, "Please input password"]
    },
    latitude : {
        type : Number
    },
    longitude : {
        type : Number
    },
    locationSharing : {
        type : Boolean
    }
})

//User sebagai nama collection mongoose
module.exports = mongoose.model("User", UserSchema)