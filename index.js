const express=require('express');
const Volunteer = require('./models/volunteer');
const path=require('path');
const ejsMate=require('ejs-mate');

const app=express();
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/volunteer');

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connected");
})

// Admin Routes

app.get('/admin/dashboard',(req,res)=>{
    res.render('admin/dashboard')
})
app.get('/admin/donors',(req,res)=>{
    res.render('admin/donors')
})
app.get('/admin/resources',(req,res)=>{
    res.render('admin/resources')
})
app.get('/admin/volunteers',(req,res)=>{
    res.render('admin/volunteers')
})
app.get('/admin/complaints',(req,res)=>{
    res.render('admin/complaints')
})
app.get('/admin/alerts',(req,res)=>{
    res.render('admin/alerts')
})
app.get('/admin/news',(req,res)=>{
    res.render('admin/news')
})

// Volunteer Routes

app.get('/volunteer/signup',(req,res)=>{
    res.render('volunteers/signup.ejs')
})
app.get('/volunteer/login',(req,res)=>{
    res.render('volunteers/login.ejs')
})
app.get('/volunteer/dashboard',(req,res)=>{
    res.render('volunteers/dashboard')
})
app.get('/volunteer/requests',(req,res)=>{
    res.render('volunteers/requests')
})
app.get('/volunteer/complaints',(req,res)=>{
    res.render('volunteers/complaints')
})
app.get('/volunteer/resources',(req,res)=>{
    res.render('volunteers/resources')
})
app.post('/volunteer/login',async(req,res)=>{
    const volunteer=req.body.volunteer;
    const foundvolunteer=await Volunteer.findOne({email:volunteer.email,password:volunteer.password});
    if(foundvolunteer)
    res.redirect(`/volunteer/${foundvolunteer._id}`)
    else
    res.send('Invalid')
})
app.get('/volunteer/:id',async(req,res)=>{
    const volunteer=await Volunteer.findById(req.params.id);
    res.render('volunteers/show.ejs',{volunteer})
})
app.post('/volunteer/signup',async(req,res)=>{
    const volunteer=new Volunteer(req.body.volunteer);
    await volunteer.save();
    res.redirect(`/volunteer/${volunteer._id}`)
})
app.listen(3000,(req,res)=>{
    console.log('Server running at port 3000');
})
