import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import {Authentication} from './pages/Authentication'
import { AuthProvider } from './contexts/AuthContext'
import VedioMeet from './pages/VedioMeet'
const App = () => {
  return (
   <>

    <Router>
    <AuthProvider>
    <Routes >

    <Route path='/' element={<LandingPage/>} />
    <Route path='/auth' element= {<Authentication/>} ></Route>
    
    <Route path='/:url' element={<VedioMeet/>} ></Route>

    </Routes>
     </AuthProvider>
    </Router>
   
   </>
  )
}

export default App



// css -> jsx
// pre made components
