import ToDoList from "../tasks-list/to-do-list";
import ToDoListForm from "../tasks-list/to-do-list-form";
import { ToDoListItem } from "../tasks-list/to-do-list-item";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../useUserContext";

const initialTodos: Array<Todo> = [
  { text: "Register an account!", complete: false, id: uuidv4() },
  { text: "Complete your first task!", complete: false, id: uuidv4() },
];

export const TasksWidget = ({ handleMinimize, isMinimized }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [totalTodos, setTotalTodos] = useState(0); // Track total todos
  const { user, isAuthenticated } = useUserContext();
  const [showHistory, setShowHistory] = useState(false);
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTotalTodos = async () => {
    if (isAuthenticated) {
      try {
        const id = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/getTotalTodos",
          {
            userId: id,
          }
        );
        const total = response.data.total;
        setTotalTodos(total);
      } catch (error) {
        console.error("Error fetching total todos:", error);
      }
    }
  };

  const fetchDeletedTodos = async () => {
    if (isAuthenticated) {
      try {
        const id = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/getDeletedTodos",
          {
            userId: id,
          }
        );
        setDeletedTodos(response.data.deletedTodos);
      } catch (error) {
        console.error("Error fetching deleted todos:", error);
      }
    }
  };

  const filteredDeletedTodos = searchTerm
    ? deletedTodos.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : deletedTodos;

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      // Only fetch when we're going to show history
      fetchDeletedTodos();
    }
  };

  const fetchTodos = async () => {
    if (isAuthenticated) {
      try {
        console.log("Starting fetch request");
        const id = sessionStorage.getItem("userId");
        //console.log("id retrieved from storage: " + id);

        const response = await axios.post("http://localhost:5000/getTodos", {
          userId: id,
        });

        const todosFromApi = response.data.todos;
        console.log("Fetched todos:", todosFromApi); // Log fetched todos
        setTodos(todosFromApi);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
  };
  const toggleTodo = async (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });

    if (isAuthenticated) {
      const response = await axios.post("http://localhost:5000/updateTodo", {
        userId: sessionStorage.getItem("userId"),
        todoId: selectedTodo.id,
        todoStatus: !selectedTodo.complete,
      });
      console.log("todo-status updated!");
    }

    setTodos(newTodos);
  };

  const addTodo: AddTodo = async (newTodo) => {
    if (newTodo.trim() !== "") {
      const itemId = uuidv4();
      const newItem = { text: newTodo, complete: false, id: itemId };

      // If there are less than 'tasksPerPage' items on the current page, add the new item to the current page.
      setTodos((prevTodos) => [...prevTodos, newItem]);

      if (isAuthenticated) {
        try {
          console.log("Starting add request");
          const id = sessionStorage.getItem("userId");
          console.log("id retrieved from storage: " + id);

          const response = await axios.post("http://localhost:5000/addTodo", {
            userId: id,
            todo: newItem, // Pass the new item to the server
          });
          fetchTotalTodos(); //  Fetch the total count of todos so that the page updates upon adding
          console.log("Todo added successfully:", response.data);
        } catch (error) {
          alert("Error adding todo: " + error);
          console.error("Error adding todo:", (error as any).message);
        }
      }
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    // Remove the deleted task from the state
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));

    if (isAuthenticated) {
      try {
        console.log("Starting delete request");
        const id = sessionStorage.getItem("userId");
        console.log("id retrieved from storage: " + id);

        console.log(todoId);

        const response = await axios.post("http://localhost:5000/deleteTodo", {
          userId: id,
          todoId: todoId,
        });

        fetchTotalTodos(); // Fetch the total count of todos so that the page updates upon deleton
        console.log("Todo deleted successfully:", response.data);
      } catch (error) {
        alert("Error deleting todo: " + error);
        console.error("Error deleting todo:", (error as any).message);
      }
    }
  };

  const handleEditTodo = async (todoId: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      )
    );

    if (isAuthenticated) {
      try {
        console.log("Starting edit request");
        const id = sessionStorage.getItem("userId");
        console.log("id retrieved from storage: " + id);

        console.log(todoId);

        const response = await axios.post("http://localhost:5000/editTodo", {
          userId: id,
          todoId: todoId,
          newText: newText, // Add this line to send the edited text
        });

        console.log("Todo edited successfully:", response.data);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId ? { ...todo, text: newText } : todo
          )
        );
      } catch (error) {
        alert("Error editing todo: " + error);
        console.error("Error editing todo:", (error as any).message);
      }
    }
  };

  const renderFormOrSearchBar = () => {
    if (showHistory) {
      // If showHistory is true, render the search bar for deleted tasks
      return (
        <form className="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search deleted tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      );
    } else {
      // If showHistory is false, render the form to add tasks
      return <ToDoListForm addTodo={addTodo} />;
    }
  };

  const retrieveDeletedTodo = async (todoId: string) => {
    if (isAuthenticated) {
      try {
        const id = sessionStorage.getItem("userId");
        const response = await axios.post("http://localhost:5000/restoreTodo", {
          userId: id,
          todoId: todoId,
        });

        await fetchDeletedTodos(); // Fetch the deleted todos again
        await fetchTodos();
      } catch (error) {
        console.error("Error retrieving todo:", error);
      }
    }
  };

  const deleteTodoInHistory = async (todoId: string) => {
    if (isAuthenticated) {
      try {
        const id = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/deleteTodoInHistory",
          {
            userId: id,
            todoId: todoId,
          }
        );

        await fetchDeletedTodos(); // Fetch the deleted todos again
        await fetchTodos();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const renderDeletedTasks = () => {
    return (
      <div className="deleted-tasks-container">
        <ul>
          {filteredDeletedTodos.map((todo) => (
            <ToDoListItem
              key={todo.id}
              todo={todo}
              toggleTodo={() => {}} // Provide empty functions or the appropriate ones for deleted tasks
              deleteTodo={deleteTodoInHistory}
              editTodo={() => {}}
              retrieveTodo={retrieveDeletedTodo}
              isDeleted={true}
            />
          ))}
        </ul>
      </div>
    );
  };

  const renderTodosOrHistory = () => {
    if (showHistory) {
      return renderDeletedTasks();
    } else {
      return (
        <ToDoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={handleDeleteTodo}
          editTodo={handleEditTodo}
        />
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      //alert("Authentication successful, retrieved items");
      fetchTodos();
      fetchTotalTodos(); // Fetch the total count of todos
    }
  }, [isAuthenticated, totalTodos]);

  return (
    <div className="tasks-widget">
      <div className="widget-header">
        <p className="widget-title">Tasks</p>
        <button className="minimize-symbol" onClick={() => handleMinimize()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="2"
            viewBox="0 0 15 2"
            fill="none"
          >
            <path
              d="M1.83081 1L14 1"
              stroke="#4E4E4E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="form-container">
          {renderFormOrSearchBar()}
          {isAuthenticated && (
            <button
              className="history-or-add"
              title={`${showHistory ? "Add" : "History"}`}
              onClick={toggleHistory}
            >
              {showHistory ? (
                "Back"
              ) : (
                <svg
                  fill="#000000"
                  height="15px"
                  width="15px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 490.4 490.4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796 s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              )}
            </button>
          )}
        </div>

        <div className="widget-content">{renderTodosOrHistory()}</div>
      </>
    </div>
  );
};

export default TasksWidget;
