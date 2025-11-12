
const billInput   = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons  = document.querySelectorAll('.tip-btn');
const customTip   = document.querySelector('.tip-custom');
const form        = document.getElementById('tip-form');
const resetBtn    = document.querySelector('.reset');

const tipOut   = document.getElementById('tip-amount');
const totalOut = document.getElementById('total');

let tipPercent = 0; 


tipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tipButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tipPercent = parseFloat(btn.dataset.tip) || 0;
    customTip.value = '';
  });
});


customTip.addEventListener('input', () => {
  tipButtons.forEach(b => b.classList.remove('active'));
  const v = parseFloat(customTip.value);
  tipPercent = isNaN(v) ? 0 : v;
});


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const bill   = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value, 10);

  if (isNaN(bill) || bill <= 0) {
    alert('Please enter a valid bill amount.');
    return;
  }
  if (isNaN(people) || people <= 0) {
    alert('Please enter a valid number of people (>= 1).');
    return;
  }

  const tipTotal       = (bill * tipPercent) / 100;
  const tipPerPerson   = tipTotal / people;
  const totalPerPerson = (bill + tipTotal) / people;

  tipOut.textContent   = `$${tipPerPerson.toFixed(2)}`;
  totalOut.textContent = `$${totalPerPerson.toFixed(2)}`;
});


resetBtn.addEventListener('click', () => {
  form.reset();
  tipButtons.forEach(b => b.classList.remove('active'));
  tipPercent = 0;
  tipOut.textContent   = '$0.00';
  totalOut.textContent = '$0.00';
});
