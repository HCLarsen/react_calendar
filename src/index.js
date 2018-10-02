import React from "react";
import ReactDOM from "react-dom";
import { isLeapYear, daysInMonth, monthNames } from "./calendar_functions";
import "./styles.css";

class App extends React.Component {
  state = {
    date: new Date()
  };
  render() {
    const month = this.state.date.getMonth();
    const year = this.state.date.getFullYear();
    const monthName = monthNames[month];

    const lastDayOfLastMonth = new Date(
      year,
      month - 1,
      daysInMonth(month - 1, year)
    );
    const firstDayOfMonth = new Date(year, month, 1);
    const offset = daysInMonth(month - 1, year) - lastDayOfLastMonth.getDay();
    const daysOfLastMonth = Array(firstDayOfMonth.getDay())
      .fill()
      .map((v, i) => (
        <li className="day-of-month other-month" key={i + offset}>
          {i + offset}
        </li>
      ));

    const daysOfThisMonth = Array(daysInMonth(month, year))
      .fill()
      .map((v, i) => (
        <li className="day-of-month current-month" key={i + 1}>
          {i + 1}
        </li>
      ));

    const lastDayOfMonth = new Date(year, month, daysInMonth(month, year));
    const daysOfNextMonth = Array(6 - lastDayOfMonth.getDay())
      .fill()
      .map((v, i) => (
        <li className="day-of-month other-month" key={i + 1}>
          {i + 1}
        </li>
      ));

    return (
      <div className="App">
        <nav>
          {monthName} {year}
        </nav>
        <p>There are {daysInMonth(month, year)} days in this month</p>
        <ul className="current-month">
          {daysOfLastMonth}
          {daysOfThisMonth}
          {daysOfNextMonth}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
