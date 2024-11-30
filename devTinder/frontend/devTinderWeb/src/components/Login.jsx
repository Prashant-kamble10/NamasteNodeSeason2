import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";





const Login = () => {
  const [emailId, setEmailId] = useState("virat@gmail.com")
  const [password, setPassword] = useState("ViraT@1881")
   const [err, setErr] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async ()=>{
      try{
       const res = await axios.post(`${BASE_URL}/login`, {
        emailId,
        password
       }, {withCredentials : true})
      //  console.log(res.data)
       dispatch(addUser(res.data))
       return navigate("/feed")
      }catch(error){
       setErr(error?.response?.data || "Something went wrong")
      }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                placeholder="abc@gmail.com"
                value={emailId}
                onChange={(e)=>{setEmailId(e.target.value)}}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">password</span>
              </div>
              <input
                type="text"
                placeholder="********"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-500">{err}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
