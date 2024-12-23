/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  getTodoById,
  newTodoToBeAdded,
  updateTodo,
} from "./services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

export default function TodoComponent({ title, btnText }) {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    complete: false,
  });

  const navigator = useNavigate();

  const { id } = useParams(); // from url

  //Evenet handler

  useEffect(() => {
    // get the existing todo and fill the form with the data so the user can change it
    if (id) {
      getTodoById(id)
        .then((response) => {
          const responseData = response.data;
          setNewTodo({
            title: responseData.title,
            description: responseData.description,
            complete: responseData.complete,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function handleAddNewOrUpdateTodo(e) {
    e.preventDefault();

    if (id) {
      updateTodo(id, newTodo)
        .then((respnse) => {
          navigator("/todos");
        })
        .catch((error) => [console.error(error)]);
    } else {
      console.log("the new todo ====> ", { ...newTodo });

      newTodoToBeAdded(newTodo)
        .then((response) => {
          console.log(
            "New todo has been saved ======> ",
            newTodo,
            "response: ===> ",
            response
          );
          navigator("/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  //Event Handler

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">{title}</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-lable">Todo Title</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Todo title"
                    name="title"
                    value={newTodo.title}
                    onChange={(e) => {
                      setNewTodo({ ...newTodo, title: e.target.value });
                    }}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-lable">Todo Descreption</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Todo Descreption"
                    name="descreption"
                    value={newTodo.description}
                    onChange={(e) => {
                      setNewTodo({ ...newTodo, description: e.target.value });
                    }}
                  />
                </div>

                <div className="form-group mb-2 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="todoComplete"
                    name="complete"
                    checked={newTodo.complete}
                    onChange={(e) => {
                      setNewTodo({ ...newTodo, complete: e.target.checked });
                    }}
                  />
                  <label className="form-check-label" htmlFor="todoComplete">
                    Todo Completed
                  </label>
                </div>

                <button
                  className="btn btn-success w-100"
                  onClick={(e) => handleAddNewOrUpdateTodo(e)}
                >
                  {btnText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
