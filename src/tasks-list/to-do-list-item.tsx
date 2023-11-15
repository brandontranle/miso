import React from "react";
import "../style.css";
import ItemCheckbox from "./item-checkbox";
import ItemDeleteButton from "./item-delete";
import ItemEditButton from "./item-edit";
import ItemSaveButton from "./item-save";
import ItemRetrieveButton from "./item-retrieve";
import { useState } from "react";

interface ToDoListItemProps {
  todo: Todo;
  toggleTodo: ToggleTodo;
  deleteTodo: (todoId: string) => void; // Callback to trigger deletion
  editTodo: (todoId: string, text: string) => void; // Callback to trigger editing
  retrieveTodo?: (todoId: string) => void; // Callback to
  isDeleted?: boolean; // Add this optional prop to indicate if the task is deleted
}

export const ToDoListItem: React.FC<ToDoListItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
  retrieveTodo = () => {}, // Set to a no-op function
  isDeleted = false, // Default to false if not provided
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, editedText); // Pass the edited text to the parent component
    setIsEditing(false);
  };

  /*
  const handleCheckboxChange = () => {
    toggleTodo({
      ...todo,
      complete: !todo.complete,
    });
    alert("Todo checkbox has been modified");
  };*/

  return (
    <div className="item-wrapper">
      <ItemCheckbox checked={todo.complete} onClick={() => toggleTodo(todo)} />
      {isEditing ? (
        <form
          onSubmit={handleSave}
          style={{ display: "flex", width: "100%", fontSize: "14px" }}
        >
          {" "}
          {/* Make sure to style your form appropriately */}
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            style={{ flexGrow: 1 }} // Add any additional styles as needed
          />
          <ItemSaveButton onClick={handleSave} />{" "}
          {/* This button will now trigger form submission */}
        </form>
      ) : (
        <div
          className="to-do-list-item"
          style={{ textDecoration: todo.complete ? "line-through" : undefined }}
        >
          <div className="text-content">{todo.text}</div>
        </div>
      )}
      {!isEditing && !isDeleted && (
        <>
          <ItemEditButton onClick={handleEdit} />
          <ItemDeleteButton onClick={() => deleteTodo(todo.id)} />
        </>
      )}{" "}
      {/* Only show the edit and delete buttons if the task is not deleted */}
      {isDeleted && (
        <>
          <ItemRetrieveButton onClick={() => retrieveTodo(todo.id)} />
          <ItemDeleteButton onClick={() => deleteTodo(todo.id)} />
        </>
      )}
    </div>
  );
};
