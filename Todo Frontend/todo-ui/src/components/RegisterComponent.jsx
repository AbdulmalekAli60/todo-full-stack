import { useState } from "react";
import { register } from "../services/AuthService";
export default function RegisterComponent() {
  const [registerationInfo, setRegisterationInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Event handleing
  function handleRegestirClick(e) {
    e.preventDefault()
    register({...registerationInfo}).then((response) => {
        console.log("user with these info: ",response.data,response.status ,"has been created")
    }).catch((error) => {
        console.error(error)
    })
    console.log({...registerationInfo})
  }
  // Event Handling

  return (
    <div className="container mb-3">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Regesteration Form</h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Name</label>

                  <div className="col-md-9">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      value={registerationInfo.name}
                      onChange={(e) =>
                        setRegisterationInfo({
                          ...registerationInfo,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Username</label>

                  <div className="col-md-9">
                    <input
                      type="text"
                      name="userName"
                      className="form-control"
                      placeholder="Enter username"
                      value={registerationInfo.username}
                      onChange={(e) =>
                        setRegisterationInfo({
                          ...registerationInfo,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Email</label>

                  <div className="col-md-9">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={registerationInfo.email}
                      onChange={(e) =>
                        setRegisterationInfo({
                          ...registerationInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>

                  <div className="col-md-9">
                    <input
                    //make type password
                      type="text"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={registerationInfo.password}
                      onChange={(e) =>
                        setRegisterationInfo({
                          ...registerationInfo,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                <button
                  className="btn btn-info w-100"
                  onClick={(e) => handleRegestirClick(e)}
                >
                  Register
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
