const form = document.querySelector('#loan-form');

//Form submit event
form.addEventListener('submit', function(e) {
  //Hide results
  document.querySelector('#results').style.display = 'none';

  //Show loader
  document.querySelector('#loading').style.display = 'block';
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Calculate results function
function calculateResults() {
  //UI vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  //MONTHLY PAYMENT
  const principal = parseFloat(amount.value);
  const monthlyInterestRate = parseFloat(interest.value) / 100 / 12;
  const noOfMonths = 12 * parseFloat(years.value);

  const calculateMonthlyPayment =
    principal *
    monthlyInterestRate /
    (1 - Math.pow(1 + monthlyInterestRate, -noOfMonths));

  if (isFinite(calculateMonthlyPayment)) {
    monthlyPayment.value = +calculateMonthlyPayment.toFixed(2); //toFixed() returns a string. '+' operator is used to convert string to number.

    // TOTAL PAYMENT
    totalPayment.value = Math.round(monthlyPayment.value * noOfMonths);

    //TOTAL INTEREST
    totalInterest.value = Math.round(totalPayment.value - principal);

    //Show results
    document.querySelector('#results').style.display = 'block';
    //Hide loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your numbers.');
  }
}

function showError(error) {
  //Hide results
  document.querySelector('#results').style.display = 'none';
  //Hide loader
  document.querySelector('#loading').style.display = 'none';
  //Create a div element
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add bootstrap classes
  errorDiv.className = 'alert alert-danger';

  //Add text node
  errorDiv.appendChild(document.createTextNode(error));

  //Display errorDiv in DOM
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

//Clear Error function
function clearError() {
  document.querySelector('.alert').remove();
}
