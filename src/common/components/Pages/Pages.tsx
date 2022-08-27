import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { CheckEmail } from '../../../features/auth/Recovery/CheckEmail/CheckEmail'
import s from '../Header/Header.module.css'
import { Login } from '../../../features/auth/Login/Login'
import { Page404 } from '../Page404/Page404'
import { PasswordRecovery } from '../../../features/auth/Recovery/PasswordRecovery/PasswordRecovery'
import { Profile } from '../../../features/auth/Profile/Profile'
import { Register } from '../../../features/auth/Register/Register'
import { SetNewPassword } from '../../../features/auth/Recovery/SetNewPassword/SetNewPassword'

export const Pages = () => {
  return (
    <div className={s.componentContainer}>
      <Routes>
        <Route path={'/Login'} element={<Login />} />
        <Route path={'/Register'} element={<Register />} />
        <Route path={'/Profile'} element={<Profile />} />
        <Route path={'/404'} element={<Page404 />} />
        <Route path={'/forgot'} element={<PasswordRecovery />} />
        <Route path={'/set_new_password'} element={<SetNewPassword />} />
        <Route path={'/test'} element={<CheckEmail />} />
      </Routes>
    </div>
  )
}
