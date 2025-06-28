import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
function Cards(props) {

  const [check,setCheck]=React.useState(props.checked);
  const [done,setDone]=React.useState(props.done)
  const username=useParams().username;
  const change=(e)=>
  {
    const data=e.target.checked;
    setCheck(data)
    if(data){setDone(done+1)}
    else{setDone(done-1)}
    axios.post(`/changeCards/${username}/${props.name}`,{
      Checked:{data}
    })
    .then()
    .catch((err)=>console.log(err))
  }  
  
  return (
      <div
      className="relative w-72 h-44 rounded-xl overflow-hidden shadow-md bg-cover bg-center"
      style={{ backgroundImage: `url(/images/${props.name}.jpg)` }}
  >
      <div className="text-stone-100 absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <h2 className=" text-lg font-semibold">{props.name}</h2>
          <input
            type="checkbox"
            checked={check}
            onChange={change}
            className="w-5 h-5 text-blue-500 rounded-full border-gray-300 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between text-sm text-stone-100 font-semibold">
          <span>Progress</span>
          <span>{done} / {props.total}</span>
        </div>

        <div className="w-full bg-white/20 h-2 rounded-full mt-2">
          <div
            className="bg-sky-400 h-2 rounded-full"
            style={{ width: `${(done / props.total) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Cards