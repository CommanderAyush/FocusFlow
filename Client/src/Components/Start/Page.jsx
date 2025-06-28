import React from 'react'

function Page() {
 

  return (
    <div>
        <div className='flex '>
            <div className='flex-1/2 flex flex-col justify-center items-center  '>
              <div>
                <p className='font-bold text-7xl text-cyan-500'>FOCUSFLOW </p>
                <p className='mx-2 text-lg'> A new way to boost your productivity</p> 
                <div className='mx-1 inline bg-cyan-500 text-white px-3 py-2  rounded-4xl text-sm tracking-wider hover:bg-cyan-400'>
                  <button className='my-5 hover:cursor-pointer'>About Us</button>
                </div>   
              </div> 
              
            </div>
            
            <div className='flex-1/2 '>
                <img  className=' my-auto' src="images/image_no_bg.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Page