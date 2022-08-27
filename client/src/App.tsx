import { Box, CssBaseline } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './Header'

function App() {
  const location = useLocation()

  useEffect(() => {
    const hasOneDayPassed = () => {
      const date = new Date().toLocaleDateString()
      if (localStorage.flashCardDate === date) return false
      localStorage.flashCardDate = date
      return true
    }

    const changeBackgroundOncePerDay = () => {
      if (!hasOneDayPassed()) return

      const max = 62
      const randomNumber1ToMax = Math.floor(Math.random() * max) + 1
      localStorage.backgroundNumber = randomNumber1ToMax
    }

    changeBackgroundOncePerDay()
  }, [])

  const backgroundStyle =
    location.pathname === '/login'
      ? {}
      : {
          backgroundImage: `url(/backgrounds/background${localStorage.backgroundNumber}.jpg)`,
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: 'calc(100vh - 64px)',
        }

  return (
    <>
      <CssBaseline />
      {location.pathname !== '/login' && <Header />}
      <Box sx={backgroundStyle}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  )
}

export default App
