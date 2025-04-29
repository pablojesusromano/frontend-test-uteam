import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PostsProvider } from './contexts/PostsProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <PostsProvider>
        <App />
      </PostsProvider>
    </StrictMode>
  </BrowserRouter>,
)
