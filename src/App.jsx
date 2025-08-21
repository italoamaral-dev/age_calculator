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

  const [errors, setErros] = useState({
    day: "",
    month:"",
    year: ""
  });

  function calculateData() {
    if (!validateInputs()) return; 

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

    let newErros = {day: "", month: "", year: ""};
    let valid = true;

    if (!day) {
      newErros.day = 'This field is required';
      valid = false;
    }
    if (!month) {
      newErros.month = 'This field is required';
      valid = false;
    }
    if (!year) {
     newErros.year = 'This field is required';
      valid = false;
    }
    if (month && (month < 1 || month > 12)) {
      newErros.month = "Must be a valid month";
      valid = false;
    }
    if (day && month && year){
      const maxDays = new Date(year, month, 0).getDate();
      if (day < 1 || day > maxDays){
        newErros.day = "Must be a valid day";
        valid = false;
      }
      const inputDate = new Date (year, month - 1, day);
      if (inputDate > today) {
        newErros.year = "Must be in the past";
        valid = false;
      }
    }

    setErros(newErros);
    return valid;
  }

  return (
    <div className="app">

      <section className="formulario">
        <form id="data-form" onSubmit={(e) => e.preventDefault()}>

          <div className="input-group">
            <label htmlFor="day" className={errors.day ? "error" : ""}>DAY</label>
            <input type="number" id="day" placeholder="DD" value={inputs.day}
              onChange={(e) => setInputs({ ...inputs, day: e.target.value })}
              className={errors.day ? "error" : ""} />
            <div className="error">{errors.day}</div>
          </div>

          <div className="input-group">
            <label htmlFor="month" className={errors.month ? "error" : ""}>MONTH</label>
            <input type="number" id="month" placeholder="MM" value={inputs.month}
              onChange={(e) => setInputs({ ...inputs, month: e.target.value })}
              className={errors.month ? "error" : ""}/>
            <div className="error">{errors.month}</div>
          </div>

          <div className="input-group">
            <label htmlFor="year" className={errors.year ? "error" : ""}>YEAR</label>
            <input type="number" id="year" placeholder="YYYY" value={inputs.year}
              onChange={(e) => setInputs({ ...inputs, year: e.target.value })}
              className={errors.year ? "error" : ""} />
            <div className= "error">{errors.year}</div>
          </div>

        </form>
      </section>

      <div className='linha'>
        <hr></hr>
        <div className='bola'>
          <button type="button" onClick={calculateData}><img src="icon-arrow.svg" alt="arrow"/></button>
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
