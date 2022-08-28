import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'

import { Login } from '../../../features/auth/Login/Login'
import { Profile } from '../../../features/auth/Profile/Profile'
import { CheckEmail } from '../../../features/auth/Recovery/CheckEmail/CheckEmail'
import { PasswordRecovery } from '../../../features/auth/Recovery/PasswordRecovery/PasswordRecovery'
import { SetNewPassword } from '../../../features/auth/Recovery/SetNewPassword/SetNewPassword'
import { Register } from '../../../features/auth/Register/Register'
import s from '../Header/Header.module.css'
import { Page404 } from '../Page404/Page404'

export const Pages = () => {
  return (
    <div className={s.componentContainer}>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/login'} />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/set_new_password'} element={<SetNewPassword />} />
        <Route path={'/forgot'} element={<PasswordRecovery />} />
        <Route path={'/test'} element={<CheckEmail />} />
        <Route path={'/404'} element={<Page404 />} />
      </Routes>
    </div>
  )
}
