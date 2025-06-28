import React from 'react'


function StartNav(props) {
   
    return (
    <>
        <nav className='flex items-end bg-neutral-50 border-1 border-neutral-200 rounded-2xl '>
            
            <div className='p-3 flex items-center mx-5'>
                <img  className='w-9 h-9 inline mb-2' src="../../../images/New_logo.png" alt="" />
                <span className=' text-3xl p-2 font-semibold text-cyan-500'>focusflow</span>
            </div>
            
            <div className='flex-1 flex justify-end  '>
               
                <div className='p-3 rounded-lg m-4  text-lg text-slate-400 hover:text-black '>
                    <button onClick={props.changeLogin} className='hover:cursor-pointer' >Login</button>
                </div>
                <div  className='my-auto bg-cyan-500 text-white px-5 py-1 rounded-4xl m-4 mr-8  text-lg tracking-wider hover:bg-cyan-400 '>
                    <button onClick={props.changeRegister} className='hover:cursor-pointer'><p>Register</p></button>
                </div>
                
            </div>
            
            
        </nav>
    </>
  )
}

export default StartNav