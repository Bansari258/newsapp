const express = require('express')
const news = require('./mongo')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended:true}));
app.listen(8000,()=>{
    console.log("port Connected")
})
app.get('/',cors(), (req,res)=>{})

app.post('/', async (req,res)=>{
const{email,password}=req.body
try{
const check =  await news.findOne({email:email})
if(check){
    res.json('exist')
}
else{
    res.json('not exist')
}
}
catch(e){
    res.json('not exist')

}
});

app.post('/SignUp', async (req,res)=>{
    const{email,password}=req.body
    const data ={
        email:email,
        password:password
    }
    try{
    const check =  await news.findOne({email:email})
    if(check){
        res.json('exist')
    }
    else{
        res.json('not exist')
        await news.insertMany([data])
    }
    }
    catch(e){
        res.json('not exist')
    
    }
    });