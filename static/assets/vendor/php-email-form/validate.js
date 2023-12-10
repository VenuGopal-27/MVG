function submitForm() {
  // Prevent the default form submission
  event.preventDefault();

  // Get the form element
  let form = document.getElementById('myForm');

  // Display the loading indicator
  form.querySelector('.loading').classList.add('d-block');
  
  // Hide any previous messages
  form.querySelector('.error-message').classList.remove('d-block');
  form.querySelector('.sent-message').classList.remove('d-block');

  // Create a FormData object to gather form data
  let formData = new FormData(form);

  // Make a fetch request to handle the form submission
  fetch('/contact', {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
  .then(response => response.json())
  .then(data => {
      // Hide the loading indicator
      form.querySelector('.loading').classList.remove('d-block');

      // Display success or error message
      if (data.status === 'OK') {
          form.querySelector('.sent-message').classList.add('d-block');
          form.reset();
      } else {
          form.querySelector('.error-message').innerHTML = 'Error submitting the form. Please try again.';
          form.querySelector('.error-message').classList.add('d-block');
      }
  })
  .catch(error => {
      // Hide the loading indicator
      form.querySelector('.loading').classList.remove('d-block');

      // Display error message
      form.querySelector('.error-message').innerHTML = 'An error occurred. Please try again later.';
      form.querySelector('.error-message').classList.add('d-block');
  });
}