import React from 'react'

import { Link } from 'react-router-dom'

import s from './Header.module.css'

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Link to={'/Login'} className={s.linkItem}>
          Log In
        </Link>
        <Link to={'/Register'} className={s.linkItem}>
          Registration
        </Link>
        <Link to={'/Profile'} className={s.linkItem}>
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
