import React, { useEffect } from 'react'

import { Footer } from '../common/components/Footer/Footer'
import { Header } from '../common/components/Header/Header'
import { Pages } from '../common/components/Pages/Pages'
import { Preloader } from '../common/components/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks'

import { initializeAppTC, setAppInitializedAC } from './app-reducer'
import s from './App.module.css'

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const appError = useAppSelector(state => state.app.error)

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
      {appError && appError}
      <Footer />
    </div>
  )
}

export default App
