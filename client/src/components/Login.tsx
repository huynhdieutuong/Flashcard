import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { Alert, LoadingButton } from '@mui/lab'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Navigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import { useAccountContext } from '../context/AccountContext'
import { FormEvent, useState } from 'react'

const Login = () => {
  const { user, setUser } = useAccountContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    try {
      setLoading(true)
      const res = await axiosClient.post('account/login', {
        username: data.get('username'),
        password: data.get('password'),
      })
      setUser(res.data)
      setLoading(false)
      setError(null)
      localStorage.setItem('user', JSON.stringify(res.data))
    } catch (error: any) {
      localStorage.removeItem('user')
      setLoading(false)
      setError(error)
    }
  }

  if (user) return <Navigate to='/' />

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        {error && <Alert severity='error'>Username or password wrong!</Alert>}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='User name'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Login
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
