import React, { useState,  } from 'react';
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';

const ExpenseItem = (props) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const selectYearHandler = (year) => {
    setSelectedYear(year);
  };

  const clickHandler = () => {
    console.log('Clicked!!!');
  };

  const deleteExpenseHandler = () => {
    const expenseItem = document.querySelector('.expense-item');
    expenseItem.remove();
  };

  const addExpenseHandler = () => {
    setShowAddExpenseForm(true);
  };

  const cancelAddExpenseHandler = () => {
    setShowAddExpenseForm(false);
    setTitle('');
    setAmount('');
    setDate('');
  };

  const submitAddExpenseHandler = (event) => {
    event.preventDefault();

    // Perform validation or additional logic here

    const newExpense = {
      id: Math.random().toString(),
      title: title,
      amount: +amount,
      date: new Date(date),
    };

    // Add newExpense to the list of expenses (use state or callback)
    // props.onAddExpense(newExpense);

    // Reset form values
    setTitle('');
    setAmount('');
    setDate('');
    setShowAddExpenseForm(false);
  };

  const filteredExpenses = props.expenses.filter((expense) => {
    if (selectedYear === '') {
      return true; // Show all expenses when no year is selected
    } else {
      return expense.date.getFullYear().toString() === selectedYear;
    }
  });

  let expenseContent = <p>No expenses found.</p>;

  if (filteredExpenses.length > 0) {
    expenseContent = filteredExpenses.map((expense) => (
      <div key={expense.id}>
        <ExpenseDate date={expense.date} />
        <div className='expense-item_description'>
          <h2>{expense.title}</h2>
          <div className='expense-item_price'>${expense.amount}</div>
        </div>
        <button onClick={clickHandler}>Change Title</button>
        <button onClick={deleteExpenseHandler}>Delete Expense</button>
      </div>
    ));
  } else if (props.expenses.length === 1) {
    expenseContent = (
      <p>Only single Expense here. Please add more...</p>
    );
  }

  let addExpenseForm = null;

  if (showAddExpenseForm) {
    addExpenseForm = (
      <form onSubmit={submitAddExpenseHandler}>
        <div className='expense-item_form-row'>
          <label>Title:</label>
          <input
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className='expense-item_form-row'>
          <label>Amount:</label>
          
          <input
            type='number'
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

        </div>
        <div className='expense-item_form-row'>
          <label>Date:</label>
          <input
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        </div>
        <div className='expense-item_form-actions'>
          <button type='button' onClick={cancelAddExpenseHandler}>
            Cancel
          </button>
          <button type='submit'>Add Expense</button>
        </div>
      </form>
    );
  }

  return (
    <div className='expense-item'>
      <div className='expense-item_filter'>
        <label>Filter by year:</label>
        <select
          value={selectedYear}
          onChange={(event) => selectYearHandler(event.target.value)}
        >
          <option value=''>All</option>
          <option value='2021'>2021</option>
          <option value='2022'>2022</option>
          <option value='2023'>2023</option>
          {/* Add more years as needed */}
        </select>
      </div>
      {expenseContent}
      <button onClick={addExpenseHandler}>Add New Expense</button>
      {addExpenseForm}
    </div>
  );
};

export default ExpenseItem;
