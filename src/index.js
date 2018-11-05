import React from "react";
import ReactDOM from "react-dom";
import { isLeapYear, daysInMonth, monthNames } from "./calendar_functions";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      date: new Date(),
      year: date.getFullYear(),
      month: date.getMonth()
    };
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }
  day(date, month) {
    return (
      <li className={"day-of-month " + month} key={date}>
        {date}
      </li>
    );
  }
  prevMonth(e) {
    e.preventDefault();
    if (this.state.month == 0) {
      this.setState(state => ({ month: 11, year: state.year - 1 }));
    } else {
      this.setState(state => ({ month: state.month - 1 }));
    }
  }
  nextMonth(e) {
    e.preventDefault();
    if (this.state.month == 11) {
      this.setState(state => ({ month: 0, year: state.year + 1 }));
    } else {
      this.setState(state => ({ month: state.month + 1 }));
    }
  }
  render() {
    const month = this.state.month;
    const year = this.state.year;
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
          <span className="month-name">
            <FiChevronLeft className="month-nav" onClick={this.prevMonth} />
            {monthName}
            <FiChevronRight className="month-nav" onClick={this.nextMonth} />
          </span>
          <span className="year">{year}</span>
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
