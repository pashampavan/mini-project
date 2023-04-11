import React, { useState,useContext,useEffect } from "react";
import context from "../context/useContext";
import { useHistory } from "react-router-dom";
export default function Signup() {
  const history=useHistory();
  const {login,setLogin ,showAlert,getOtp} = useContext(context)
  const [user, setUser] = useState({ "name": "", "email": "", "date": "", "rollNo": "", "password": "","cpassword":"" });
  // const [ot, setOt] = useState(null);
  const [cotp,setCotp]=useState(null);
  const [code,setCode]=useState(null);
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    setCode(null);
}, [])
  const handleSubmit = async () => {
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
      document.getElementById('form').style.display="block";
      document.getElementById('otp').style.display="none";
      setLogin(true);
      
    }
    else {
      console.log("not found");
      showAlert(json.msg,"red");
      document.getElementById('form').style.display="block";
      document.getElementById('otp').style.display="none";
    }
  }
  
  const sendOtp=async (e)=>{


    const btn=document.getElementById('btn');
    btn.style.boxShadow="0 0 7px 6px aqua";
    btn.style.backgroundColor="aqua";
    setTimeout(()=>{
      btn.style.boxShadow="none";
      btn.style.backgroundColor="transparent";
      document.getElementById('form').style.display="none";
      document.getElementById('otp').style.display="block";
    },1000);

    e.preventDefault();
  const otp=await getOtp(user.email);
  console.log(otp.success);
  if(otp.success)
  {
    setCode(otp.otp);
    // alert(JSON.parse(otp).otp);
  }
  else
  {
    showAlert("Entered otp is wrong","red");
  }
  }
  const createAccount=async ()=>{
      if(cotp===code)
      {
        const w=await handleSubmit();
      }
      else
      {
        alert('Otp Entered is wrong.');
      }
  }
  const fotp=(e)=>{

    setCotp(e.target.value);

  }
  return (
    <section className="signupcontainer">
      <h1 >Sign up</h1>
      <div class="otp" id='otp'>
        <h4>OTP:</h4>
        <p>Enter otp which has sent to registered email address</p>
        <label for="otp">Enter otp: </label>
        <br/>
        <input type="text" name="cotp" id="cotp" value={cotp} onChange={fotp}  required/>
        <button type="button" className="btn" onClick={createAccount} disabled={code?false:true} >Register</button>

      </div>

      <form onSubmit={sendOtp} id='form'>
        <div className="">
          <input type="text" autoComplete="off" name="name" onChange={onChange} placeholder="Name" minLength={3} required />
        </div>
        <div className="">
          <input autoComplete="off" type="email" name="email" onChange={onChange} placeholder="email" required />
        </div>
        <div className="">
          <input type="date" autoComplete="off" name="date" onChange={onChange}  placeholder="dob" required />
        </div>
        <div className="">
          <input
            type="text"
            name="rollNo"
            onChange={onChange}
            autoComplete="off"
            required
            placeholder="Roll number"
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
            placeholder="Password"
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
            placeholder="Re-password"
            minLength={5}
          />
        </div>
        <button type="submit" className="btn" id="btn">signup</button>
      </form>
    </section>
  );
}
