import { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import Modal from './components/Modal'; // Import Modal
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToggle } from './hooks/useToggle'; // Import useToggle

function App() {
  const [input, setinput] = useState("");
  const [tasks, setTasks] = useLocalStorage('my-tasks', []);
  
 
  const [isModalOpen, toggleModal] = useToggle(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  function addTask() {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setinput("");
  }

  // Modernized Edit, Open the Modal instead of using prompt()
  function openEditModal(index) {
    setEditingIndex(index);
    setEditText(tasks[index].text);
    toggleModal(); 
  }

  function saveEdit() {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editText;
    setTasks(updatedTasks);
    toggleModal(); 
  }

 
  function deleteTask(index) { setTasks(tasks.filter((_, i) => i !== index)); }
  function toggleDone(index) {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  return (
    <div className="app">
      <div className="card">
        <h1>React Todo-App</h1>
        <div className="input-group">
          <input value={input} onChange={(e) => setinput(e.target.value)} placeholder="Add a task..." />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <TodoItem 
              key={index} 
              task={task} 
              index={index} 
              onToggle={toggleDone} 
              onEdit={() => openEditModal(index)} // Trigger Modal
              onDelete={deleteTask} 
            />
          ))}
        </ul>

  
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <h2>Edit Task</h2>
          <input 
            className="modal-input"
            value={editText} 
            onChange={(e) => setEditText(e.target.value)} 
          />
          <button className="save-btn" onClick={saveEdit}>Save Changes</button>
        </Modal>
      </div>
    </div>
  );
}

export default App;