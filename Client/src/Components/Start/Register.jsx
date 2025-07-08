import React from 'react'
import { X } from 'lucide-react'
import axios from "axios"
import { useNavigate } from 'react-router';
import { context } from '../../App';


function Register({changeLogin,changeRegister}) {
    const [profileName,setProfileName]= React.useContext(context);
    const [wrong,setWrong]=React.useState(false);
    const [username,setUsername]=React.useState("");
    const [password,setPassword]=React.useState("");
    const [loading,setLoading]= React.useState(false);
    const navigate=useNavigate();
    const LogButton=(e)=>{
        e.preventDefault();
        changeRegister();
        changeLogin();
    }
    function userRegister(e)
    {
        e.preventDefault();
        axios.post("/register",{
            Username:{username},
            Password:{password}
        }).then((res)=>{
            if(res.data=="Bad Credentials")
            {
                setWrong(true);
            }
            else 
            {
                setProfileName(username);
                navigate(`/userId/${username}`);
            }
            
        }).catch((e)=>console.log(e))
    }

    return(
      <div className='fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm font-medium motion-preset-pop'>
          <div className='bg-blue-50 flex flex-col rounded-2xl'>
              <X onClick={changeRegister} className="place-self-end m-2 hover:text-slate-500 hover:cursor-pointer" size={30}/>
              <div className='flex flex-col p-10'>
                  <p className='place-self-center text-lg '>Join Our Community</p>
                  <p className='place-self-center text-6xl p-2'>focusflow</p>
                  <div className='flex flex-col opacity-20 m-3 mb-0'>
                  <p className='place-self-center'>Create a new acccount</p>
                  </div>

                  <form className="flex flex-col p-10 " action="submit">
                    {wrong?<p className='ml-3  text-red-500'>Bad Credentials</p>:<p className='ml-3  text-blue-50'>Bad Credentials</p>}
                    <input className={`bg-white p-2 m-2 rounded-lg w-sm border-1 ${wrong?" border-red-600":null} `} placeholder={`saint@gmail.com `} onChange={(e)=>{setUsername(e.target.value);setWrong(false)}} type="text" name="" id="Username"/>
                    <input className={`bg-white p-2 m-2 rounded-lg border-1 ${wrong?" border-red-600":null}`} placeholder='********' onChange={(e)=>{setPassword(e.target.value);setWrong(false)}} type="password" name="" id="Passowrd" />
                    <button onClick={userRegister} className='m-2 rounded-lg p-2 bg-blue-400 duration-300 ease-out hover:bg-blue-500 hover:cursor-pointer '>
                        {loading?<div className="flex place-self-center w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>:<p className='inline'>Register</p>}       
                    </button>
                    <button onClick={LogButton}><p className='text-sky-600 place-self-end mr-3 duration-200 ease-out hover:text-sky-800 hover:cursor-pointer'>already a member?</p></button>
                  </form>
                  
              </div>
              
          </div>
          
      </div>
  
  )
}

export default Register