import TodoEdit from './TodoEdit';
import { useState } from 'react';

const TodoShow = ({todo, removeTodo, changeTodo}) => {
    const [showEdit, setShowEdit] = useState(false);
    
    const handleEdit = () => {
        console.log('Debug onClick Edit', todo.id, todo.title); //Debugging

      setShowEdit(true);
    }
    const handleDelete = () => {
      removeTodo(todo.id);
    }
    const handleDoubleClick = () => {
      changeTodo(todo.id, todo.title, !todo.completed);
    }
    const handleSubmit = (id, title) => {
        changeTodo(id, title);
        setShowEdit(false);
    }

    if (showEdit) {
      return (
        <li className="todo">
            <TodoEdit todo={todo} onSubmit={handleSubmit}/>
        </li>
      );
    }
    return (
        <li className="todo" onDoubleClick={handleDoubleClick}>
          <p className={todo.completed ? 'completed':'not-completed'}>{todo.title}</p>
      
          <div className="actions">
            <button onClick={handleDelete}>DELETE</button>
            <button onClick={handleEdit}>EDIT</button>            
          </div>
        </li>
      );
  };
  
export default TodoShow;