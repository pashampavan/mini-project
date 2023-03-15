import React,{useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import context from '../context/useContext';
export default function Canteen() {
    const history=useHistory();
    const {setLogin ,savings,setSavings,showAlert,getUser}=useContext(context)
    let user = JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{
        if(!user)
        {
            history.push("/");
        }
        setLogin(true);
    },[])
    const Accept=async (type,id)=>{

        console.log("Accepted."+id);
        const response=await fetch(`http://localhost:74/delete?name=${type}&rollNo=${user.rollNo}&password=${user.password}`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"id":id})
        });
        const json=await response.json();
        if (json.success) {
            setSavings(savings);
            showAlert(`Order is Accepted.`, "blue");
            const r = await getUser(user.rollNo,user.password);
            user = JSON.parse(localStorage.getItem('user'));
        }
        else {
            showAlert(` Failed to accept.`, "red");
        }
        console.log(json);
    }
    // /delete?name=canteen&rollNo=${rollNo}&password=${password}
  return (
    <div className="orders">
        <h2>cafetaria</h2>
        <div className="order">
            <div className="type">
                <h3>Item</h3>
                <h3>Price</h3>
                <h3>order</h3>
                <h3>name</h3>
                <h3>rollNo</h3>
                <h3>Redeem</h3>
            </div>
            {user.orders.canteen.map((el)=>{
                return <div className="box">
                    <h4>{el.item}</h4>
                    <h4 id="h4">{el.price}/-</h4>
                    <h4>{el.id}</h4>
                    <h4>{el.name}</h4>
                    <h4>{el.rollNo}</h4>
                    <form >
                        <button type='button' onClick={()=>{
                        Accept("canteen",el.id);
                    }} className="btn">Accept</button>
                    </form>
                    </div>

             })}
        </div>
        <h2>stationary</h2>
        <div className="order">
            <div className="type">
                <h3>Item</h3>
                <h3>Price</h3>
                <h3>order</h3>
                <h3>name</h3>
                <h3>rollNo</h3>
                <h3>Redeem</h3>
            </div>
            {user.orders.stationary.map((el)=>{
                return <div className="box">
                    <h4>{el.item}</h4>
                    <h4 id="h4">{el.price}/-</h4>
                    <h4>{el.id}</h4>
                    <h4>{el.name}</h4>
                    <h4>{el.rollNo}</h4>
                    <form>
                        <button type='button' onClick={()=>{
                        Accept("stationary",el.id);
                    }} className="btn">Accept</button>
                    </form>
                    </div>
             })}
         </div>
        <h2>juicePoint</h2>
        <div className="order">
            <div className="type">
                <h3>Item</h3>
                <h3>Price</h3>
                <h3>order</h3>
                <h3>name</h3>
                <h3>rollNo</h3>
                <h3>Redeem</h3>
            </div>
            {user.orders.juicePoint.map((el)=>{
                return <div className="box">
                    <h4>{el.item}</h4>
                    <h4 id="h4">{el.price}/-</h4>
                    <h4>{el.id}</h4>
                    <h4>{el.name}</h4>
                    <h4>{el.rollNo}</h4>
                    <form>
                        <button type='button' onClick={()=>{
                        Accept("juicePoint",el.id);
                    }} className="btn">Accept</button>
                    </form>
                    </div>
             })}
        
        </div>
    </div>
   
    
  )
}
