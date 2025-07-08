import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios';


function Goals() {
    const navigate=useNavigate();
    const username=useParams().username
    const [goals,setGoals] = React.useState([]);
    
    useEffect(()=>{
        axios.get(`/getTasks/${username}/daily`)
        .then((res)=>{
            const data=res.data.map((val)=>{
            return {
                text: val.tasks,
                id:val.id
            }
            })
            setGoals(data);
        })
        .catch((err)=>console.log(err))

    },[])

    const handleClick=()=>{
        navigate(`FlowTasks`)
    }
     return(
        <div className="w-72 h-50 overflow-auto cursor-pointer mt-5 scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-sky-50" onClick={handleClick} >

            <h2 className="text-xl font-semibold text-center pb-2 border-b-2 border-sky-400 text-blue-300">
                Daily Tasks
            </h2>

            {goals.length > 0 ? (
                <ul className="mt-4 space-y-2">
                {goals.map((goal, index) => (
                    <li
                    key={index}
                    className="bg-sky-50 p-3 rounded-md text-sky-900 font-medium border-l-4 border-sky-400"
                    >
                    {goal.text}
                    </li>
                ))}
                </ul>
            ) : (
                <div className="mt-4 flex items-center justify-center h-24 bg-transparent rounded-lg border-2 border-dashed border-sky-300 text-sky-600">
                Add some goals...
                </div>
            )}
        </div>
  )
}

export default Goals