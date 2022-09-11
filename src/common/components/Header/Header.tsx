import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './Header.module.css'
import logo from './../../images/logo.png'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import SuperButton from '../SuperButton/SuperButton'
import { logoutTC } from '../../../features/auth/Profile/profile-reducer'
import { LinearPreloader } from '../preloaders/LinearPreloader/LinearPreloader'
import noAvatar from '../../images/no_avatar.jpg'

export const Header = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.auth.isLoggedIn)
  const userData = useAppSelector((state) => state.profile.user)
  const [select, setSelect] = useState(false)
  const loading = useAppSelector((state) => state.app.status) === 'loading'

  const navigate = useNavigate()
  const logInHandler = () => {
    navigate('/login')
  }

  const onClickLoginHandler = () => {
    if (isLogin) {
      setSelect(!select)
    }
  }

  const onMouseLeaveHandler = () => {
    setTimeout(() => setSelect(false), 300)
  }

  const onClickLogOutHandler = () => dispatch(logoutTC())

  const nav = (
    <div className={s.selector} onMouseLeave={onMouseLeaveHandler}>
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
      <Link to={'/cards_list/1'} className={s.linkItem}>
        Cards List
      </Link>
      <button onClick={onClickLogOutHandler}>Log Out</button>
    </div>
  )

  const user = (
    <div className={s.user} onClick={onClickLoginHandler}>
      <div className={s.user_name}>{userData.name}</div>
      <div className={s.user_photo}>
        <img src={userData.avatar || noAvatar} alt="avatar" />
      </div>
      {select ? nav : ''}
    </div>
  )

  return (
    <div className={s.header}>
      <LinearPreloader turnOn={loading} />
      <div className={s.container}>
        <div className={s.logo}>
          <img src={logo} alt="logo" onClick={() => navigate('/packs_list')} />
        </div>
        {isLogin ? user : <SuperButton onClick={logInHandler}>Sign in</SuperButton>}
      </div>
    </div>
  )
}
