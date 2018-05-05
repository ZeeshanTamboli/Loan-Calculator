const form = document.querySelector('#loan-form');

//Form submit event
form.addEventListener('submit', calculateResults);

//Calculate results function
function calculateResults(e) {
  //UI vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  //MONTHLY PAYMENT
  const monthlyInterestRate = interest.value / 100 / 12;
  const noOfMonths = 12 * years.value;

  const calculateMonthlyPayment =
    amount.value *
    monthlyInterestRate /
    (1 - Math.pow(1 + monthlyInterestRate, -noOfMonths));

  monthlyPayment.value = +calculateMonthlyPayment.toFixed(2); //toFixed() returns a string. '+' operator is used to convert string to number.

  // TOTAL PAYMENT
  totalPayment.value = Math.round(monthlyPayment.value * noOfMonths);

  //TOTAL INTEREST
  totalInterest.value = Math.round(totalPayment.value - amount.value);

  e.preventDefault();
}
