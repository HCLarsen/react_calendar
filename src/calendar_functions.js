export const monthNames = [
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

export const isLeapYear = year => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
export const daysInMonth = (month, year) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  } else {
    return days[month];
  }
};
