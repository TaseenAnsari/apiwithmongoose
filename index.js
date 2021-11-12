const express = require('express');
const app = express();
const route = require('./route/studentapi')


app.use(express.json());
// app.set('view engine','pug');
// app.set('views','./views')
app.use('/api/students/',route);
app.get("/",(req,res)=>{
    res.send("<h2>hello world</h2>")
})

app.listen(1500,()=>console.log("conection established"))



