import { Routes, Route } from 'react-router-dom'
import SigninForm from './components/SigninForm'
import SignupForm from './components/SignupForm'
import Navbar from './components/Navbar'
import Home from './components/Home'
// import Custom from './components/Custom'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<Custom />} /> */}
        <Route path='/' element={<SigninForm />} />
        <Route path='/Signup' element={<SignupForm />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
