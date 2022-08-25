import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
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
import {Header} from "../../feature/Header/Header";

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
  const serverError = useSelector<AppRootStateType, string>((state) => state.auth.serverError)
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
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
    <div className={s.appWrapper}>
     <Header />
      {status === 'loading' && <Preloader />}
      {serverError ? (
        <span>Ошибка сервера - {serverError}</span>
      ) : (
        <span>Соединение с cервером прошло без ошибок {serverError}</span>
      )}
    </div>
  )
}

export default App
