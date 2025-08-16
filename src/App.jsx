import './App.css';
import React from 'react';

function App() {
  
  return (
    <>

      <section className="formulario">
        <form>
          
          <div className="input-group">
            <label for="day">DAY</label>
            <input type="number" id="day" placeholder="DD"/>
            <span className="error-message" id="day-error">Must be a valid day</span>
          </div>

          <div className="input-group">
            <label for="month">MONTH</label>
            <input type="number" id="month" placeholder="MM"/>
            <span className="error-message" id="day-error">Must be a valid month</span>
          </div>

          <div className="input-group">
            <label for="year">YEAR</label>
            <input type="number" id="year" placeholder="YYYY"/>
            <span className="error-message" id="day-error">Must be in the past</span>
          </div>

          <button className="button"></button>
        </form>
      </section>

      <section className="outputs">
        <div className="output-year">years</div>
        <div className="output-month">months</div>
        <div className="output-day">days</div>
      </section>

      <section className="show-dates">
        <div className="show-year">--</div>
        <div className="show-month">--</div>
        <div className="show-day">--</div>
      </section>

      <section className="icon">
        <img src="./images/icon-arrow.svg" id="image" alt="icon" />
      </section>

      <div id="back-icon"></div>

    </>
  )
}

export default App;
