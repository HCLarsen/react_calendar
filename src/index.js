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
  daysOfMonth(month, year) {
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

    const daysOfMonth = Array(this.daysOfMonth(month, year))
      .fill()
      .map((v, i) => (
        <li class="day-of-month" key={i + 1}>
          {i + 1}
        </li>
      ));

    return (
      <div className="App">
        <h1>
          {monthName} {year}
        </h1>
        <p>There are {this.daysOfMonth(month, year)} days in this month</p>
        <ul class="current-month">{daysOfMonth}</ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
