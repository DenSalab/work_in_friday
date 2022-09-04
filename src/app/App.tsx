import React, { useEffect } from 'react'
import { Footer } from '../common/components/Footer/Footer'
import { Header } from '../common/components/Header/Header'
import Notification from '../common/components/Notification/Notification'
import { Pages } from '../common/components/Pages/Pages'
import { Spinner } from '../common/components/preloaders/Spinner/Spinner'
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks'

import { initializeAppTC, setAppInitializedAC } from './app-reducer'
import s from './App.module.css'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector((state) => state.app.isInitialized)
  const error = useAppSelector((state) => state.app.error)

  useEffect(() => {
    dispatch(initializeAppTC())

    return () => {
      setAppInitializedAC(false)
    }
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <div>ОЖИДАЕМ ИДЕТ СОЕДИНЕНИЕ С СЕРВЕРОМ</div>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={s.container}>
      <Header />
      <Pages />
      {error && <Notification />}
      <Footer />
    </div>
  )
}

export default App
