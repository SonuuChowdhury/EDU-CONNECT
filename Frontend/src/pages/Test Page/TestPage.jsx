import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling
import './TestPage.css';

const MarkedDatesCalendar = () => {
  const greenDates = ['2024-11-25', '2024-11-28']; // Green marked dates
  const redDates = ['2024-11-20', '2024-11-30'];   // Red marked dates

  const isGreenDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    return greenDates.includes(formattedDate);
  };

  const isRedDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return redDates.includes(formattedDate);
  };

  return (
    <Calendar
      tileClassName={({ date, view }) => {
        if (view === 'month') {
          if (isGreenDate(date)) return 'highlight-green';
          if (isRedDate(date)) return 'highlight-red';
        }
        return null;
      }}
      onChange={null}
    />
  );
};

export default MarkedDatesCalendar;
