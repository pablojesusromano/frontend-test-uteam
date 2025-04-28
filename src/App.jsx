import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'

function App() {

  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/create" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  )
}

export default App
