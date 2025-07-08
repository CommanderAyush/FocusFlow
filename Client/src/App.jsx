import React from "react";
import StartPage from "./Components/Start/Startpage";
import axios from "axios"
import {Routes,BrowserRouter,Route} from "react-router"
import RootLayout from './Components/RootLayout/RootLayout.jsx'
import HomeScreen from './Pages/HomeScreen/HomeScreen.jsx'
import FlowTasks from './Pages/FlowTasks/FlowTasks.jsx'
import FocusLog from './Pages/FocusLog/FocusLog.jsx'
import FlowTribe from './Pages/FlowTribe/FlowTribe.jsx'
import Settings from "./Pages/Settings/Settings.jsx";
import ProtectedRoute from "./Components/Protected/ProtectedRoute.jsx";


axios.defaults.baseURL=import.meta.env.VITE_baseURL
axios.defaults.withCredentials=true;

const Ret=()=>{
  return(
    <Routes>
      <Route path='/' element={<StartPage/>}/>
      <Route path='/userId/:username' element={<ProtectedRoute><RootLayout/></ProtectedRoute>}>
        <Route index element={<HomeScreen/>}/>
        <Route path='FlowTasks' element={<FlowTasks/>}/>
        <Route path='FocusLog' element={<FocusLog/>}/>
        <Route path='FlowTribe' element={<FlowTribe/>}/>
        <Route path='Profile' element={<Settings/>}/>
      </Route>
    </Routes>
  )
}
export  const context=React.createContext([]);

function App() {
  const [profileName,setProfileName]=React.useState("");

  return (
    <BrowserRouter>
      <context.Provider value={[profileName,setProfileName]}>
        <Ret/>  
      </context.Provider>
    </BrowserRouter>
  )
}

export default App
