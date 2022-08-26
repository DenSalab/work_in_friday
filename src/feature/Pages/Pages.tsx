import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { CheckEmail } from '../CheckEmail/CheckEmail'
import s from '../Header/Header.module.css'
import { Login } from '../Login/Login'
import { Page404 } from '../Page404/Page404'
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery'
import { Profile } from '../Profile/Profile'
import { Register } from '../Register/Register'
import { SetNewPassword } from '../SetNewPassword/SetNewPassword'

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
