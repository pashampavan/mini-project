import React,{useContext, useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom';
import context from '../context/useContext';
import Alert from './Alert';
export default function Navbar() {
  const {login,setLogin,showAlert,setSong,H,setH}=useContext(context);
  const history=useHistory();
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('user')))
    {
      setLogin(true);
    }
    else
    {
      setLogin(false);
    }

    if(!H)
    {
      setTimeout(()=>{
      document.getElementById('T').style.display="none";
      document.getElementById('nav').style.display="flex";
      document.getElementById('Alert').style.display="block";
      document.getElementById('login').style.display="flex";
    },2000)
    setH(true);
    }
  },[])
  const handleClick=()=>{
    localStorage.removeItem('user');
    setLogin(false);
    setSong(false);
    history.push("/");
    showAlert("logout successfully.","green")
  }
  const navBar=()=>{
    alert("we are in navBar");
  }
  return (
    <>
    <div class="T" id="T">
      <img src='./logo.jpg'></img>
      <h1 className='h1'>PIN </h1>
      <h1 className='h2'> BANK</h1>
      <h1 className='h3'> OF </h1>
      <h1 className='h4'>VASAVI</h1>
    </div>
    <section className="nav" id="nav">
        <div className="logo">
            {/* <img src="https://vce.ac.in/img/vlogo%20-%20Copy.gif" alt=""/> */}
            <i  className="fa fa-bank " style={{"color":"white"}}></i>
            {/* <h5>PIN BANK OF VASAVI</h5> */}
        </div>
        <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/">about us</Link></li>
            <li><Link to="/">contact</Link></li>
        </ul>
        {!JSON.parse(localStorage.getItem('user'))?<div className="button"><Link to="/">login</Link><Link to="/signup">signup</Link></div>:<div className="button">
          <button className='btn' type='button' onClick={handleClick}>logout</button></div>}
    </section>
    <div style={{"height":"50px","marginTop":"20px"}} id="Alert">
        <Alert/>
    </div>
    </>
  )
}