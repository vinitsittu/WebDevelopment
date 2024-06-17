function register() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;
  
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${name}&username=${username}&email=${email}&password=${password}`,
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // Handle success or display a message to the user
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error or display an error message to the user
    });
  }
  