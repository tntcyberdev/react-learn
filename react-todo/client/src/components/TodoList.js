import { useState, useEffect } from 'react';
import axios from 'axios';

import TodoShow from "./TodoShow";
import TodoCreate from "./TodoCreate";

const TodoList = () => {
    const [username, setUsername] = useState(null);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const token = localStorage.getItem("token");  
            const response = await axios.get("http://localhost:5000/todos",{
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos(response.data);  
            console.log(response.data);//debug 
        }
        catch (err) {
            alert("Unauthorized! Please login.");
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const username = localStorage.getItem("user");
                setUsername(username);
            } catch (err) {
                alert("Unauthorized! Please login." , err);
            }
        };

        fetchUserInfo();
    }, []);

    const createTodo = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/todos", {
                title: newTodo,
            },{
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTodos();
            setNewTodo("");
        } catch (err) {
            alert("Failed to create todo!");
        }
    }

    const updateTodo = async (id, title, completed) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/todos/${id}`, {
                title,
                completed,
            },{
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTodos();
            setEditingTodo(null);
        } catch (err) {
            alert("Failed to update todo!");
        }
    };

    const deleteTodo = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/todos/${id}`,{
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTodos();
        } catch (err) {
            alert("Failed to delete todo!");
        }
    };

    
    return (
        <div className="todo-list container mt-4">
            <h2>Todos from {username}</h2>
                <form onSubmit={createTodo} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add new todo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button className="btn btn-primary">Add Todo</button>
                </div>
            </form>
            <ul className="list-group">
                {todos.map((todo) => (
                    <li key={todo.id} className="list-group-item">
                        <TodoShow
                            todo={todo}
                            onUpdate={(id, title, completed) => updateTodo(id, title, completed)}
                            onDelete={() => deleteTodo(todo.id)}
                        />
                       
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
