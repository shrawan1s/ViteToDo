import { Routes, Route } from 'react-router-dom'
import SigninForm from './components/SigninForm'
import SignupForm from './components/SignupForm'
import Navbar from './components/Navbar'
import Home from './components/Home'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<SigninForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
