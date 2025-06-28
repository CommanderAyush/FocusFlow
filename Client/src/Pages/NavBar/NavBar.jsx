import React from 'react'
import { useParams , NavLink } from 'react-router'
import ClarityClick from '../ClarityClick/ClarityClick';
function NavBar() {
    const username=useParams().username;
    const [showModal, setShowModal] = React.useState(false);

  return (
    <nav>
        <div className='flex flex-row items-center border-1 border-neutral-200  drop-shadow-md justify-between rounded-2xl bg-white text-lg font-medium font-Montserrat select-none my-0'>
            <div className='p-0 flex items-center mx-5 ' >
                <img  className='w-10 h-10' src="/images/New_logo.png" alt="" />
                <span className=' text-3xl text-blue-300 font-semibold mt-2 px-1'>focusflow</span>
            </div>
            <div className='my-5 flex flex-row gap-10 text-blue-400'>
                <NavLink  to="">
                    Home
                </NavLink>
                <NavLink to="FlowTasks">
                    FlowTasks
                </NavLink>
                <NavLink to="FocusLog">
                    FocusLog
                </NavLink>
                <NavLink to="FlowTribe">
                    FlowTribe
                </NavLink>

                <button onClick={() => setShowModal(true)} className="text-blue-400 cursor-pointer">
                    ClarityClick
                </button>
            </div>
            <div className={'mx-10 my-5 text-blue-400'} >
                Hello {username}
            </div>
            {/* <NavLink className={'mx-10 my-5 text-blue-400'} to="Profile">
                Hello {username}
            </NavLink> */}
        </div>
        <ClarityClick
            show={showModal}
            onClose={() => setShowModal(false)}
        />
    </nav>
  )
}

export default NavBar