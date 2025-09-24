import React from 'react'
import './stickynote.scss'
import {Delete, Edit} from '@mui/icons-material'

const StickyNote = ({title, content, color, onEdit, onDelete}) => {
  return (
    <div className="stickynote" style={{backgroundColor: color}}>
      <div className="stickynote-header">
        <h3 className="stickynote-title">{title}</h3>
        <div className="stickynote-icon">
          <Edit className='icon' onClick={onEdit} titleAccess='Edit'/>
          <Delete className='icon' onClick={onDelete} titleAccess='Delete'/>
        </div>
      </div>
      <div className="stickynote-body">
        <p>{content}</p>
      </div>
    </div>

  )
}

export default StickyNote