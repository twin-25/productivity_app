import React, { useEffect, useState } from 'react'
import './stickymodal.scss'

const StickyModal = ({open, initialData, onSubmit, onClose}) => {
  const[title, setTitle] = useState('');
  const[content, setContent] = useState('');
  const[color, setColor] = useState("#ffeb3b");
  useEffect(() =>{
    if(initialData){
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setColor(initialData.color || "#ffeb3b");
    }
    else{
      setTitle("");
      setContent('');
      setColor("#ffeb3b");
    }

  }, [initialData, open]);

  const handelSubmit = (e) =>{
    e.preventDefault();
    if(!title.trim() || !content.trim()) return;
    onSubmit({title:title.trim(), content: content.trim(), color})
  }
  if (!open) return null;
  return (
    <div className="stickymodal">
      <div className="modal-content" onClick={(e) =>e.stopPropagation()}>
        <h2>{initialData? "Edit Sticky Note" :"Add Sticky Note"}</h2>
        <form onSubmit={handelSubmit}action="">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title}  placeholder='Enter Title'required maxLength={50}
          onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='content'>Content</label>
          <textarea type='text' id='content' value={content} placeholder='e.g Discuss project ideas' required 
          onChange={(e) =>setContent(e.target.value)}
          />
          <label htmlFor="color">Color</label>
          <input type="color"  id="color" value={color} 
          onChange={(e) =>setColor(e.target.value)}
          />
          <button type="submit" className='submit-btn'>{initialData?"Save":"Add"}
          </button>
          <button type="button"className='cancel-btn' onClick={onClose}>Cancel</button>

        </form>
      </div>
    </div>
  )
}

export default StickyModal