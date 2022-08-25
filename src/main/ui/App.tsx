import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../bll/store'
import { initializeAppTC, RequestStatusType } from '../bll/app-reducer'
import { useAppDispatch } from './hooks/hooks'
import s from './App.module.css'
import { Preloader } from './common/Preloader/Preloader'
import { Header } from '../../feature/Header/Header'
import { Pages } from '../../feature/Pages/Pages'
import { Footer } from '../../feature/Footer/Footer'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
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
      <Pages />
      <Footer />
    </div>
  )
}

export default App
