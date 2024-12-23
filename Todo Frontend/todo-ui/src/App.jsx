import "./App.css";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodoComponent from "./ListTodoComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoComponent from "./TodoComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";
function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }
  return (
    <>
      <HeaderComponent />
      {/* <div className="mt-4">
        <ListTodoComponent />
      </div> */}
      <FooterComponent />

      <Routes>
        {/* //http://localhost:8080 */}
        <Route path="/" element={<LoginComponent />} />
        {/* //http://localhost:8080/todos */}
        <Route
          path="/todos"
          element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          }
        />

        {/* //http://localhost:8080/add-todo */}
        <Route
          path="/add-todo"
          element={
            <AuthenticatedRoute>
              <TodoComponent title={"Add Todo"} btnText={"Add"} />
            </AuthenticatedRoute>
          }
        />

        {/* //http://localhost:8080/update-todo */}
        <Route
          path="/update-todo/:id"
          element={
            <AuthenticatedRoute>
              <TodoComponent title={"Update Todo"} btnText={"Update"} />
            </AuthenticatedRoute>
          }
        />

        {/* //http://localhost:8080/register*/}
        <Route path="/register" element={<RegisterComponent />} />

        {/* //http://localhost:8080/login*/}
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </>
  );
}

export default App;
