import React, { useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import './mycalendar.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import {format, parse, getDay, addDays } from 'date-fns';
import startOfWeek from 'date-fns/startOfWeek'
import enUS from 'date-fns/locale/en-US'


const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


const Mycalendar = () => {
  const [events, SetEvents] = useState([
    {
      title: 'Design Meeting',
      start : new Date(),
      end: addDays(new Date(), 1),
      allDay: true,
    },
    {
      title: 'Demo Presentation',
      start : addDays(new Date(), 2),
      end: addDays(new Date(), 2),
      allDay: true,
    },
  ]);
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH)

  const handleSelectSlot = ({start}) =>{
    const title = prompt("Enter a Title For Your Event");
    if(!title || title.trim() === "") return;

    const newEvents = {
    title,
    start,
    end: addDays(start),
    allDay: true,
  };
  SetEvents((prev) =>[...prev, newEvents]);
  };

  const handleSelectEvent = (event) =>{
    alert(`Event: ${event.title}`);
  }

  return (
    <div className='calendar'>
      <SideBar />
      <div className="my-calendar"
        style={{
          padding: "20px",
        }}
      >
        <h1>Calender</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          style={{ height: 500 }}
          views={["month", "week", "day", "agenda"]}
          view = {currentView}
          onView={setCurrentView}
          onNavigate={setDate}
          date={date}
        />
      </div>
    </div>
  )
}

export default Mycalendar