import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css';

export default ({label, id, deleteTarea}) => (
    <div className="notarea">
       <p className="pa">#{id}    {label}</p> 
       <div><button className="fas fa-trash-alt trash" onClick={() => deleteTarea(id)}/></div>
    </div>)

