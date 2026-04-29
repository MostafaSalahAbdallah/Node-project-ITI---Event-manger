import { useState } from 'react'
import CustButton from './components/CustButton'
import MainLayout from './Layout/MainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MainLayout/>
    </>
  )
}

export default App
