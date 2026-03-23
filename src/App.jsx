
import './App.css'
import { useState } from 'react';

function App() {
  const [input, setinput] = useState("");
  const [tasks, setTasks] = useState([]);

   function addTask() {
    if (input.trim() === "") return; 

     const newTask = {
      text: input,
      compleated: false
     };

     setTasks([...tasks, newTask]);
      setinput("");
  }
   
  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }


   function editTask(index) {
    const newTask = prompt("Edit task:", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
      const newTasks = [...tasks];
      newTasks[index] = newTask;
      setTasks(newTasks);
    }
  }
    function toggleComplete(index) {
    const newTasks = [...tasks];
    newTasks[index].compleated = !newTasks[index].compleated;
    setTasks(newTasks);
  }
  return (
    <div>
      <h1>Welcome to my React TodoApp!</h1>

      <input type="text" 
      placeholder="Add a new task..."  
      value={input} 
      onChange={(e) => 
      setinput(e.target.value)} />

      <button onClick={addTask}>Add Task</button>

       {tasks.length === 0 && <p>No tasks yet!</p>}

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span style={{ textDecoration: task.compleated ? "line-through" : "none" }}>
              {task.text}
            </span>
            <button onClick={() => toggleComplete(index)}>
              {task.compleated ? "Undo" : "Complete"}
            </button> 


            <button onClick={() => deleteTask(index)}>Delete</button>
            
            <button onClick={() => editTask(index)}>Edit</button>

          </li>
        ))}
      </ul>

    </div>

  );

}  


export default App;
