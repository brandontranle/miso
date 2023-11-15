type Todo = {
    text: string;
    complete: boolean;
    id: string;

};

type ToggleTodo = (selectedTodo: Todo) => void;

type AddTodo = (newTodo: string) => void;

type DeleteTodo = (deleteTodo: Todo) => void;

type EditTodo = (editTodo: Todo) => void;


