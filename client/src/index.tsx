import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Category from './components/Category'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import { AccountProvider } from './context/AccountContext'
import PrivateRoute from './PrivateRoute'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='login' element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route index element={<Home />} />
              <Route path='category/:id' element={<Category />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
