import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, savedLoggedInUser, storeToken } from "../services/AuthService";

export default function LoginComponent() {
  const [loginInfo, setLoginInfo] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const navigator = useNavigate();

  //event handlers
  async function handleLoginClick(e) {
    e.preventDefault();
    
    
    console.log('Attempting login with:', loginInfo);
    
   await login({...loginInfo})
        .then((response) => {
            console.log("Login response:", response.data);
            
            try {
                // const generatedToken = 'Basic ' + window.btoa(loginInfo.usernameOrEmail + ":" + loginInfo.password);
                const token = 'Bearer ' + response.data.accessToken;
                const role = response.data.role;
                console.log('JWT token:', token);
                console.log('Role is ===> :', role);
                console.log("login response:",response)
                
                storeToken(token);
                savedLoggedInUser(loginInfo.usernameOrEmail,role)
                
                // verify token was stored
                const storedToken = localStorage.getItem('token');
                console.log('Stored token:', storedToken);
                
                if (storedToken) {
                    navigator("/todos");
                    window.location.reload(false)
                } else {
                    console.error('Token was not stored in localStorage');
                }
            } catch (error) {
                console.error('Error during token generation/storage:', error);
            }
        })
        .catch((error) => {
            console.error('Login API error:', error.response?.data || error.message);
        });
}
  //event handlers
  return (
    <div className="container mb-3">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Log in Form</h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Email</label>

                  <div className="col-md-9">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name or Email"
                      value={loginInfo.usernameOrEmail}
                      onChange={(e) =>
                        setLoginInfo({
                          ...loginInfo,
                          usernameOrEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>

                  <div className="col-md-9">
                    <input
                      type="text"
                      name="userName"
                      className="form-control"
                      placeholder="Enter Password"
                      value={loginInfo.username}
                      onChange={(e) =>
                        setLoginInfo({
                          ...loginInfo,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <button
                    className="btn btn-info w-100"
                    onClick={(e) => handleLoginClick(e)}
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
