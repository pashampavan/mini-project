import React,{useContext, useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom';
import context from '../context/useContext';
import Alert from './Alert';
export default function Navbar() {
  const {login,setLogin,showAlert,setSong}=useContext(context);
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
  },[])
  const handleClick=()=>{
    localStorage.removeItem('user');
    setLogin(false);
    setSong(false);
    history.push("/");
    showAlert("logout successfully.","green")
  }
  return (
    <>
    <section className="nav">
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
    <div style={{"height":"50px","marginTop":"20px"}}>
        <Alert/>
    </div>
    </>
  )
}
