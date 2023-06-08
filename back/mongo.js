const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/inotebook")
.then(()=>{
    console.log('Connect')
})
.catch(()=>{
    console.log('failed to connect')
  
})
const newSchema = new mongoose.Schema({
    email:{
        type:'String',
        require:true
    },
    password:{
        type:'String',
        require:true
    }
})
const  news = new mongoose.model('news',newSchema)
module.exports = news