import { useState } from 'react'
import './App.css'

function App() {

  const [inputs, setInputs] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [outputs, setOutputs] = useState({
    years: '- -',
    months: '- -',
    days: '- -',
  });

  function calculateData() {
    if (!validateInputs()) return; // só calcula se for válido

    const today = new Date();
    const birthDate = new Date(inputs.year, inputs.month - 1, inputs.day);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

   
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setOutputs({ years, months, days });
  }
  
  function validateInputs() {
    const { day, month, year } = inputs;
    const today = new Date();
    if (!day || !month || !year) {
      alert("Fill in all fields");
      return false;
    }
    if (month < 1 || month > 12) {
      alert("Must be a valid month");
      return false;
    }
    const maxDays = new Date(year, month, 0).getDate();
    if (day < 1 || day > maxDays) {
      alert("Must be a valid day");
      return false;
    }
    const inputDate = new Date(year, month - 1, day);
    if (inputDate > today) {
      alert("Must be in the past");
      return false;
    }
    return true;
  }

  return (
    <div className="app">

      <section className="formulario">
        <form id="data-form" onSubmit={(e) => e.preventDefault()}>

          <div className="input-group">
            <label htmlFor="day">DAY</label>
            <input type="number" id="day" placeholder="DD" value={inputs.day}
              onChange={(e) => setInputs({ ...inputs, day: e.target.value })} />
            <span className="error-message" id="day-error">Must be a valid day</span>
          </div>

          <div className="input-group">
            <label htmlFor="month">MONTH</label>
            <input type="number" id="month" placeholder="MM" value={inputs.month}
              onChange={(e) => setInputs({ ...inputs, month: e.target.value })} />
            <span className="error-message" id="month-error">Must be a valid month</span>
          </div>

          <div className="input-group">
            <label htmlFor="year">YEAR</label>
            <input type="number" id="year" placeholder="YYYY" value={inputs.year}
              onChange={(e) => setInputs({ ...inputs, year: e.target.value })} />
            <span className="error-message" id="year-error">Must be in the past</span>
          </div>

        </form>
      </section>

      <div className='linha'>
        <hr></hr>
        <div className='bola'>
          <button type="button" onClick={calculateData}></button>
          <img src="images/icon-arrow.svg" alt="arrow" />
        </div>
      </div>

      <div id='data'>
        <p><span className='outputs'>{outputs.years}</span> years</p>
        <p><span className='outputs'>{outputs.months}</span> months</p>
        <p><span className='outputs'>{outputs.days}</span> days</p>
      </div>

    </div>
  )
}

export default App;
