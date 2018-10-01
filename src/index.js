import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  state = {
    date: new Date()
  };
  isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  daysInMonth(month, year) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      return this.isLeapYear(year) ? 29 : 28;
    } else {
      return days[month];
    }
  }
  render() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const month = this.state.date.getMonth();
    const year = this.state.date.getFullYear();
    const monthName = monthNames[month];

    const lastDayOfLastMonth = new Date(
      year,
      month - 1,
      this.daysInMonth(month - 1, year)
    );
    const firstDayOfMonth = new Date(year, month, 1);
    const offset =
      this.daysInMonth(month - 1, year) - lastDayOfLastMonth.getDay();
    const daysOfLastMonth = Array(firstDayOfMonth.getDay())
      .fill()
      .map((v, i) => (
        <li className="day-of-month other-month" key={i + offset}>
          {i + offset}
        </li>
      ));

    const daysOfThisMonth = Array(this.daysInMonth(month, year))
      .fill()
      .map((v, i) => (
        <li className="day-of-month current-month" key={i + 1}>
          {i + 1}
        </li>
      ));

    const lastDayOfMonth = new Date(year, month, this.daysInMonth(month, year));
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
        <p>There are {this.daysInMonth(month, year)} days in this month</p>
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
