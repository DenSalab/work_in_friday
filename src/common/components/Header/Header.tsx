import React from 'react'
import { Link } from 'react-router-dom'
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
        <Link to={'/set_new_password/aaaa-bbbb-cccc-dddd'} className={s.linkItem}>
          New Password
        </Link>
        <Link to={'/test'} className={s.linkItem}>
          Test
        </Link>
        <Link to={'/packs_list'} className={s.linkItem}>
          Packs List
        </Link>
        <Link to={'/cards_list'} className={s.linkItem}>
          Cards List
        </Link>
        <br />
      </div>
    </div>
  )
}
