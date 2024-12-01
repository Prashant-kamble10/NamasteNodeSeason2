import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggingForm, setIsLoggingForm] = useState(true);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      //  console.log(res.data)
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setErr(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoggingForm ? "Login" : "Sign up"}
          </h2>
          <div>
            {!isLoggingForm && (
              <>
                {" "}
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    // placeholder="abc@gmail.com"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    // placeholder="abc@gmail.com"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                placeholder="abc@gmail.com"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">password</span>
              </div>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-500">{err}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoggingForm ? handleLogin : handleSignup}
            >
              {isLoggingForm ? "Login" : "Sign up"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoggingForm((value) => !value)}
          >
            {isLoggingForm
              ? "New user, Signup here"
              : "Existing user, Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
