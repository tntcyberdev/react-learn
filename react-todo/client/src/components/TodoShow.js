import TodoEdit from './TodoEdit';
import { useState } from 'react';

const TodoShow = ({todo, removeTodo, changeTodo}) => {
    const [showEdit, setShowEdit] = useState(false);
    
    const handleEdit = () => {
      setShowEdit(true);
    }
    const handleDelete = () => {
      removeTodo(todo.id);
    }
    const handleCompletionChange = () => {
      changeTodo(todo.id, todo.title, !todo.completed);
    }
    const handleSubmit = (id, title) => {
        changeTodo(id, title);
        setShowEdit(false);
    }

    if (showEdit) {
      return (
        
          <div className="card-body">
            <TodoEdit todo={todo} onSubmit={handleSubmit}/>
            </div>
        
      );
    }
    return (
      
          <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                  <div className="form-check m-0">
                      <input 
                          className="form-check-input"
                          type="checkbox"
                          checked={todo.completed}
                          onChange={handleCompletionChange}
                          id={`todo-${todo.id}`}
                      />
                  </div>
                  <label 
                      className={`form-check-label m-0 ${todo.completed ? 'text-secondary text-decoration-line-through' : ''}`}
                      htmlFor={`todo-${todo.id}`}
                  >
                      {todo.title}
                  </label>
              </div>
              <div className="btn-group">
                  <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleEdit}
                  >
                      Edit
                  </button>
                  <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleDelete}
                  >
                      Delete
                  </button>
              </div>
          </div>
    
  );
};


export default TodoShow;