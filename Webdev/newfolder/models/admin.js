const mongoose = require('mongoose');  
id='mongodb+srv://yash1234:yash2003@cluster0.bzquy0i.mongodb.net/?retryWrites=true&w=majority'
 
mongoose.connect(id).then(console.log("connected"))
const Schema= mongoose.Schema;

const base= new Schema({
    name: {
        type: String,
        required: true
    },
    nric: {
        type: String,
        required: true,
        unique:true
    },
    dob: {
        type:Date,
        required: true
    },
    checkin:{
        type:Date,
        default: Date.now
    },
    room:{
        type: String,
        default:'-'
    },
    email:{
        type: String,
        required: true
    },
    payment:{
        type: Boolean,
        required:true,
        default:false
    },
    medicalhistory:{
        type: String,
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:'-'
    },
    room:{
        type:String,
        default:'-'
    },
    admin:{
        type:Boolean,
        default:false
    }
})

module.exports= mongoose.model('User',base)

