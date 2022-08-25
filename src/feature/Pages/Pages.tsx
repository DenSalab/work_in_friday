import React from 'react'
import s from '../Header/Header.module.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../Login/Login'
import { Register } from '../Register/Register'
import { Profile } from '../Profile/Profile'
import { Page404 } from '../Page404/Page404'
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery'
import { SetNewPassword } from '../SetNewPassword/SetNewPassword'
import { CheckEmail } from '../CheckEmail/CheckEmail'

export const Pages = () => {
  return (
    <div className={s.componentContainer}>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/404'} element={<Page404 />} />
        <Route path={'/password_recovery'} element={<PasswordRecovery />} />
        <Route path={'/set_new_password'} element={<SetNewPassword />} />
        <Route path={'/test'} element={<CheckEmail />} />
      </Routes>
    </div>
  )
}
