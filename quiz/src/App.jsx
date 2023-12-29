import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Introduce from './pages/introduce/Introduce'
import Quiz from './pages/quiz/Quiz'
import './components/dropdown/Dropdown.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
     <Router>
        <Routes>
          <Route path="/" element={<Introduce />} />
          <Route path="/quiz/:difficulty/:amount" element={<Quiz />} />
        </Routes>
     </Router>
     
     </div> 
  )
}

export default App
