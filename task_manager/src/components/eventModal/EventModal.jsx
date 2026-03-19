import React, { useEffect, useState } from 'react'
import './eventmodal.scss'
import { useCreateEventMutation, useDeleteEventMutation, useUpdateEventMutation } from '../../services/CalendarEventApi';

export const EventModal = ({open, initialData, selectedStart, onClose}) => {
  const[createEvent] = useCreateEventMutation()
  const[updateEvent] = useUpdateEventMutation()
  const[deleteEvent] = useDeleteEventMutation()

  const[title, setTitle] = useState('');
  const[startDate, setStartDate] = useState('');
  const[endDate, setEndDate] = useState('');
  useEffect(() =>{
    if(initialData){
      setTitle(initialData.title || '');
      setStartDate(initialData.start_date|| '');
      setEndDate(initialData.end_date || "");
      setStartDate(selectedStart.toISOString().slice(0, 16));
    }
    else{
      setTitle("");
      setStartDate('');
      setEndDate('');
    }

  }, [initialData, open]);

  const handelSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !startDate) return
    try {
        if (initialData) {
            await updateEvent({
                pk: initialData.id,
                title: title.trim(),
                start_date: startDate,
                end_date: endDate || null
            }).unwrap()
        } else {
            await createEvent({
                title: title.trim(),
                start_date: startDate,
                end_date: endDate || null,
            }).unwrap()
        }
        onClose()
    } catch (err) {
        console.log(err)
    }
}

  const handleDelete = async() =>{
    try{
      await deleteEvent(initialData.id).unwrap()
      onClose()
    }catch(err){
      console.log(err)
    }
  }

  if (!open) return null;

  return (
    <div className="eventmodal">
      <div className="modal-content" onClick={(e) =>e.stopPropagation()}>
        <h2>{initialData? "Edit Event " :"Add Event"}</h2>
        <form onSubmit={handelSubmit}action="">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title}  placeholder='Enter Title'required maxLength={50}
          onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='startDate'>StartDate and Time</label>
          <input 
              type="datetime-local" 
              id='startDate'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}/>

          <label htmlFor='endDate'>EndDate and Time</label>
          <input 
              type="datetime-local" 
              id='endDate'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}/>

          <button type="submit" className='submit-btn'>{initialData?"Save":"Add"}
          </button>
          <button type="button"className='cancel-btn' onClick={onClose}>Cancel</button>
          {initialData && (
    <button type="button" className='delete-btn' onClick={handleDelete}>
        Delete
    </button>
)}

        </form>
      </div>
    </div>
  )
}

export default EventModal