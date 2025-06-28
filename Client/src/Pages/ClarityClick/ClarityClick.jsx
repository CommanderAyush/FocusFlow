import React from 'react';

const data =[
  "Dont waste your potential","You are better than you imagine yourself to be","Is this the way your mother raised you","Did you come this far just to stop now?","Comfort zones don’t build character."
]

const ClarityClick = ({ show, onClose,}) => {
  if (!show) return null;
  const [message,setMessage] =React.useState('');

  React.useEffect(()=>{

    let temp=data[Math.floor(Math.random()*5)]
    setMessage(temp);

  },[])


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center motion-preset-blur-down">
      
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      
      <div className="relative z-10 bg-white p-6 rounded-xl shadow-xl w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">ClarityClick</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ClarityClick;
