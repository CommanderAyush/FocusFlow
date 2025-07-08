import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios';


function Goals() {
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate(`FocusLog`)
    }
     return(
        <div className="w-72 h-60 overflow-auto cursor-pointer mt-5 scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-gray-300" onClick={handleClick} >

            <h2 className="text-xl font-semibold text-center pb-2 border-b-2 border-sky-400 text-blue-300">
                Start Journaling
            </h2>

           <img src="/images/Journal4.png" alt="" />
        </div>
  )
}

export default Goals