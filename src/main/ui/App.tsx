import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Footer } from '../../feature/Footer/Footer'
import { Header } from '../../feature/Header/Header'
import { Pages } from '../../feature/Pages/Pages'
import { initializeAppTC } from '../bll/app-reducer'

import s from './App.module.css'
import { Preloader } from './common/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

function App() {
  const dispatch = useAppDispatch()
  const loginStatus = useAppSelector(state => state.login)
  const navigate = useNavigate()
  const status = useAppSelector(state => state.app.status)

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
        <Preloader />
      </div>
    )
  }

  return (
    <div className={s.appWrapper}>
      <Header />
      {status === 'loading' && <Preloader />}
      <Pages />
      <Footer />
    </div>
  )
}

export default App
