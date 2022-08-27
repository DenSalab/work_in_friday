import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { CheckEmail } from '../../../features/auth/register/CheckEmail/CheckEmail'
import s from '../Header/Header.module.css'
import { Login } from '../../../features/auth/login/Login'
import { Page404 } from '../Page404/Page404'
import { PasswordRecovery } from '../../../features/auth/register/PasswordRecovery/PasswordRecovery'
import { Profile } from '../../../features/auth/profile/Profile/Profile'
import { Register } from '../../../features/auth/register/Register/Register'
import { SetNewPassword } from '../../../features/auth/register/SetNewPassword/SetNewPassword'

export const Pages = () => {
  return (
    <div className={s.componentContainer}>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/404'} element={<Page404 />} />
        <Route path={'/forgot'} element={<PasswordRecovery />} />
        <Route path={'/set_new_password'} element={<SetNewPassword />} />
        <Route path={'/test'} element={<CheckEmail />} />
      </Routes>
    </div>
  )
}
