import { CssBaseline } from '@mui/material'
import { Container } from '@mui/system'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
