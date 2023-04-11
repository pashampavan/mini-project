import React, { useEffect, useContext ,useState} from 'react'
import context from '../context/useContext';
import { useHistory } from 'react-router-dom';
export default function JuicePoint() {
    const { setLogin ,getUser,showAlert,transfer,transfer2,transfer3,transfer4,buy,savings,setSavings} = useContext(context);
    let user = JSON.parse(localStorage.getItem('user'));
    const history=useHistory();
    useEffect(()=>{
        if(!user)
        {
            history.push("/");
        }
        else
        {
            setLogin(true);
        }
    },[])
  return (
    <section className="items">
        <h1 style={{"color":"white"}}> JuicePoint</h1>
        <div className="i">
            <div className="type">
                <h3>Item</h3>
                <h3>Price</h3>
                <h3>purchage</h3>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2021/10/06/16/06/smoothie-6686147_960_720.png" alt=""/>
                </div>
                <h3> sapota juice</h3>
                <h3 className="h4">25/-</h3>
                <form >
                    <button type="button" onClick={transfer} className="cbtn btn3" id="btn3">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("Sapota juice","25","J");
                    }} id="btn4">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2014/04/05/11/29/banana-315885__340.jpg" alt=""/>
                </div>
                <h3>banana juice</h3>
                <h3 className="h4">25/-</h3>
                <form >
                    <button type="button" onClick={transfer2} className="cbtn btn3" id="btn5">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("Banana juice","25","J");
                    }} id="btn6">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2021/06/03/18/35/bonnet-6307827_960_720.png" alt=""/>
                </div>
                <h3>oreo</h3>
                <h3 className="h4">25/-</h3>
                <form >
                    <button type="button" onClick={transfer3} className="cbtn btn3" id="btn7">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("Oreo","25","J");
                    }} id="btn8">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2017/05/29/19/37/smoothie-2354633__340.jpg" alt=""/>
                </div>
                <h3> grapes juice</h3>
                <h3 className="h4">30/-</h3>
                <form >
                    <button type="button" onClick={transfer4} className="cbtn btn3" id="btn9">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("Grapes juice","30","J");
                    }} id="btn10">confirm</button>
                </form>
            </div>
        </div>
    </section>
  )
}
