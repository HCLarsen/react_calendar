import React from "react";
import ReactDOM from "react-dom";
import { isLeapYear, daysInMonth, monthNames } from "./calendar_functions";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  day(date, month) {
    return (
      <li className={"day-of-month " + month} key={date}>
        {date}
      </li>
    );
  }
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
      .map((v, i) => this.day(i + offset, "other-month"));

    const daysOfThisMonth = Array(daysInMonth(month, year))
      .fill()
      .map((v, i) => this.day(i + 1, "current-month"));

    const lastDayOfMonth = new Date(year, month, daysInMonth(month, year));
    const daysOfNextMonth = Array(6 - lastDayOfMonth.getDay())
      .fill()
      .map((v, i) => this.day(i + 1, "other-month"));

    return (
      <div className="App">
        <nav>
          <h1>
            {monthName} {year}
          </h1>
        </nav>
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
