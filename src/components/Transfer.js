import React, { useEffect, useContext ,useState} from 'react'
import context from '../context/useContext';
import { useHistory } from 'react-router-dom';

export default function Transfer(props) {
    const history=useHistory();
    let user = JSON.parse(localStorage.getItem('user'));
    const { setLogin ,getUser,showAlert,savings,setSavings} = useContext(context);
    useEffect(()=>{
        if(!user)
        {
            history.push("/");
        }
        setLogin(true);
    },[])
    const [transfer,setTransfer]=useState({"roll":"","amount":"","pass":""});
    const onChange = (e) => {
        setTransfer({ ...transfer, [e.target.name]:e.target.value })
      }
    const handleTransfer = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:74/transfer/?rollNo=${user.rollNo}&password=${user.password}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "roll": transfer.roll, "amount": transfer.amount, "pass": transfer.pass })
        });
        const json = await response.json();
        if (json.success) {
            setSavings(savings-transfer.amount);
            showAlert(`Transaction successfull of ${transfer.amount}/-`, "blue");
            const r = await getUser(user.rollNo,user.password);
            user = JSON.parse(localStorage.getItem('user'));
        }
        else {
            showAlert(` Failed transaction of ${transfer.amount}`, "red");
        }
        console.log(json);
    }
    function trans() {
    const n = document.getElementById("btn3");
    const n2 = document.getElementById("btn4");
    if( n.style.display === "none")
    {
      n.style.display = "block";
      n2.style.display = "none";
    }
    else
    {
      n.style.display = "none";
      n2.style.display = "block";
    }

  }


    return (
        <section  className="signupcontainer" id="c">
            <h1> Transfer money</h1>
         
                <form onSubmit={handleTransfer} style={{"padding":"2px 30px"}}>
                    <div>
                    <input type="text" name='roll' onChange={onChange} placeholder='Roll Number' />
                    </div>
                    <input type="number" name="amount" onChange={onChange} min={0} placeholder="Amount" />
                    <input type="password" name="pass" onChange={onChange} placeholder='Password' />
                    <button className="btn btn3" id="btn3" type="button" onClick={trans}>send</button>
                    <button className="btn btn4" id="btn4" onClick={trans} type="submit">confirm </button>
                </form>
       
        </section>
    )
}
