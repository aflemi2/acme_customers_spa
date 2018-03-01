fetch('/api/customers')
  .then( response => response.json())
  .then( data => setUp(data))
  .catch( function(error){
    console.log('this is your error:' + error)
  })


document.getElementById('createButton').addEventListener('click', (e) => {
   e.preventDefault();
  fetch('/api/customers', {
    method: 'POST',
    body: JSON.stringify({
      email: document.getElementById('email').value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(result => result.json())
  .then(elem => setUp([elem]))
  .catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
email.value = '';
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

    img.src = `/img/MC${(key.id)%10+1}.jpg`;
    span.innerHTML= key.email

    newElement.append(img);
    newElement.append(span);
    parent.append(newElement);
    newElement.addEventListener('click', function(e){
      fetch(`/api/customers/${key.id}`, {
       method: 'delete'
       })
      .then(()=> {
        newElement.remove()
      })
    })
  })
}

