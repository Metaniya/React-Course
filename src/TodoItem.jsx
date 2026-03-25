
function TodoItem({ task, index, onToggle, onEdit, onDelete }) {
  return (
    <li className="task">
      <span className={task.completed ? "done" : ""}>
        {task.text}
      </span>

      <div className="buttons">
        {/* We pass the index back up to the parent functions */}
        <button onClick={() => onToggle(index)}>
          {task.completed ? "Undo" : "✅"}
        </button>

        <button onClick={() => onEdit(index)}>
          ✏️
        </button>

        <button onClick={() => onDelete(index)}>
          ❌
        </button>
      </div>
    </li>
  );
}

export default TodoItem;