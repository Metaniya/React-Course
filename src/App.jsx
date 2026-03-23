
import './App.css'
import { useState } from 'react';

function App() {
  const [input, setinput] = useState("");
  const [tasks, setTasks] = useState([]);

   function addTask() {
     if (input.trim() === "") return;

  const newTask = {
    text: input,
    completed: false
  };

  setTasks([...tasks, newTask]);
  setinput("");
  }
   
  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }


  function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);

  if (!newText || newText.trim() === "") return;

  const updatedTasks = [...tasks];
  updatedTasks[index].text = newText;

  setTasks(updatedTasks);
}
    function toggleDone (index) {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }
  return (
  <div className="app">
    <div className="card">
      <h1 id='wellcome title'>React Todo-App</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="task">
              <span
                className={task.completed ? "done" : ""}
              >
                {task.text}
              </span>

              <div className="buttons">
                <button onClick={() => toggleDone(index)}>
                  {task.completed ? "Undo" : "✅"}
                </button>

                <button onClick={() => editTask(index)}>
                  ✏️
                </button>

                <button onClick={() => deleteTask(index)}>
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}



export default App;
