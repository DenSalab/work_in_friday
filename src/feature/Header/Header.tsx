import { Link, Route, Routes } from 'react-router-dom'
import React from 'react'
import { Login } from '../Login/Login'
import { Register } from '../Register/Register'
import { Profile } from '../Profile/Profile'
import { Page404 } from '../Page404/Page404'
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery'
import { SetNewPassword } from '../SetNewPassword/SetNewPassword'
import { CheckEmail } from '../CheckEmail/CheckEmail'
import s from './Header.module.css'

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Link to={'/login'} className={s.linkItem}>
          Log In
        </Link>
        <Link to={'/register'} className={s.linkItem}>
          Registration
        </Link>
        <Link to={'/profile'} className={s.linkItem}>
          Profile
        </Link>
        <Link to={'/404'} className={s.linkItem}>
          Error
        </Link>
        <Link to={'/forgot'} className={s.linkItem}>
          Recovery Password
        </Link>
        <Link to={'/set_new_password'} className={s.linkItem}>
          New Password
        </Link>
        <Link to={'/test'} className={s.linkItem}>
          Test
        </Link>
        <br />
      </div>
    </div>
  )
}
