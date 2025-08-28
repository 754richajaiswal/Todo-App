import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSave, FaCheck, FaUndo, FaSun, FaMoon} from "react-icons/fa";
import "./TodoApp.css";

const TodoApp = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("")
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    const addTask = () => {
        if(task.trim() ==="") return;
        const newTask = { text: task, completed: false};
        setTasks([...tasks, newTask]);
        setTask("");
    };

    const startEditing = (index, currentText) => {
        setEditIndex(index);
        setEditText(currentText);
    };

    const saveTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].text = editText;
        setTasks(newTasks);
        setEditIndex(null);
        setEditText("");
    };

    const toggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const deleteTask = (index) =>{
        const newTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(newTasks);
    }
    
  return (
    <div className={`app-container ${isDarkMode ? "" : "light-mode"}`}>
        <div className="theme-toggle">
            <button onClick={toggleTheme}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
        </div>
      <header className='app-header'><h1>My To-Do List</h1></header>
      <div className="input-section">
        <input type="text" placeholder='Enter a new task...' value={task}
         onChange={(e) => setTask(e.target.value)}
         onKeyDown={(e) => e.key === "Enter" && addTask()} />
       
        <button onClick={addTask}><FaPlus /></button>
      </div>
      {tasks.length === 0 ? (
        <p className='empty-msg'>No tasks yet. Add one </p>
      ):(
       <ul className='task-list'>
            {tasks.map((item, index) => (
                <li key={index} className={item.completed ? "completed" : ""}>
                    {editIndex === index ? (
                        <input type="text" value={editText}
                         onChange={(e) => setEditText(e.target.value)} />
                    ) : (
                 <span>{item.text}</span>
                 )}
                 <div className="actions">
                    {editIndex === index ? (
                        <button onClick={() => saveTask(index)} title='Save'><FaSave /></button>
                    ):(
                        <button onClick={() => startEditing(index, item.text)} title='Edit'><FaEdit /></button>
                    )}
                    <button onClick={() => toggleComplete(index)} title={item.completed ? "Undo" : "Done"}>{item.completed ? <FaUndo /> : <FaCheck />}</button>
                    <button onClick={() => deleteTask(index)} title='Delete'><FaTrash /></button>
                 </div>
                </li>
            ))}
        </ul>
        )}
        {tasks.length > 0 && (
            <button className='clear-btn' onClick={() => setTasks([])}>Clear All</button>
        )}
    </div>
  )
}

export default TodoApp
