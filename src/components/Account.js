import React, { useEffect, useContext ,useState} from 'react'
import context from '../context/useContext';
import { useHistory,Link } from 'react-router-dom';
export default function Account() {
  const { setLogin ,getUser,showAlert,savings,setSavings} = useContext(context);
  const history = useHistory();
  let user = JSON.parse(localStorage.getItem('user'));
  setSavings(user.savings);
  useEffect( () => {
    console.log("refresh");
    const get=async ()=>{
      const r = await getUser(user.rollNo,user.password);
      user = JSON.parse(localStorage.getItem('user'));
    }
    get();
    setLogin(true);
  }, [])

  function show() {
    const n = document.getElementById("history");
    if (n.style.display == "none") {
      n.style.display = "block";
    }
    else {
      n.style.display = "none";
    }
  }
  const transfer=()=>{
    history.push("/transfer");
  }
  const canteen=()=>{
    history.push("/canteen");
  }
  const cant=()=>{
    history.push("/cant");
  }
  const stationary=()=>{
    history.push("/stationary");
  }
  const juicePoint=()=>{
    history.push("/juicePoint");
  }
  return (
    <>
      <section key={user._id} className="account" style={{"marginTop":"40px"}}>
        <h1>Account details </h1>
        <div className="details" style={{"fontFamily":"'Roboto', sans-serif"}}>
          <h4>Name:  {user.name}</h4>
          <h4>Email:  {user.email}</h4>
          <h4>RollNo:  {user.rollNo}</h4>
          <h4>Dob:  {user.date}</h4>
          <h4>Savings:  <strong style={{"color":"green"}}>{savings}/-</strong></h4>
          <div className="a">
            <Link to="/canteen">Orders</Link>
          </div>
          <button onClick={show} className="btn2">Transaction history</button>
          <button className="btn2">Services</button>
          <div className="s" id="s">
            <section className="service" id="services">
              <form >
                <button onClick={transfer}>Money transfer</button>
              </form>
              <form>
                <button onClick={cant}>Canteen</button>
              </form>
              <form >
                <button onClick={stationary}>Stationary</button>
              </form>
              <form >
                <button onClick={juicePoint}>Juice point</button>
              </form>
            </section>
          </div>
        </div>
      </section>
      <section className="history" key={user.name} id="history">
        <div className="type">
          <h3>Transaction</h3>
          <h3>Name</h3>
          <h3>Amount</h3>
          <h3>Date and time</h3>
        </div>
        {user.history.map((el) => {
          return <div style={{ "color": "white" }} key={el._id} className="box">
            <h4>{el.type}</h4>
            <h4>{el.name}</h4>
            <h4>{el.price}</h4>
            <h4>{el.time}</h4>
          </div>
        })}
      </section>
    </>

  )
}

