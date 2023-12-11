import React, { useEffect, useContext ,useState} from 'react'
import context from '../context/useContext';
import { useHistory } from 'react-router-dom';
export default function Cant() {
    const { setLogin ,getUser,showAlert,savings,setSavings,transfer,transfer2,transfer3,transfer4,buy} = useContext(context);
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
    <>
    <section className="items" style={{"marginTop":"20px"}}>
        <h1 style={{"color":"white"}}> cafetaria</h1>
        <div className="i">
            <div className="type">
                <h3>Item</h3>
                <h3>Price</h3>
                <h3>purchage</h3>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://cdn.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818__340.jpg" alt=""/>
                </div>
                <h3> idly</h3>
                <h3 className="h4">25/-</h3>
                <form >
                    <button type="button" onClick={transfer} className="cbtn btn3" id="btn3">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("idly","25","C");
                    }} id="btn4">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://media.istockphoto.com/id/1423042792/photo/indian-delhi-street-chaat-food-ram-laddu-pakode-or-raam-ladoo-pakore-is-made-of-moong-dal.jpg?b=1&s=170667a&w=0&k=20&c=ieRoClATmXOg_qF4JEtsn8_wQj_mQ8kkLUACL36ndr0=" alt=""/>
                </div>
                <h3>bonda</h3>
                <h3 className="h4">25/-</h3>
                <form >
                    <button type="button" onClick={transfer2} className="cbtn btn3" id="btn5">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("bonda","25","C");
                    }} id="btn6">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://media.istockphoto.com/id/1318600400/photo/plain-dosa-dish.jpg?b=1&s=170667a&w=0&k=20&c=A-HkE1es3twBv-lHO__wDQSJXrGps043RUh392XXZBM=" alt=""/>
                </div>
                <h3>dosa</h3>
                <h3 className="h4">25/-</h3>
                <form >
                    <button type="button" onClick={transfer3} className="cbtn btn3" id="btn7">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("dosa","25","C");
                    }} id="btn8">confirm</button>
                </form>
            </div>
            <div className="item">
                <div className="img">
                    <img src="https://media.istockphoto.com/id/612374582/photo/pesarattu-dosa-is-a-popular-breakfast-recipe-of-andhra-pradesh.jpg?b=1&s=170667a&w=0&k=20&c=voxz6U_i3cKBhwpaSPCrjo-yHBKaF7si3FTeJHPjsog=" alt=""/>
                </div>
                <h3> pesarattu</h3>
                <h3 className="h4">30/-</h3>
                <form >
                    <button type="button" onClick={transfer4} className="cbtn btn3" id="btn9">Buy now</button>
                    <button className="cbtn btn4" type="button" onClick={()=>{
                        buy("idly","30","C");
                    }} id="btn10">confirm</button>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}
