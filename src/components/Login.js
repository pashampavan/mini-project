import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/useContext';
export default function Login() {
  const { login,setLogin ,getUser,showAlert} = useContext(context)
  const [cred, setCred] = useState({ "rollNo": "", "password": "" });
  const history = useHistory();
  useEffect(() => {
      if(login || JSON.parse(localStorage.getItem('user')))
      {
        history.push("/account");
      }
  }, [])
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(cred);
    console.log("clicked");
    const r=await getUser(cred.rollNo,cred.password);
    if(r)
    {
      showAlert("Login successfully .","green");
      history.push("/account");
    }
    else
    {
      showAlert("Incorrect login credentials.","red");
    }
  }


  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }


    return (
      <section className="signupcontainer">
        <h1 style={{ "color": 'white' }}>login</h1>
        <form onSubmit={onSubmit} >
          <div >
            <input type="text" id="rollNo" name='rollNo' value={cred.roll} onChange={onChange} placeholder='Enter your roll number...' />
          </div>
          <div >
            <input type="password" name="password" value={cred.password} onChange={onChange} placeholder="enter password..." />
          </div>
          <button type="submit" className="btn">login</button>
        </form>
      </section>
    )
  }
