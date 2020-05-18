const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false}))

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Methods",'PUT,GET,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers",'X-Requested-With');
    res.header("Access-Control-Allow-Headers",'Content-Type');
    res.header('Access-Control-Allow-Headers','mytoken');
    next();
})
//ajax
app.get('/data',(req,resp) => {
    resp.send('Hello World')
})
app.get('/ajax1',(req,resp) => {
    resp.send("ajax1");
})
app.get('/ajax2',(req,resp) => {
    resp.send("ajax2");
})
app.get('/ajax3',(req,resp) => {
    resp.send("ajax3");
})
//fetch
app.get('/fdata',(req,resp) => {
    resp.send('Hello Fetch')
})
app.get('/book',(req,resp) => {
    resp.send('传统URL传值:'+req.query.id)
})
app.get('/products/:id',(req,resp) => {
    resp.send('RestFul-Get风格传值:'+req.params.id)
})
app.delete('/products/:id',(req,resp) => {
    resp.send('RestFul-Delete风格传值:'+req.params.id)
})
app.post('/products',(req,resp) => {
    var people = {
        'username':req.body.username,
        'age':req.body.age,
        'gender':req.body.gender,
        'phone':req.body.phone
    }
    //console.log(people)
    resp.send('RestFul-Post风格传值:'+JSON.stringify(people))
})
app.put('/products/:id',(req,resp) => {
    var people = {
        'id':req.params.id,
        'username':req.body.username,
        'age':req.body.age,
        'gender':req.body.gender,
        'phone':req.body.phone
    }
    //console.log(people)
    resp.send('RestFul-Put风格传值:'+JSON.stringify(people))
})
app.get('/jsons',(req,resp) => {
    resp.json({
        'id':1,
        'username':'无敌手',
        'gender':'男'
    })
})
//axios
app.get('/axios',(req,resp) => {
    resp.send('axios get 传统URL(Params)参数：' + req.query.id)
})
app.get('/axios/:id',(req,resp) => {
    resp.send('axios get RestFul参数：' + req.params.id)
})
app.delete('/axios',(req,resp) => {
    resp.send('axios delete 传统URL(Params)参数：' + req.query.id)
})
app.post('/axios',(req,resp) => {
    resp.json(req.body)
})
app.listen(3000,() => {
    console.log("listen running 3000")
})