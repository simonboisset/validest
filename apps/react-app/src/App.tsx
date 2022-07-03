import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useTsvForm } from '@ts-v/react';
import s from '@ts-v/kit';
import { object } from '@ts-v/core';

function App() {
  const [success, setSuccess] = useState(false);
  const { errors, onSubmit } = useTsvForm(
    object({
      name: s.string('Please enter your name'),
      age: s.number('Please enter your age'),
    }),
    () => setSuccess(true),
  );
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <form onSubmit={onSubmit}>
          <div>
            <input name='name' placeholder='name' />
            <div style={{ fontSize: 12, color: 'red' }}>{errors?.name || null}</div>
          </div>
          <div>
            <input name='age' placeholder='age' />
            <div style={{ fontSize: 12, color: 'red' }}>{errors?.age || null}</div>
          </div>
          <button type='submit'>Submit</button>
        </form>
        {success && <div style={{ color: 'green' }}>Congratulation your data is validated</div>}
      </header>
    </div>
  );
}

export default App;
