import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  returnWeekDayName( weekDay ) {
    switch ( weekDay ) {
      case 0: return "Воскресенье"
      case 1: return "Понедельник"
      case 2: return "Вторник"
      case 3: return "Среда"
      case 4: return "Четверг"
      case 5: return "Пятница"
      case 6: return "Суббота"
    }
  }

  returnMonthName( month ) {
    switch ( month ) {
      case 0: return "Январь"
      case 1: return "Февраль"
      case 2: return "Март"
      case 3: return "Апрель"
      case 4: return "Май"
      case 5: return "Июнь"
      case 6: return "Июль"
      case 7: return "Август"
      case 8: return "Сентябрь"
      case 9: return "Октябрь"
      case 10: return "Ноябрь"
      case 11: return "Декабрь"
    }
  }

  dateTreatment() {
    this.listOfCalendarDates = [];
    const { date } = this.props;
    this.today = date.getDate()
    this.currentWeekDayName = this.returnWeekDayName( date.getDay() );
    this.currentMonth = date.getMonth();
    this.currentMonthName = this.returnMonthName( this.currentMonth );
    this.currentYear = date.getFullYear();
    this.daysInCurrentMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.currentMonthFirstDayWeek = new Date(this.currentYear, this.currentMonth, 1).getDay();
    this.currentMonthLastDayWeek = new Date(this.currentYear, this.currentMonth, this.daysInCurrentMonth).getDay();

    // Add dates for before current Month
    if ( this.currentMonthFirstDayWeek > 0) {
      const previousMonth = this.currentMonth > 0 ? this.currentMonth - 1 : 11;
      const previousYear = this.currentMonth > 0 ? this.currentYear : this.currentYear - 1;
      const daysInPreviousMonth = new Date(previousYear, previousMonth + 1, 0).getDate();
      for ( let i = this.currentMonthFirstDayWeek - 1; i > 0; i-- ) {
        this.listOfCalendarDates.push(
            <td className="ui-datepicker-other-month" key={ daysInPreviousMonth - i }>{ daysInPreviousMonth - i }</td>
        );
      }
    }

    // Add dates for current Month
    for ( let i = 1; i <= this.daysInCurrentMonth; i++ ) {
      this.listOfCalendarDates.push(
          i === this.today ? <td className="ui-datepicker-today" key={ i }>{ i }</td> : <td key={ i }>{ i }</td>
      );
    }

    // Add dates for next Month
    if ( this.currentMonthLastDayWeek < 6 ) {
      for ( let i =  1; i < ( 8 - this.currentMonthLastDayWeek ); i++ ) {
        this.listOfCalendarDates.push(<td className="ui-datepicker-other-month" key={ i }>{ i }</td>);
      }
    }

    // Prepare HTML for calendar
    this.finalListOfCalendarDates = [];
    for ( let i = 0; i <= Math.ceil(this.listOfCalendarDates.length / 7); i++ ) {
      this.finalListOfCalendarDates.push(
          <tr key={ i }>{ this.listOfCalendarDates.slice(i * 7, i * 7 + 7) }</tr>
      )
    }
  }

  render() {
    this.dateTreatment();
    return (
        <div className="ui-datepicker">
          <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{ this.currentWeekDayName }</div>
            <div className="ui-datepicker-material-date">
              <div className="ui-datepicker-material-day-num">{ this.today }</div>
              <div className="ui-datepicker-material-month">{ this.currentMonthName }</div>
              <div className="ui-datepicker-material-year">{ this.currentYear }</div>
            </div>
          </div>
          <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
              <span className="ui-datepicker-month">{ this.currentMonthName }</span>&nbsp;<span className="ui-datepicker-year">{ this.currentYear }</span>
            </div>
          </div>
          <table className="ui-datepicker-calendar">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="ui-datepicker-week-end" />
              <col className="ui-datepicker-week-end" />
            </colgroup>
            <thead>
            <tr>
              <th scope="col" title="Понедельник">Пн</th>
              <th scope="col" title="Вторник">Вт</th>
              <th scope="col" title="Среда">Ср</th>
              <th scope="col" title="Четверг">Чт</th>
              <th scope="col" title="Пятница">Пт</th>
              <th scope="col" title="Суббота">Сб</th>
              <th scope="col" title="Воскресенье">Вс</th>
            </tr>
            </thead>
            <tbody>{ this.finalListOfCalendarDates }</tbody>
          </table>
        </div>
    );
  }
}

function App() {
  return (
      <Calendar date={ new Date() } />
  );
}

export default App;

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date)
};
