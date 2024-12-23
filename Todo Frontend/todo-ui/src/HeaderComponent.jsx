import { useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "./services/AuthService";

export default function HeaderComponent() {
  const navigator = useNavigate();

  const isAuth = isUserLoggedIn();
  console.log("isAuth ===> ", isAuth);

  function handleLogout() {
    logout();
    navigator("/login")
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div
            className="text-center w-100"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px",
            }}
          >
            <a href="/" className="navbar-brand ">
              Todo App
            </a>

            <div>
              {isAuth && (
                <button
                  className="btn btn-dark text"
                  onClick={() => navigator("/todos")}
                >
                  Todos
                </button>
              )}

              {!isAuth && (
                <button
                  className="btn btn-dark text"
                  onClick={() => navigator("/login")}
                >
                  Login
                </button>
              )}

              {!isAuth && (
                <button
                  className="btn btn-dark text"
                  onClick={() => navigator("/register")}
                >
                  Register
                </button>
              )}

              {isAuth && (
                <button className="btn btn-danger text" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
