const path = require('path')
const express = require('express')
const engine = require('express-handlebars')
const app = express()
const morgan = require('morgan')
const bodyParser=require('body-parser')//thêm cái này để form sẽ trả về req.body chứ mặc định là ko phải vậy
const port = process.env.port || 5000
const mongoose = require('mongoose')
//kết nối tới mongodb cloud
const URI = 'mongodb+srv://admin:cGq7ExJLk1mhvqph@ecommerce.tz19vgs.mongodb.net/?retryWrites=true&w=majority'
//kết nối tới csdl trên laptop

// const db = require('./config/db')
// db.connect()

//dùng session
const session = require('express-session')
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true,
  }))
//các đường dẫn của trang
const route = require('./routes')
//đường dẫn tới public
app.use(express.static(path.join(__dirname, 'public')))
//http logger
app.use(morgan('combined'))
//handlebar
app.engine('handlebars', engine.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'))
//thêm cái này để form sẽ trả về req.body chứ mặc định là ko phải vậy
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// kết nối mongo
mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology :true})
.then(()=>{
  console.log('kết nối thành công tới csdl')
  app.listen(port,()=>console.log(`App listiening at http://localhost:${port}`))
})



// vi route ben index nhan doi so la app nen phai goi nhu vay
route(app)