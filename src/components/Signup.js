import React, { useState,useContext,useEffect } from "react";
import context from "../context/useContext";
import { useHistory } from "react-router-dom";
export default function Signup() {
  const history=useHistory();
  const {login,setLogin ,showAlert} = useContext(context)
  const [user, setUser] = useState({ "name": "", "email": "", "date": "", "rollNo": "", "password": "","cpassword":"" });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if(login || JSON.parse(localStorage.getItem('user')))
    {
      history.push("/account");
    }
}, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(user.password!==user.cpassword)
    {
      return showAlert("Password not matched.","red")
    }
    const response = await fetch("http://localhost:74/sign", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "name":user.name,"rollNo": user.rollNo, "password": user.password,"email":user.email,"date":user.date })
    });
    console.log("called"+user);
    const json = await response.json();
    if (json.success) {
      console.log(json.user);
      localStorage.setItem('user', JSON.stringify(json.user));
      showAlert("successfully Signedup.","green");
      history.push("/account");
      setLogin(true);
      
    }
    else {
      console.log("not found");
      showAlert(json.msg,"red");
    }
  }
  return (
    <section className="signupcontainer">
      <h1 style={{ color: "white" }}>Registor for pin bank of vasavi</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input type="text" autoComplete="off" name="name" onChange={onChange} placeholder="Enter your name.." minLength={3} required />
        </div>
        <div className="">
          <input autoComplete="off" type="email" name="email" onChange={onChange} placeholder="Enter your email.." required />
        </div>
        <div className="">
          <input type="date" autoComplete="off" name="date" onChange={onChange} placeholder="Enter your date.." required />
        </div>
        <div className="">
          <input
            type="text"
            name="rollNo"
            onChange={onChange}
            autoComplete="off"
            required
            placeholder="Enter your roll number.."
            minLength={5} 
          />
        </div>
        <div className="">
          <input
            type="password"
            onChange={onChange}
            required
            autoComplete="off"
            name="password"
            placeholder="Enter your password.."
            minLength={5}
          />
        </div>
        <div className="">
          <input
            type="password"
            onChange={onChange}
            required
            autoComplete="off"
            name="cpassword"
            placeholder="Enter your password again.."
            minLength={5}
          />
        </div>
        <button type="submit" className="btn">signup</button>
      </form>
    </section>
  );
}
