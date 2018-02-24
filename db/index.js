const conn = require('./conn');
const Customer = require('./Customer');

const sync = ()=>{
  return conn.sync({ force:true })
}

const seed = ()=> {
  return Promise.all([
 Customer.create({email:"moe@gmail.com"}),
 Customer.create({email:"larry@gmail.com"}),
 Customer.create({email:"curly@gmail.com"})
])
}





module.exports = {
  sync,
  seed,
  model: {
    Customer
  }
}
