import React from 'react'

import { useAppSelector } from '../../main/ui/hooks/hooks'

import s from './Footer.module.css'

export const Footer = () => {
  const serverError = useAppSelector(state => state.auth.serverError)

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
