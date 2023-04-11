import React, { useEffect, useContext ,useState} from 'react'
import context from '../context/useContext';
import { useHistory,Link } from 'react-router-dom';
export default function Account() {
  const { setLogin ,getUser,showAlert,savings,setSavings,song,setSong} = useContext(context);
  const history = useHistory();
  let user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if(!song)
    {
      document.getElementById('mySound').play();
      setSong(true);
    }
    console.log("refresh");
    const get=async ()=>{
      const r = await getUser(user.rollNo,user.password);
      user = JSON.parse(localStorage.getItem('user'));
      setSavings(user.savings);
      if(user.name==='canteen' || user.name==='stationary' || user.name==='juicePoint')
      {
        const serve=document.getElementById('serve');
        const arrow=document.getElementById('arrow');
        const s=document.getElementById('s');
        serve.style.display="none";
        s.style.display="none";
        arrow.style.display="none";
      }
    }
    get();
    if(user)
    {
      setLogin(true);

    }
    else
    {
      history.push("/login");
    }
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
  function transfer(e){
    history.push("/transfer");
  }
  function over(e)
  {
    e.target.style.backgroundColor="black";
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
      <audio id="mySound" src="login.mp3"></audio>
        <h1>Account details </h1>
        <div className="details" style={{"fontFamily":"'Roboto', sans-serif"}}>
          <h4>Name:  {user.name}</h4>
          <h4>Email:  {user.email}</h4>
          <h4>RollNo:  {user.rollNo}</h4>
          <h4>Dob:  {user.date}</h4>
          <h4>Savings:  <strong style={{"color":"green"}}>{savings}/-</strong></h4>
          {/* <div className="a">
          </div> */}
            <Link to="/canteen" style={{display:'block'}}>Orders</Link>
            <a onClick={show} style={{display:'block'}} href='#history' className="a2" >Transaction history</a>
          {/* <button onClick={show} className="btn2" >Transaction history</button> */}
          {/* <button className="btn2">Services</button> */}
          <div className="s" id="s">
            <section className="service" id="services">
              <form >
                <button onClick={transfer} >  Money transfer</button>
              </form>
              <form>
                <button onClick={cant} >Canteen</button>
              </form>
              <form >
                <button onClick={stationary} >Stationary</button>
              </form>
              <form >
                <button onClick={juicePoint} >Juice point</button>
              </form>
            </section>
          </div>
        </div>
      </section>
      
        <div className='arrow' id='arrow'> <i class="fa fa-angle-double-down" style={{"color":"white"}}></i></div>
      
      
      <section class="serve" id='serve'>
        <div class="card card1">
          <img src="https://cdn.pixabay.com/photo/2018/08/06/20/49/money-transfer-3588301__340.jpg" alt=""/>
          <h2>Money Transfer</h2>
          <p>Here we can securely transfer your valueble money to your friends and family.</p>
          <form >
            <button  id="b" onClick={transfer}>Money transfer</button>
          </form>
        </div>
        <div class="card card2">
        <img src="https://cdn.pixabay.com/photo/2018/11/11/15/38/food-3808953__340.jpg" alt=""/>
          <h2>Canteen</h2>
          <p>Lets order now,we are with many items to serve you.</p>
          <form>
                <button onClick={cant}>Canteen</button>
              </form>
        </div>
        <div class="card card3">
        <img src="https://cdn.pixabay.com/photo/2016/11/22/21/57/apparel-1850804__340.jpg" alt=""/>
          <h2>Stationary</h2>
          <p>Hey guys please look at our store ,we are here with thousands of items for you.</p>
          <form >
                <button onClick={stationary}>Stationary</button>
              </form>
        </div>
        <div class="card card4">
        <img src="https://cdn.pixabay.com/photo/2017/01/20/17/25/detox-1995433__340.jpg" alt=""/>
          <h2>Juice point</h2>
          <p>Order now,many types of fruit juices.Place order be healthy.</p>
          <form >
                <button onClick={juicePoint}>Juice point</button>
              </form>
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

