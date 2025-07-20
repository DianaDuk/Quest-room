import { Box } from '@chakra-ui/react'
import './index.css'
import Header from './layouts/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './layouts/Footer/Footer'
import QuestPage from './pages/QuestPage/QuestPage'
import ContactPage from './pages/ContactPage/ContactPage'


function App() {

  return (
    <>
   <Box minH="100vh" bgGradient="linear(to-r, #141414, #1F1D1D)" color="white">
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<div>Страница не найдена</div>} />
        <Route path="/quests/:id" element={<QuestPage/>}/>
        <Route path='/contacts' element={<ContactPage />} />
      </Routes>
      <Footer/>
    </Router>
    </Box>
    </>
  )
}

export default App
