import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Footer } from '../common/components/Footer/Footer'
import { Header } from '../common/components/Header/Header'
import { Pages } from '../common/components/Pages/Pages'
import { initializeAppTC } from './app-reducer'

import s from './App.module.css'
import { Preloader } from '../common/components/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks'

function App() {
  const dispatch = useAppDispatch()
  const loginStatus = useAppSelector((state) => state.login)
  const navigate = useNavigate()
  const status = useAppSelector((state) => state.app.status)

  useEffect(() => {
    console.log('initialize App')
    dispatch(initializeAppTC())
    if (loginStatus.success) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    console.log('init')
    if (loginStatus.success) {
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

  console.log('___app rendered')

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
