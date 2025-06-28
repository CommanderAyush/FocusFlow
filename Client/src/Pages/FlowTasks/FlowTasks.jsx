import React, { useState } from 'react';
import axios from "axios"
import { useParams } from 'react-router';

function FlowTasks() {
  const username=useParams().username;
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [notes, setNotes] = useState('');
  const [period,setPeriod]=useState('daily');

  const callTasks=(Timely)=>{
    setPeriod(Timely);
    setSelectedTask(null)
    setNotes('')
    axios.get(`/getTasks/${username}/${Timely}`)
    .then((res)=>{
        const data=res.data.map((val)=>{
          return {
            text: val.tasks,
            id:val.id
          }
        })
        setTasks(data);
    })
    .catch((err)=>console.log(err))
  }
  
  const addTask = async () => {
    if (taskText.trim() === '') return;
    const id=await axios.post(`/addTasks/${username}/${period}`,{
      task:taskText
    }).then(res=>res.data.id[0].id)
    .catch(err=>console.log(err))

    const newTask = { id: id ,text: taskText };
    
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    axios.get(`/deleteTasks/${period}/${id}`)
    .then((res)=>res).catch(err=>console.log(err))

    if (selectedTask?.id === id) {
      setSelectedTask(null);
      setNotes('');
    }
  };

  const updateTask = (id, newText) => {
    axios.post(`/updateTasks/${period}/${id}`,
    {
      text:newText,
      id:id
    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const selectTask = (task) => {
    setSelectedTask(task);
    axios.get(`/getNotes/${period}/${task.id}`)
    .then((res)=>{
      setNotes(res.data.note? res.data.note : '');
    })
    .catch(err=>console.log(err))
     
  };
  
  // Handle note change
  const handleNoteChange = (e) => {
    setNotes(e.target.value);
    const id=selectedTask.id;
    axios.post(`/addNotes/${period}/${id}`,
    {
      text:e.target.value,
    })

  }


  React.useEffect(()=>{

    callTasks('daily');
  
  },[])


  return (
    <div className="flex h-screen font-Montserrat">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-200 text-black p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="space-y-2">
          <button onClick={()=>callTasks('daily')} className="w-full text-left font-semibold hover:bg-blue-300 p-2 rounded">Daily</button>
          <button onClick={()=>callTasks('monthly')} className="w-full text-left font-semibold hover:bg-blue-300 p-2 rounded">Monthly</button>
          <button onClick={()=>callTasks('yearly')} className="w-full text-left font-semibold hover:bg-blue-300 p-2 rounded">Yearly</button>
        </div>
      </div>

      {/* Task Section */}
      <div className="w-3/5 p-6 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{period.charAt(0).toUpperCase()}{period.slice(1)} Tasks</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="flex-grow border rounded p-2 mr-2"
            placeholder="Add a task"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-3 rounded shadow flex justify-between items-center cursor-pointer motion-preset-pop"
              onClick={() => selectTask(task)}
            >
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTask(task.id, e.target.value)}
                className="flex-grow border-none outline-none cursor-pointer"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Notes Section */}
      <div className="w-1/5 p-4 bg-gray-50 border-l border-gray-300">
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        {selectedTask ? (
          <textarea
            className="w-full h-5/6 p-2 border rounded"
            value={notes}
            onChange={(e) => handleNoteChange(e)}
            placeholder="Write notes about the selected task..."
          />
        ) : (
          <p className="text-gray-500">Select a task to write notes.</p>
        )}
      </div>
    </div>
  );
};

export default FlowTasks;
