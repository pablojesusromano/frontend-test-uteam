import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import PostDetails from './pages/PostDetails'

function App() {

  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
