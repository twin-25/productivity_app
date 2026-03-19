import React, { useState } from 'react'
import './sticky.scss'
import SideBar from '../../components/sidebar/SideBar'
import StickyNote from '../../components/stickyNote/StickyNote'
import StickyModal from '../../components/stickyModal/StickyModal'
import {AddCircleOutlineOutlined} from '@mui/icons-material'
import { useCreateNoteMutation, useDeleteNoteMutation, useGetNotesQuery, useUpdateNoteMutation } from '../../services/StickyNoteApi'
import Loader from '../../components/Loader'

const Sticky = () => {
  const {data:noteData, isLoading} = useGetNotesQuery()
  const [createNote, {isLoading:createLoading}] = useCreateNoteMutation()
  const [updateNote] = useUpdateNoteMutation()
  const [deleteNote] = useDeleteNoteMutation()
  const [error, setError] =  useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const[editingNote,setEditingNote] = useState(null);
  const openAddModal= () =>{
    setEditingNote(null);
    setModalOpen(true);
  };
  const openEditModal = (note) =>{
    setEditingNote(note)
    setModalOpen(true)
  };
  const closeModal = () =>{
    setModalOpen(false);

  };
  const handleSubmit = async(noteData) =>{

    try{
      if(editingNote){
        await updateNote({pk: editingNote.id, ...noteData}).unwrap()
      } else{
        await createNote(noteData).unwrap()
      }
      closeModal()
    }catch(err){
      setError(err.data?.detail||'Update failed')
    }

  };

   const handleDelete = async (id) => {
    try {
      await deleteNote(id).unwrap();
      closeModal()
    } catch (err) {
      setError(err.data?.detail || "Delete Failed");
    }
  };

  return (
    <div className='sticky'>
      <SideBar />
      <div className="sticky-container">
        <p className="title">Sticky Wall</p>
        <div className="row">
          {isLoading && <Loader/>}
          {
            noteData?.map((note) =>(
              <StickyNote 
              key={note.id}
              title = {note.title}
              content = {note.description}
              color = {note.color}
              onEdit = {()=>openEditModal(note)}
              onDelete = {() =>handleDelete(note.id)}
/>
            ))
          }
          <div className="stickynote addnote"
            style={{
              cursor:"pointer",
              backgroundColor:"lightgrey"
            }}
            onClick={openAddModal}
          >
            {createLoading && <Loader/>}
            <AddCircleOutlineOutlined className='icon'/>
          </div>
        </div>
      </div>
      <StickyModal 
      open={modalOpen} 
      onClose={closeModal} 
      onSubmit={handleSubmit}
      initialData = {editingNote}/>
    </div>
  )
}

export default Sticky