import object from '@validest/object';
import { useValidestForm } from '@validest/react';
import { useState } from 'react';
import s from 'validest';
import './App.css';
import logo from './logo.svg';

function App() {
  const [success, setSuccess] = useState(false);
  const { error, onSubmit } = useValidestForm(
    object({
      name: s.string('Please enter your name'),
      age: s.number('Please enter your age'),
    }),
    () => setSuccess(true)
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={onSubmit}>
          <div>
            <input name="name" placeholder="name" />
            <div style={{ fontSize: 12, color: 'red' }}>{error?.name || null}</div>
          </div>
          <div>
            <input name="age" placeholder="age" />
            <div style={{ fontSize: 12, color: 'red' }}>{error?.age || null}</div>
          </div>
          <button type="submit">Submit</button>
        </form>
        {success && <div style={{ color: 'green' }}>Congratulation your data is validated</div>}
      </header>
    </div>
  );
}

export default App;
