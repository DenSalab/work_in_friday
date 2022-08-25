import React from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../main/bll/store'
import s from './Footer.module.css'

export const Footer = () => {
  const serverError = useSelector<AppRootStateType, string>((state) => state.auth.serverError)
  return (
    <div className={s.footer}>
      {serverError ? (
        <span>Ошибка сервера - {serverError}</span>
      ) : (
        <span>Соединение с cервером прошло без ошибок {serverError}</span>
      )}
    </div>
  )
}
