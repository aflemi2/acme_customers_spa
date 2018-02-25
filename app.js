fetch('/api/customers')
  .then( response => response.json())
  .then( data => setUp(data))
  .catch( function(error){
    console.log('this is your error:' + JSON.stringify(error))
  })

const cButton =document.getElementById('createButton')

cButton.addEventListener('click', () => {
  let email = document.getElementById('email');
  fetch('/api/customers', {
   headers: {
    'Content-Type': 'application/json'
   },
   method: 'post',
   body: JSON.stringify({
    email: email.value
  })
})
  .then(result => result.json())
  .then((customer) => {
    console.log('working!')
    setUp({'key':customer});
  })
})


//CreateNode gives us an element to append to the DOM
const createNode = function(selector){
  return document.createElement(selector)
}


//SetUp function loads customers Moe, Larry, Curly with corresponding Mortal Combat image
const setUp = (data)=>{
Object.keys(data).forEach( key => {
  const parent = document.getElementById('customerList');
  let newElement = createNode('li'),
  img = createNode('img'),
  span = createNode('span');

  img.src = `/img/MC${(data[key].id)%10}.jpg`;
  span.innerHTML= data[key].email

  newElement.appendChild(img);
  newElement.appendChild(span);
  parent.appendChild(newElement);
})
}

