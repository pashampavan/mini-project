import context from './useContext';
import { useHistory } from 'react-router-dom';
import { useState,useEffect } from 'react';
const Context = (props) => {
        let user2 = JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{
        setLogin(true);
    },[])
        const [login, setLogin] = useState(false);
        const [alert, setAlert] = useState(null);
        const [song,setSong]=useState(false);
        const [savings, setSavings] = useState(0);
        const changeSavings = (s1, s2) => {
                setSavings(s1 - s2)
        }
        const showAlert = (msg, type) => {
                setAlert({ "msg": msg, "type": type });
                setTimeout(() => {
                        setAlert(null);
                }, 2000);
        }
        const [user, setUser] = useState(null);
        const getUser = async (rollNo, password) => {
                const response = await fetch("http://localhost:74/loginAccount", {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ "rollNo": rollNo, "password": password })
                });
                console.log("called");
                const json = await response.json();
                if (json.success) {
                        console.log(json.user);
                        setUser(json.user);
                        localStorage.setItem('user', JSON.stringify(json.user));
                        setLogin(true);
                        return true;
                }
                else {
                        console.log("not found");
                        return false;
                }
        }
        //////transfer
        function transfer() {
                const btn3 = document.getElementById("btn3");
                const btn4 = document.getElementById("btn4");
                const btn6 = document.getElementById("btn6");
                const btn8 = document.getElementById("btn8");
                const btn10 = document.getElementById("btn10");
                // const btn12=document.getElementById("btn12");
                const btn5 = document.getElementById("btn5");
                const btn7 = document.getElementById("btn7");
                const btn9 = document.getElementById("btn9");
                // const btn11=document.getElementById("btn11");
                btn6.style.display = "none";
                btn8.style.display = "none";
                btn10.style.display = "none";
                // btn12.style.display="none";
                btn5.style.display = "block";
                btn7.style.display = "block";
                btn9.style.display = "block";
                // btn11.style.display="block";
                // console.log("enterd")
                btn3.style.display = "none";
                btn4.style.display = "block";

        }

        function transfer2() {
                const btn5 = document.getElementById("btn5");
                const btn6 = document.getElementById("btn6");
                const btn7 = document.getElementById("btn7");
                const btn8 = document.getElementById("btn8");
                const btn9 = document.getElementById("btn9");
                const btn10 = document.getElementById("btn10");
                // const btn11=document.getElementById("btn11");
                // const btn12=document.getElementById("btn12");
                const btn3 = document.getElementById("btn3");
                const btn4 = document.getElementById("btn4");
                btn4.style.display = "none";
                btn8.style.display = "none";
                btn10.style.display = "none";
                // btn12.style.display="none";
                btn3.style.display = "block";
                btn7.style.display = "block";
                btn9.style.display = "block";
                // btn11.style.display="block";
                console.log("enterd")
                btn5.style.display = "none";
                btn6.style.display = "block";

        }
        function transfer3() {
                const btn7 = document.getElementById("btn7");
                const btn8 = document.getElementById("btn8");
                const btn5 = document.getElementById("btn5");
                const btn6 = document.getElementById("btn6");
                const btn9 = document.getElementById("btn9");
                const btn10 = document.getElementById("btn10");
                // const btn11=document.getElementById("btn11");
                // const btn12=document.getElementById("btn12");
                const btn3 = document.getElementById("btn3");
                const btn4 = document.getElementById("btn4");
                btn4.style.display = "none";
                btn6.style.display = "none";
                btn10.style.display = "none";
                // btn12.style.display="none";
                btn3.style.display = "block";
                btn5.style.display = "block";
                btn9.style.display = "block";
                // btn11.style.display="block";
                console.log("enterd")
                btn7.style.display = "none";
                btn8.style.display = "block";


        }
        function transfer4() {
                const btn9 = document.getElementById("btn9");
                const btn10 = document.getElementById("btn10");
                const btn7 = document.getElementById("btn7");
                const btn8 = document.getElementById("btn8");
                const btn5 = document.getElementById("btn5");
                const btn6 = document.getElementById("btn6");
                // const btn11=document.getElementById("btn11");
                // const btn12=document.getElementById("btn12");
                const btn3 = document.getElementById("btn3");
                const btn4 = document.getElementById("btn4");
                btn4.style.display = "none";
                btn8.style.display = "none";
                btn10.style.display = "none";
                // btn12.style.display="none";
                btn3.style.display = "block";
                btn7.style.display = "block";
                btn5.style.display = "blcok";
                // btn11.style.display="block";
                console.log("enterd")
                btn9.style.display = "none";
                btn10.style.display = "block";

        }

        ////////////////////////buy  /buy?item=pencil&price=9&rollNo=${rollNo}&password=${password}&div=S` method="post"
        const buy = async (item, price, div) => {
                console.log("Entered to buy.");
                const response = await fetch(`http://localhost:74/buy?item=${item}&price=${price}&rollNo=${user2.rollNo}&password=${user2.password}&div=${div}`, {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({})
                });
                console.log("called to buy");
                const json = await response.json();
                if (json.success) {
                        setLogin(true);
                        showAlert("Purchased successfully.","yellow")
                        console.log("success in buy");
                        return true;
                }
                else {
                        console.log("Failed in buy.");
                        showAlert("Failed in purchase.","red")
                        return false;
                }
        }
        const getOtp=async (email)=>{
            const response=await fetch("http://localhost:74/otp", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({ "email":email})
                });
                const json=await response.json();
                if(json.success)
                {
                        console.log(json.success);
                        return json;
                }
                else
                {
                        return json;
                }
        }
        return (
                <context.Provider value={{getOtp,song,setSong, buy,transfer, transfer2, transfer3, transfer4, user, setUser, savings, setSavings, login, setLogin, getUser, alert, showAlert }}>
                        {props.children}
                </context.Provider>
        )
}
export default Context;