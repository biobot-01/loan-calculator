// Listen for submit
document.getElementById('loanForm').addEventListener('submit', calculateResults);

// Calculate results
function calculateResults(e) {
  console.log('Calculating...');
  // UI vars
  const loanAmount = document.getElementById('loanAmount');
  const interestPercent = document.getElementById('interestPercent');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthlyPayment');
  const totalPayment = document.getElementById('totalPayment');
  const totalInterest = document.getElementById('totalInterest');

  const principal = parseFloat(loanAmount.value);
  const calculatedInterest = parseFloat(interestPercent.value) /100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
  } else {
    showError('Please check your numbers');
  }
  
  e.preventDefault();
}

// Show error
function showError(error) {
  // Create div
  const errorDiv = document.createElement('div');
  // Add class
  errorDiv.className = 'notification is-danger';
  // Create text node & append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above form
  document.querySelector('.box').insertBefore(errorDiv, document.getElementById('loanForm'));
  // Clear error after 3secs
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.notification.is-danger').remove();
}