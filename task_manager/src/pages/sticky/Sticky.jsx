import React, { useState } from 'react'
import './sticky.scss'
import SideBar from '../../components/sidebar/SideBar'
import StickyNote from '../../components/stickyNote/StickyNote'
import StickyModal from '../../components/stickyModal/StickyModal'
import {AddCircleOutlineOutlined} from '@mui/icons-material'

const Sticky = () => {
  const[wall, setWall] = useState(
    [{
      id:1,
      title:"Map sticky note bjsdbcjb sucu ncfj nsjc ihbs dfhibsmb nji sbdcdhi sd",
      content: "follow properly ",
      color: '#fce38a',
    },
    {
      id:2,
      title:"Django BAckend",
      content: "implemennt payment system ",
      color: '#95e1d3',
    },
    {
      id:3,
      title:"Get a Job",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam voluptas obcaecati laboriosam quibusdam accusamus dolores, mollitia optio sit. Vitae cupiditate voluptate, voluptatum accusamus aut enim nemo dolorem autem quos delectus! bjcbjbjhicb ihjabchjibhaabchbancbnbchibai bcy isb",
      color: '#fce38a',
    }
  
  
  ]
  );
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
  const handleSubmit = (data) =>{
    if(editingNote){
      setWall((prev)=>{
        prev.map((note) => note.id === editingNote.id? {...note, ...data}: note );
      });
    }
    else{
      const newNote = {
        id : wall.length +1,
        ...data,
      };
      setWall((prev)=>[...prev, newNote])
    }
    closeModal();
  };

  const handleDelete = (id) =>{
    if(window.confirm("Are you sure you want to delete?")){
      setWall((prev) => prev.filter((note) => note.id !== id));
    }
  }

  return (
    <div className='sticky'>
      <SideBar />
      <div className="sticky-container">
        <p className="title">Sticky Wall</p>
        <div className="row">
          {
            wall.map((note) =>(
              <StickyNote 
              key={note.id}
              title = {note.title}
              content = {note.content}
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