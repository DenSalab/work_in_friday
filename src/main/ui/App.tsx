import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Page404 } from '../../feature/Page404/Page404'
import { Register } from '../../feature/Register/Register'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../bll/store'
import { initializeAppTC } from '../bll/app-reducer'
import { useAppDispatch } from './hooks/hooks'
import { Profile } from '../../feature/Profile/Profile'
import { Login } from '../../feature/Login/Login'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
  const serverError = useSelector<AppRootStateType, string>((state) => state.auth.serverError)
  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <div>ОЖИДАЕМ ИДЕТ СОЕДИНЕНИЕ С СЕРВЕРОМ</div>
      </div>
    )
  }

  return (
    <div>
      <Link to={'/login'}>login</Link>---
      <Link to={'/register'}>register</Link>---
      <Link to={'/profile'}>profile</Link>---
      <Link to={'/404'}>404</Link>---
      <Link to={'/password_recovery'}>password_recovery</Link>---
      <Link to={'/new_password'}>new_password</Link>---
      <Link to={'/test'}>test</Link>
      <br />
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/404'} element={<Page404 />} />
        <Route path={'/password_recovery'} element={<>password recovery</>} />
        <Route path={'/new_password'} element={<>new password</>} />
        <Route path={'/test'} element={<>test</>} />
      </Routes>
      {serverError ? (
        <span>Ошибка сервера - {serverError}</span>
      ) : (
        <span>Соединение с cервером прошло без ошибок {serverError}</span>
      )}
    </div>
  )
}

export default App