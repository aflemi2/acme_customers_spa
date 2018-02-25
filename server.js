const express = require('express');
const app = express();
const db = require('./db');
const { Customer }= db.model;
const path =require('path');

app.use(require('body-parser').json())
app.use(express.static(path.join(__dirname, "")));

app.get('/api/customers', (req, res, next)=>{//gets all the customers
  Customer.findAll()
  .then(result=> res.json(result))
  .catch(next)
})

// app.get('/', (req, res, next)=>{ //serves the page
//  res.sendFile("index.html")
// })

app.post('/api/customers', (req, res, next)=>{ //creates a customer and returns it
  const customerEmail = req.body;
  Customer.create(customerEmail)
  .then( customer => res.send(customer))
  .catch(next)
})

app.delete('/api/customers/:id', (req, res, next)=>{ //deletes a customer

})

db.sync()
.then(()=>db.seed());

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on ${port}!!!`))
