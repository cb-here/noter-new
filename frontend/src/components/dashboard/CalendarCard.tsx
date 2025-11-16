import { useState } from 'react';
import styled from 'styled-components';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardCard from '@/components/ui/dashboard-card';

const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <DashboardCard
      title="Calendar"
      icon={<CalendarIcon size={20} />}
      headerAction={
        <StyledTodayButton onClick={handleToday}>
          Today
        </StyledTodayButton>
      }
    >
      <StyledContent>
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="nav-btn" aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <div className="month-year">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button onClick={handleNextMonth} className="nav-btn" aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="calendar-grid">
          <div className="day-names">
            {dayNames.map((day) => (
              <div key={day} className="day-name">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-days">
            {renderCalendar()}
          </div>
        </div>
      </StyledContent>
    </DashboardCard>
  );
};

const StyledTodayButton = styled.button`
  padding: 6px 12px;
  background: rgba(193, 163, 98, 0.1);
  border: 1px solid rgba(193, 163, 98, 0.3);
  border-radius: 6px;
  color: var(--color-primary, #c1a362);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(193, 163, 98, 0.2);
    border-color: var(--color-primary, #c1a362);
  }
`;

const StyledContent = styled.div`
  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(193, 163, 98, 0.2);
    border-radius: 6px;
    color: var(--color-text-primary, #fff);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(193, 163, 98, 0.1);
      border-color: var(--color-primary, #c1a362);
    }
  }

  .month-year {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary, #fff);
  }

  .calendar-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 4px;
  }

  .day-name {
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-secondary, #9ca3af);
    padding: 4px;
  }

  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: var(--color-text-primary, #fff);
    border-radius: 6px;
    transition: all 0.2s ease;
    cursor: pointer;

    &:not(.empty):hover {
      background: rgba(193, 163, 98, 0.1);
    }

    &.empty {
      cursor: default;
    }

    &.today {
      background: var(--color-primary, #c1a362);
      color: #212121;
      font-weight: 700;

      &:hover {
        background: var(--color-primary, #c1a362);
        opacity: 0.9;
      }
    }
  }
`;

export default CalendarCard;
