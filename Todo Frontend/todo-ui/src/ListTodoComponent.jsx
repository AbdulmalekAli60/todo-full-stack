import { useEffect, useState } from "react";
import {
  deleteTodoById,
  getAllTodos,
  toggleCompleteTodo,
} from "./services/TodoService";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "./services/AuthService";

export default function ListTodoComponent() {
  const [todos, setTodos] = useState([]); // initialize as an empty array
  const navigator = useNavigate();

  const isUserAdmin = isAdmin();

  console.log("is admin =====> ", isUserAdmin);

  function ListTodos() {
    getAllTodos()
      .then((response) => {
        console.log(response);
        // directly set the response data array to todos
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    ListTodos();
  }, []);

  // Event Handling
  function handleAddTodo() {
    navigator("/add-todo");
  }

  function updateTodo(todoId) {
    navigator(`/update-todo/${todoId}`);
    console.log(todoId);
  }

  function deleteTodo(id) {
    deleteTodoById(id)
      .then((response) => {
        console.log("The todo:", response, "Has Been deleted");
        // Filter out the deleted todo from the current todos state
        setTodos(todos.filter((todo) => todo.id !== id)); // filter todos to remove the deleted todo, or we can call ListTodo()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleCompleteStatus(id) {
    toggleCompleteTodo(id)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        ListTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Event Handling

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center">List of todos</h2>

      {isUserAdmin && (
        <button className="btn btn-primary mb-2" onClick={handleAddTodo}>
          Add Todo
        </button>
      )}

      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td className="text-center">
                  {t.complete ? "Completed" : "Not Completed"}
                </td>
                <td>
                  {/* Buttons container */}
                  <div className="d-flex justify-content-between gap-1  align-items-center">
                    {isUserAdmin && (
                      <button
                        className="btn btn-info w-100 "
                        onClick={() => updateTodo(t.id)}
                      >
                        Update
                      </button>
                    )}

                    {isUserAdmin && (
                      <button
                        className="btn btn-danger w-100 "
                        onClick={() => deleteTodo(t.id)}
                      >
                        Delete
                      </button>
                    )}

                    <button
                      className={`${
                        t.complete ? "btn btn-danger" : "btn btn-success"
                      } w-100 mw-100px`}
                      onClick={() => toggleCompleteStatus(t.id)}
                    >
                      {t.complete ? "Incomplete" : "Complete"}
                    </button>
                  </div>
                  {/* buttons container */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
