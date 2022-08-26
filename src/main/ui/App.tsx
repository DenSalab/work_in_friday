import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Page404 } from '../../feature/Page404/Page404'
import { Register } from '../../feature/Register/Register'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../bll/store'
import { initializeAppTC, RequestStatusType } from '../bll/app-reducer'
import { useAppDispatch } from './hooks/hooks'
import { Profile } from '../../feature/Profile/Profile'
import { Login } from '../../feature/Login/Login'
import s from './App.module.css'
import { PasswordRecovery } from '../../feature/PasswordRecovery/PasswordRecovery'
import { CheckEmail } from '../../feature/CheckEmail/CheckEmail'
import { Preloader } from './common/Preloader/Preloader'
import { SetNewPassword } from '../../feature/SetNewPassword/SetNewPassword'
import { LoginStatusType } from '../bll/login-reducer'

function App() {
  const dispatch = useAppDispatch()
  // const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
  const serverError = useSelector<AppRootStateType, string>((state) => state.auth.serverError)
  const loginStatus = useSelector<AppRootStateType, LoginStatusType>((state) => state.login)
  const navigate = useNavigate()

  useEffect(() => {
    if (loginStatus.success) {
      dispatch(initializeAppTC())
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }, [loginStatus.success])

  if (loginStatus.loading) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <div>ОЖИДАЕМ ИДЕТ СОЕДИНЕНИЕ С СЕРВЕРОМ</div>
      </div>
    )
  }

  return (
    <div className={s.appWrapper}>
      <Link to={'/'}>main</Link>
      <Link to={'/login'}>login</Link>
      <Link to={'/register'}>register</Link>
      <Link to={'/profile'}>profile</Link>
      <Link to={'/404'}>error404</Link>
      <Link to={'/forgot'}>password_recovery</Link>
      <Link to={'/set_new_password'}>new_password</Link>
      <Link to={'/test'}>test</Link>
      <br />
      {status === 'loading' && <Preloader />}
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/404'} element={<Page404 />} />
        <Route path={'/forgot'} element={<PasswordRecovery />} />
        <Route path={'/set-new-password/:token'} element={<SetNewPassword />} />
        <Route path={'/test'} element={<CheckEmail />} />
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
