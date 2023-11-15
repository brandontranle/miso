import React, { useState, ChangeEvent, FormEvent } from "react";
import "../style.css";

interface ToDoFormProps {
  addTodo: AddTodo;
}

export const ToDoListForm: React.FC<ToDoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <form className="to-do-list-form">
      <input
        type="text"
        value={newTodo}
        onChange={handleChange}
        placeholder="add a task!"
      />
      <button className="add-button" type="submit" onClick={handleSubmit}>
        +
      </button>
    </form>
  );
};

export default ToDoListForm;
