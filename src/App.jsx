
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './landing/landing'
import Discussion from './discussion/discussion'
import Chatbot from './chatbot/chatbot'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/discussion" element={<Discussion />} />
      </Routes>
    </Router>
  )
}

export default App
