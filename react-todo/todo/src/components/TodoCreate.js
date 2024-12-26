import { useState } from 'react';

const TodoCreate = ({createTodo}) => {
    const [title, setTitle] = useState('');
    const handleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        createTodo(title);
        setTitle('');
    }

    return (
        <div>
            <h2>Todo Create</h2>
            <form onSubmit={handleSubmit} className="todo-create">
                <input type="text" name="title" id="title" placeholder="Enter a todo" value={title} onChange={handleChange}/>
            </form>
        </div>           
    )
};
  
export default TodoCreate;