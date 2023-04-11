import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/useContext';
export default function Login() {
  const { login, setLogin, getUser, showAlert } = useContext(context)
  const [cred, setCred] = useState({ "rollNo": "", "password": "" });
  const history = useHistory();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      history.push("/account");
    }
    else {
      console.log("not in login");
      setLogin(false);
    }
  }, [])
  const onSubmit = async (e) => {
    e.preventDefault(); 
    const btn = document.getElementById('btn');
    btn.style.boxShadow = "0 0 7px 6px aqua";
    btn.style.backgroundColor = "aqua";
    setTimeout(() => {
      console.log(cred);
      btn.style.boxShadow = "none";
      btn.style.backgroundColor = "transparent";
    }, 1000);
    console.log("clicked");
    const r = await getUser(cred.rollNo, cred.password);
    if (r) {
      showAlert("Login successfully .", "green");
      history.push("/account");
    }
    else {
      showAlert("Incorrect login credentials.", "red");
    }
  }


  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }


  return (
<>
    <section className="signupcontainer">
      <h1 >login</h1>
      <form onSubmit={onSubmit} >
        <div >
          <input type="text" id="rollNo" name='rollNo' value={cred.rollNo} onChange={onChange} placeholder='Roll number' />
        </div>
        <div >
          <input type="password" name="password" value={cred.password} onChange={onChange} placeholder="Enter password" />
        </div>
        <button type="submit" className="btn" id='btn'>login</button>
      </form>
    </section>
</>
  )
}
