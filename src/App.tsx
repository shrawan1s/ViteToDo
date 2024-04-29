import { Routes, Route } from 'react-router-dom'
import SigninForm from './components/SigninForm'
import SignupForm from './components/SignupForm'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SigninForm />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
    </>
  )
}

export default App
