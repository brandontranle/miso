import react from "react";
import "../style.css";
import { ToDoListItem } from "./to-do-list-item";
import ItemEditButton from "./item-edit";

interface ToDoListProps {
  todos: Array<Todo>;
  toggleTodo: ToggleTodo;
  deleteTodo: (todoId: string) => void; // Callback to trigger task deletion
  editTodo: (todoId: string, text: string) => void; // Callback to trigger task editing
}

export const ToDoList: React.FC<ToDoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <ToDoListItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            retrieveTodo={() => {}}
          />
        );
      })}
    </ul>
  );
};

export default ToDoList;
