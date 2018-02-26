fetch('/api/customers')
  .then( response => response.json())
  .then( data => setUp(data))
  .catch( function(error){
    console.log('this is your error:' + JSON.stringify(error))
  })


document.getElementById('createButton').addEventListener('click', () => {
  fetch('/api/customers', {
    method: 'POST',
    body: JSON.stringify({
      email: document.getElementById('email').value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
})


//CreateNode gives us an element to append to the DOM
const createNode = function(selector){
  return document.createElement(selector)
}


//SetUp function loads customers Moe, Larry, Curly with corresponding Mortal Combat image
const setUp = (data)=>{
data.forEach( key => {
  const parent = document.getElementById('customerList');
  let newElement = createNode('li'),
  img = createNode('img'),
  span = createNode('span');

  img.src = `/img/MC${(key.id)%10}.jpg`;
  span.innerHTML= key.email

  newElement.appendChild(img);
  newElement.appendChild(span);
  parent.appendChild(newElement);
  newElement.addEventListener('click', function(){
    newElement.remove();
  })
})
}

