const express = require('express');
const app = express();
const db = require('./db');
const { Customer }= db.model;
const path =require('path');

app.use(require('body-parser').json());
app.use(require('method-override')('_method'));
app.use(express.static(path.join(__dirname, "")));

app.get('/', (req, res, next)=>{ //serves the page
 res.sendFile("index.html")
 .catch(next)
});

app.get('/api/customers', (req, res, next)=>{//gets all the customers
  Customer.findAll()
  .then(result=> res.json(result))
  .catch(next);
});

app.post('/api/customers', (req, res, next) => {
  Customer.create(req.body)
    .then( (customer) => {
     res.json(customer);
    })
    .catch(next);
});

app.delete('/api/customers/:id', (req, res, next)=>{
  Customer.findById(req.params.id)
  .then( (customer) =>{
    customer.destroy()
  })
  .then(()=>res.sendStatus(204))
  .catch(next);
})

app.use((err, req, res, next)=> {
    res.status(err.status || 500).send({error: err.message});
  });

db.sync()
.then(()=>db.seed());

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on ${port}!!!`))
