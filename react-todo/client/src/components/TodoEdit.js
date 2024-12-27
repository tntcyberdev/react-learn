import React, { useState } from 'react';

const TodoEdit = ({todo, onSubmit}) => {
    const [title, setTitle] = useState(todo.title);

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log('Debug submitting SAVE', todo.title); //Debugging

        e.preventDefault();
        onSubmit(todo.id, title);
    }

    return (
        <form className ="todo-edit" onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleChange} />
            <button type="submit">SAVE</button>
        </form>
    )
  };
  
  export default TodoEdit;