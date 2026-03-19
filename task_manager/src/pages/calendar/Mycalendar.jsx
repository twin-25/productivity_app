import React, { useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import './mycalendar.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import {format, parse, getDay} from 'date-fns';
import startOfWeek from 'date-fns/startOfWeek'
import enUS from 'date-fns/locale/en-US'
import { useGetEventQuery } from '../../services/CalendarEventApi';
import {EventModal} from '../../components/eventModal/EventModal'


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
  const {data:eventData} = useGetEventQuery()
  const [modalOpen, setModalOpen] = useState(false)
const [editingEvent, setEditingEvent] = useState(null)
const [selectedStart, setSelectedStart] = useState(null)

  const calendarEvents = eventData?.map((event) =>({
    id: event.id,
    title: event.title,
    start: new Date(event.start_date),
    end: new Date(event.end_date)
  })
) || []

  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH)

  const handleSelectSlot = (slotInfo) =>{
    setEditingEvent(null)
    setSelectedStart(slotInfo.start)
    setModalOpen(true)
  };

  const handleSelectEvent = (event) =>{
    setEditingEvent(event)
    setModalOpen(true)
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
          events={calendarEvents}
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
        <EventModal
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    initialData={editingEvent}
    selectedStart={selectedStart}
/>
      </div>
    </div>
  )
}

export default Mycalendar