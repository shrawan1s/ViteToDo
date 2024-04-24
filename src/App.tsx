import { Routes, Route } from 'react-router-dom'
// import Home from './components/Home'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm />} />
      </Routes>
    </>
  )
}

export default App
