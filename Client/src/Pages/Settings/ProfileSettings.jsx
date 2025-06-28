import React from "react";
import { useParams } from "react-router";

const ProfileSettings = () => {
    const username=useParams().username
    const [newUsername,setNewUsername]=React.useState(username);
    const [Password,setPassword]=React.useState("")

    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Username</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={newUsername} onChange={(e)=>setNewUsername(e.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Confirm Password</label>
          <input type="email" className="w-full border rounded px-3 py-2" value={Password} onChange={(e)=>setPassword(e.value)}/>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Save Changes
        </button>
      </div>
    );
  };
  
  export default ProfileSettings;
  