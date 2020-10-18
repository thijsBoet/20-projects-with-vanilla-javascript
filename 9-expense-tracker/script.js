const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: "flower", amount: -20 },
//   { id: 2, text: "salary", amount: 2000 },
//   { id: 3, text: "book", amount: -10 },
//   { id: 4, text: "camera", amount: -120 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions = localStorage.getItem("transactions") !== null
  ? localStorageTransactions
  : [];

const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    }
    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// Generate random ID
const generateID = () => Math.floor(Math.random() * 100000000);

// Add transactions to DOM
const addTransactionDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  // add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
};

// Updates the balance, income and expense
const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount);
  
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  
  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1
    .toFixed(2);
  
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

const removeTransaction = (id) => {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();
  init();
}

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Init app
const init = () => {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction)