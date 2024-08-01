const axios = require('axios');

const newPost = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};

axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was an error making the POST request:', error);
  });