import React, { useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router';

const moodOptions = [
  { label: 'Happy', color: 'bg-yellow-300' },
  { label: 'Sad', color: 'bg-blue-300' },
  { label: 'Angry', color: 'bg-red-400' },
  { label: 'Tired', color: 'bg-purple-300' },
  { label: 'Excited', color: 'bg-green-300' },
];

function FocusLog () {
  const username=useParams().username

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [journalEntries, setJournalEntries] = useState('');
  const [selectedMood, setselectedMood] = useState(moodOptions[0]);
  const [isEditing, setIsEditing] = useState(true);

  const handleJournalChange = (e) => {
    const newText = e.target.value;
    setJournalEntries(newText)
  };

  const handleMoodChange = (mood) => {
    setselectedMood(mood);
  };

  React.useEffect(()=>{
    axios.get(`/getLog/${username}/${selectedDate}`,{withCredentials:true})
    .then((res) => {
      if (res.data.length > 0) {
        setJournalEntries(res.data[0].logs);
        setselectedMood({ label: res.data[0].mood, color: moodOptions.find(m => m.label === res.data[0].mood).color });
        setIsEditing(false);
      } else {
        setJournalEntries('');
        setselectedMood(moodOptions[0]);
        setIsEditing(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  },[])

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    axios.get(`/getLog/${username}/${newDate}`,{withCredentials:true})
      .then((res) => {
        if (res.data.length > 0) {
          setJournalEntries(res.data[0].logs);
          setselectedMood({ label: res.data[0].mood, color: moodOptions.find(m => m.label === res.data[0].mood).color });
          setIsEditing(false);
        } else {
          setJournalEntries('');
          setselectedMood(moodOptions[0]);
          setIsEditing(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const addLog = ()=>{
    setIsEditing(false)
    axios.post(`/addLog/${username}`,{

      date: selectedDate,
      mood: selectedMood.label,
      journal: journalEntries
    },{withCredentials:true}).catch(err=>console.log(err))
  }

  return (
    <div className="flex h-screen font-Montserrat">

      {/* SideBar */}
      <div className="w-1/4 bg-blue-50 p-6 border-r border-blue-200">
        <h2 className="text-xl font-bold mb-4">Select Date</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e)}
          className="p-2 border rounded w-full text-gray-700"
        />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Mood</h3>
          <div className="grid grid-cols-2 gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.label}
                className={`p-2 rounded text-sm text-gray-800 border hover:scale-105 transition ${
                  selectedMood.label === mood.label ? `${mood.color} border-black` : 'bg-white'
                }`}
                onClick={() => handleMoodChange(mood)}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Journal Area */}
      <div className="flex-1 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">FocusLog Entry</h2>
          
          {/* Mood Tag Top Right */}
          {selectedMood && (
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${selectedMood.color}`}></div>
              <span className="text-sm font-medium text-gray-600">{selectedMood.label}</span>
            </div>
          )}
        </div>

        {/* Textarea */}
        <textarea
          value={journalEntries}
          onChange={handleJournalChange}
          readOnly={!isEditing}
          placeholder="Write your thoughts, reflections, or events of the day..."
          className={`w-full h-[75%] p-4 border rounded resize-none shadow-md transition 
            ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
        />

        {/* Buttons */}
        <div className="mt-4 flex space-x-4">
          {isEditing ? (
            <button
              onClick={() => addLog()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Log
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default FocusLog;
