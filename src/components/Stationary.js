import React, { useEffect, useContext ,useState} from 'react'
import context from '../context/useContext';
import { useHistory } from 'react-router-dom';
export default function Cant() {
    const { setLogin ,getUser,showAlert,savings,transfer,transfer2,transfer3,buy,transfer4,setSavings} = useContext(context);
    let user = JSON.parse(localStorage.getItem('user'));
    const history=useHistory();
    useEffect(()=>{
        if(!user)
        {
            history.push("/");
        }
        setLogin(true);
    },[])
  return (
    <section className="items">
        <h1 style={{"color":"white"}}>Stationary</h1>
        <div className="i">
            <div className="type">
                <h3>Item</h3>
                <h3>Price</h3>
                <h3>purchage</h3>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2016/10/05/17/11/desk-1717161_960_720.png" alt=""/>
                </div>
                <h3>N-book</h3>
                <h3 className="h4">40/-</h3>
                <form >
                    <button type="button" onClick={transfer} className="cbtn btn3" id="btn3">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("N-BOOK","40","S");
                    }} id="btn4">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2019/10/20/18/19/fountain-pen-4564427_960_720.png" alt=""/>
                </div>
                <h3>B-pen</h3>
                <h3 className="h4">10/-</h3>
                <form >
                    <button type="button" onClick={transfer2} className="cbtn btn3" id="btn5">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("B-PEN","10","S");
                    }} id="btn6">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2014/04/02/16/30/ruler-307509_960_720.png" alt=""/>
                </div>
                <h3>Scale</h3>
                <h3 className="h4">20/-</h3>
                <form >
                    <button type="button" onClick={transfer3} className="cbtn btn3" id="btn7">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("Scale","20","S");
                    }} id="btn8">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2012/04/18/14/50/pencil-37254__340.png" alt=""/>
                </div>
                <h3> pencil</h3>
                <h3 className="h4">9/-</h3>
                <form >
                    <button type="button" onClick={transfer4} className="cbtn btn3" id="btn9">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("Pencil","9","S");
                    }} id="btn10">confirm</button>
                </form>
            </div>
        </div>
    </section>
  )
}
