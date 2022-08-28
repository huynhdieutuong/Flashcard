import { Box, CssBaseline } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import axiosClient from './api/axiosClient'
import './App.css'
import { useAccountContext } from './context/AccountContext'
import Header from './Header'
import LoadingComponent from './LoadingComponent'

function App() {
  const location = useLocation()
  const { setUser } = useAccountContext()
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem('user')) return
      try {
        setLoading(true)
        const res = await axiosClient.get('account/currentUser')
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        localStorage.removeItem('user')
        setLoading(false)
      }
    }
    fetchUser()
  }, [setUser])

  if (loading) return <LoadingComponent message='Initializing app...' />

  const backgroundStyle =
    location.pathname === '/login'
      ? {}
      : {
          backgroundImage: `url(/backgrounds/background${localStorage.backgroundNumber}.jpg)`,
          backgroundPosition: 'center top',
          backgroundRepeat: 'repeat-y',
          minHeight: 'calc(100vh - 64px)',
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
