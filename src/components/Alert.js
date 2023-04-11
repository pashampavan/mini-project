import React, { useContext } from 'react'
import context from '../context/useContext'
export default function Alert() {
    const {alert}=useContext(context);
    return (
        alert && <div class={alert.type} style={{"height":"40px"}} >   <h3 style={{"marginTop":"3px"}}>{alert.msg}</h3>   </div>
    )
}
