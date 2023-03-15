import React,{useContext} from 'react'
import { Link,useHistory } from 'react-router-dom';
import context from '../context/useContext';
import Alert from './Alert';
export default function Navbar() {
  const {login,setLogin,showAlert}=useContext(context);
  const history=useHistory();
  const handleClick=()=>{
    localStorage.removeItem('user');
    setLogin(false);
    history.push("/");
    showAlert("logout successfully.","green")
  }
  return (
    <>
    <section className="nav">
        <div className="logo">
            <img src="https://vce.ac.in/img/vlogo%20-%20Copy.gif" alt=""/>
            <i  className="fa fa-bank " style={{"color":"white"}}></i>
            <h5>PIN BANK OF VASAVI</h5>
        </div>
        <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/">about us</Link></li>
            <li><Link to="/">contact</Link></li>
        </ul>
        {!login?<div className="button"><Link to="/">login</Link><Link to="/signup">signup</Link></div>:<div style={{"marginLeft":"500px","marginRight":"0px"}} className="button">
          <button className='btn' type='button' onClick={handleClick}>logout</button></div>}
    </section>
    <div style={{"height":"40px"}}>
        <Alert/>
    </div>
    </>
  )
}
