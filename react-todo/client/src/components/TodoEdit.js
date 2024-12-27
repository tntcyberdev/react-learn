import React, { useState } from 'react';

const TodoEdit = ({todo, onSubmit}) => {
    const [title, setTitle] = useState(todo.title);

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(todo.id, title);
    }

    return (
        <form className ="d-flex gap-2" onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleChange} className='form-control' placeholder='Edit todo...'/>
            <button type="submit" className='btn btn-primary'>SAVE</button>
        </form>
    )
  };
  
  export default TodoEdit;