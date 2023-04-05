import moment from "moment";
import { Day } from "./DatePicker.models";

export const generateCalendar = (cYear: number, cMonth: number): Day[] => {
  const days: Day[] = [];
  let firsDayOfMoth = new Date(cYear, cMonth, 0).getDay(); // getting firs day of month
  let lastDateOfMonth = new Date(cYear, cMonth+1, 0).getDate(); // getting last date of month
  let lastDateOfLastMonth = new Date(cYear, cMonth, 0).getDate(); // getting last date of previous month
  for (let i = firsDayOfMoth; i > 0; i--) {
    days.push({
      day: lastDateOfLastMonth - i + 1,
      fullDate: moment(
        new Date(cYear, cMonth - 1, lastDateOfLastMonth - i + 1)
      ).format("DD.MM.YYYY"),
      inActive: true,
    });
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({
      day: i,
      fullDate: moment(new Date(cYear, cMonth, i)).format("DD.MM.YYYY"),
      inActive: false,
    });
  }

  const daysOfNextMonth =  42 - days.length

  for (let i = 1; i <= daysOfNextMonth; i++) {
    days.push({
      day: i,
      fullDate: moment(
        new Date(cYear, cMonth + 1, i)
      ).format("DD.MM.YYYY"),
      inActive: true,
    });
  }
  return  days
};






