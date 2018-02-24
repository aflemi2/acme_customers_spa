const express = require('express');
const app = express();
const db = require('./db');
const { Customer }= db.model;
const path =require('path');


app.use(express.static(path.join(__dirname, "")));

app.get('/', (req, res, next)=>{
 res.sendFile("index.html")
})


db.sync()
.then(()=>db.seed());

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on ${port}!!!`))
