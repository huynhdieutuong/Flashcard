import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAccountContext } from './context/AccountContext'

const PrivateRoute = () => {
  const { user } = useAccountContext()
  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='../login' replace state={{ from: location }} />
  )
}

export default PrivateRoute
