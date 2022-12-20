const { application } = require("express")
const express=require("express")
const app=express()
const path=require("path")
const port=3000;
const mongoose = require('mongoose');
id='mongodb+srv://yash1234:yash2003@cluster0.bzquy0i.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(id).then(console.log("connected"))
const User=require('./models/admin');
const { mainModule } = require("process");
var sign_in=false
var user_nric=''


// app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, 'public')))
app.set("views", path.join(__dirname, 'views'));
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    if(sign_in==true){
        res.render('index')
    }else{
        sign_in=true
        console.log('incorrect')
        res.render('index')
    }
    
})
app.get('/table',async(req,res)=>{
    data=await User.find()
    console.log(data)
    res.render('table',{data})


})
app.get('/table/:id',async(req,res)=>{
    const {id}=req.params
    data=await User.find({_id:id})
    res.render('personalinfo',{data})

})
app.post('/table/:id',async(req,res)=>{

    const {id}=req.params
    console.log(req.body)
    const{payment,radio}=req.body
    
    console.log(id)
    if(payment){
        console.log('HELOO???')
        v=await User.findOneAndUpdate({_id:`${id}`},{$set:{payment:true}})
        res.redirect(`/table`)
    }
    else if(radio){
        v=await User.findOneAndUpdate({_id:`${id}`},{$set:{room:radio}})
        res.redirect(`/table`)
    }else{res.redirect(`/table/${id}`)}
    
    
})

app.post('/',async(req,res)=>{
    const {nric,pass}=req.body
    b=await User.find({nric})
    
    try{
        password=b[0].password
        console.log(password)
        console.log(pass)
        if (pass===password){
            console.log('work')
            user_nric= b[0].nric
            sign_in=true
            if(b[0].admin){
                console.log('LOGGGED ADMIN')
                res.redirect('/table')
            }else{res.redirect('/home')}
            
        }
        else{
            sign_in=false
            res.redirect('/')
        }
    }
    catch{
        res.redirect('/register')
    }
    
    
})



app.get('/home',async(req,res)=>{
    if(sign_in===true){
        var arr = [];
        while(arr.length < 100){
            var r = Math.floor(Math.random() * 100) + 1;
            if(arr.indexOf(r) === -1) {
                t_id=r
                arr.push(r);}
        }
        
        console.log(t_id)
        console.log(user_nric)
        user1=await User.find({nric:user_nric})
        console.log(user1)
        if (user1[0].token==='-'){
            console.log('HELLO THERE')
            filter={nric:user_nric}
            user1upd=await User.findOneAndUpdate(filter, {token:t_id},{new:true})
            person_token=t_id
            r_id=await user1[0].room
        }
        else{
            person_token=await user1[0].token
            r_id=await user1[0].room
        }
        console.log(user1)
        console.log(person_token)
        res.render('token',{t_id:person_token,r_id})
    }else{
        res.redirect('/')
    }
    

})
app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async(req,res)=>{
    const{name,nric,pass,dob,mail}=req.body
    try{
        if ((nric.length!=9) || (pass.length<=6)){
            console.log('ERROR')
            
            res.redirect('/register')
        }
        else{
            newuser=new User({
                name,
                nric,
                password:pass,
                dob:new Date(dob),
                email:mail
                
            })
            console.log(newuser)
            await newuser.save()
            res.redirect('/')
        }
    }
    catch{
        console.log('ERROR CAUGHT')
        res.redirect('/register')
    }

    
    
    
})

app.listen(port,()=>{
    console.log("Listening at server 3000")
})