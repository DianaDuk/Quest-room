import { Box } from '@chakra-ui/react'
import './index.css'
import Header from './layouts/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
   <Box minH="100vh" bgGradient="linear(to-r, #141414, #1F1D1D)" color="white">
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </Router>
    </Box>
    </>
  )
}

export default App
