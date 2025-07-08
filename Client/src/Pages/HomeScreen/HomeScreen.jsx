import React, { useEffect } from 'react'
import YoutubeLinks from './YoutubeLinks'
import Cards from './Cards'
import axios from "axios"
import {useParams} from "react-router"
import Goals from './Goals'
import Journal from './Journal'

function HomeScreen() {
  const username=useParams().username;
  const [day,setDay]=React.useState(0);
  const [hours,setHours]=React.useState(0);
  const [minutes,setMinutes]=React.useState(0);
  const [seconds,setSeconds]=React.useState(0);
  const [cards,setCards]=React.useState([]);
  const [percentage, setPercentage] = React.useState(0);
  //getting the time for the counter

    useEffect(() => {
      let timerId;
      const initTimer = async () => {
        let time = localStorage.getItem(`time${username}`);

        if (!time) {
          try {
            const res = await axios.get(`/getTime/${username}`);
            time = res.data.times;
            localStorage.setItem(`time${username}`, time);
          } catch (err) {
            console.error(err);
            return;
          }
        }

        const baseTime = parseInt(time);

        ChangeTimer(baseTime);

        timerId = setInterval(() => ChangeTimer(baseTime), 1000);
      };

      initTimer();

      return () => {
        if (timerId) clearInterval(timerId);
      };
    }, [username]); 


  //getting the data for the cards
  useEffect(()=>{
    if(!username)return;
    axios.get(`/getCards/${username}`,{withCredentials:true})
    .then((res)=>{
      displayCards(res.data);
    })
    .catch(err=>console.log(err))
    
  },[username])
 
  //displaying the cards
  const displayCards=(data)=>{
    const temp=data.map((obj)=>{
      return (<Cards 
        name={obj.activity}
        emoji={obj.emoji}
        done={obj.done}
        total={obj.total}
        checked={obj.checked}
      />)
    })
    setCards(temp);  
  } 


  //defining the coutndown function
 const ChangeTimer = (dateBefore) => {
    const dateAfter = Date.now();
    const diff = Math.floor((dateAfter - dateBefore) / 1000); 

    const d = Math.floor(diff / 86400);
    const h = Math.floor((diff % 86400) / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    setDay(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);

    // Animation part of the countdown
    const totalSeconds = (h * 3600) + (m * 60) + s;
    const percent = totalSeconds / (24 * 3600);
    setPercentage(percent);

    
  };

  
  
  const angle = percentage * 360;
  
  const timerValue=()=>{
    return(
        <div className='flex flex-col place-items-center  rounded-lg p-5 m-5 text-sky-400 '>
          <p className='text-9xl p-0'> {day}<span className='text-sm'>Days</span> </p>
          <p className='text-3xl'> {hours} <span className='text-sm'>Hrs</span> {minutes} <span className='text-sm'>Mins</span> </p>
          <p className='text-lg'> {seconds} <span className='text-sm'>Secs</span> </p>
        </div>
    )
  }
  
  return (
    <>
      <div className='flex flex-col place-items-center h-screen bg-sky-50 over '>
                  
        <div className='w-full flex flex-row justify-evenly'>
          <Goals/>
          
          <div
            className="relative w-60 h-60 rounded-full mt-5"
            style={{
              background: `conic-gradient(#38bdf8 ${angle}deg, #e5e7eb ${angle}deg)`
            }}
          >
            <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-700">
                {timerValue()}
              </span>
            </div>
          </div>


          <Journal/>

        </div>
        
        <div>
          <p className='m-5 font-Montserrat font-semibold text-2xl text-sky-500'>One Step At A Time</p>
        </div>
        
        <div className='flex flex-row gap-2'>
          {cards}  
        </div>

        <div>
          <p className='m-5 font-Montserrat font-semibold text-2xl text-sky-500'>Life Can Be Drastically Different In Just A Matter Of Weeks</p>
        </div>

        <div className='w-300 overflow-x-auto overflow-y-hidden whitespace-nowrap border border-gray-300 p-2 rounded-lg scrollbar-none'>
          <YoutubeLinks

            title="The Bruce Wayne Routine"
            description="Learn how to be as productive as Batman"
            thumbnail="	https://img.youtube.com/vi/dnDEK8YmD5c/default.jpg"
            url="https://www.youtube.com/watch?v=dnDEK8YmD5c&list=WL&index=6"
          />
          <YoutubeLinks
            title="Become Tyler Durden"
            description="How to get confidence like Tyler Durden"
            thumbnail="	https://img.youtube.com/vi/6jkWbfkvStE/default.jpg"
            url="https://www.youtube.com/watch?v=6jkWbfkvStE&list=WL&index=26&t=114s"
          />
          <YoutubeLinks
            title="Watch This Two Get Out Of Your Comfort Zone"
            description="30 days. No apps. No shortcuts. No audience. Just war"
            thumbnail="	https://img.youtube.com/vi/PtgEYWs5U0g/default.jpg"
            url="https://www.youtube.com/watch?v=PtgEYWs5U0g&list=WL&index=12"
          />
          <YoutubeLinks
            title="10 Things Weak Man Do"
            description="Watch the video and become the giga chad you always wanted to be"
            thumbnail="	https://img.youtube.com/vi/XbXXN2skqtM/default.jpg"
            url="https://www.youtube.com/watch?v=XbXXN2skqtM&list=WL&index=1"
          />
          
        </div>
      </div>
    </>
  )
}

export default HomeScreen