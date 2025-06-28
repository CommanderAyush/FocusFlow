import React from 'react'
import { X } from 'lucide-react';
import axios from 'axios';
import {useNavigate} from "react-router"
import { context } from '../../App';

function Login({changeLogin,changeRegister})
{
    const [profilename,setProfileName]=React.useContext(context)
    const [username,setUsername]=React.useState("");
    const [password,setPassword]=React.useState("");
    const [wrong,setWrong]=React.useState(false);
    const navigate=useNavigate();
    const RegButton=(e)=>{
        e.preventDefault();
        changeLogin();
        changeRegister();
    }
    function userLogin(e)
    {
        e.preventDefault();
        
        axios.post("/login",{
            Username:{username},
            Password:{password}
        }).then((res)=>{
            if(res.data=="Wrong Password")
            {
                setWrong(true);
            }
            else if(res.data=="OK")
            {
                setProfileName(username);
                navigate(`/userId/${username}`);
            }
            else
            {
                setWrong(true);
            }
        }).catch((e)=>console.log(e))
    }

    return(
        <div className='fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm font-medium motion-preset-pop'>
            <div className='bg-blue-50 flex flex-col rounded-2xl'>
                <X onClick={changeLogin} className="place-self-end m-2 hover:text-slate-500 hover:cursor-pointer" size={30}/>
                <div className='flex flex-col p-10'>
                    <p className='place-self-center text-lg '>Welcome Back to</p>
                    <p className='place-self-center text-6xl p-2'>focusflow</p>
                    <div className='flex flex-col opacity-20 m-3 mb-0'>
                        <p className='place-self-center'>Login to your account</p>
                    </div>

                    <form className="flex flex-col p-10 " action="submit">
                    {wrong?<p className='ml-3  text-red-500'>Bad Credentials</p>:<p className='ml-3  text-blue-50 '>Bad Credentials</p>}
                        <input className={`bg-white p-2 m-2 rounded-lg w-sm border-1 ${wrong?" border-red-600":null}`} placeholder='example@gmail.com' type="text" value={username} onChange={(e)=>{setUsername(e.target.value);setWrong(false)}} id="Username"/>
                        <input className={`bg-white p-2 m-2 rounded-lg border-1 ${wrong?"border-red-600":null}`} placeholder='********' type="password" value={password} onChange={(e)=>{setPassword(e.target.value);setWrong(false)}} name="" id="Passowrd" />
                        <button onClick={userLogin} className='m-2 rounded-lg p-2 bg-blue-400 duration-300 ease-out hover:bg-blue-500 hover:cursor-pointer'>Login</button>
                        <button onClick={RegButton}><p className='text-sky-600 place-self-end mr-3 duration-200 ease-out hover:text-sky-800 hover:cursor-pointer'>New member?</p></button>
                    </form>
                    
                </div>
                
            </div>
            
        </div>
    )
}
export default Login;