import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Authentication from './pages/Authentication'
const App = () => {
  return (
   <>

    <Router>

    <Routes >

    <Route path='/' element={<LandingPage/>} />
    <Route path='/auth' element= {<Authentication/>} ></Route>
    
    </Routes>

    </Router>
   
   </>
  )
}

export default App



// css -> jsx
// pre made components
