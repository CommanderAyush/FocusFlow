import React, {useState } from "react";
import StartNav from "./StartNav.jsx";
import Page from "./Page";
import Login from "./Login";
import Register from "./Register.jsx";

function StartPage()
{
    const [login,setLogin]=useState(false);
    const [register,setRegister]=useState(false);
    
    const changeLogin=()=>{
        setLogin(!login);
    }

    const changeRegister=()=>{
        setRegister(!register);
    }

    return (
    <div  className="bg-slate-50 h-screen overflow-hidden font-Montserrat relative">
        <StartNav changeLogin={changeLogin}  changeRegister={changeRegister} />
        <Page/>
        {login && <Login changeRegister={changeRegister} changeLogin={changeLogin}/>}
        {register && <Register changeLogin={changeLogin} changeRegister={changeRegister}/>}
    </div>
    )
}

export default StartPage