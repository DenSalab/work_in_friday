import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './Header.module.css'
import logo from '../../assets/images/logo.png'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import SuperButton from '../SuperButton/SuperButton'
import { logoutTC } from '../../../features/auth/Profile/profile-reducer'
import { LinearPreloader } from '../preloaders/LinearPreloader/LinearPreloader'
import noAvatar from '../../assets/images/no_avatar.jpg'

export const Header = () => {
  const [signInMode, setSignInMode] = useState(true)
  const [select, setSelect] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLogin = useAppSelector((state) => state.auth.isLoggedIn)
  const userData = useAppSelector((state) => state.profile.user)
  const loading = useAppSelector((state) => state.app.status) === 'loading'

  const signInHandler = () => {
    setSignInMode(true)
    navigate('/login')
  }
  const signUpHandler = () => {
    setSignInMode(false)
    navigate('/register')
  }

  const onClickLoginHandler = () => {
    if (isLogin) {
      setSelect(!select)
    }
  }

  const onMouseLeaveHandler = () => {
    setTimeout(() => setSelect(false), 300)
  }

  const onClickLogOutHandler = () => {
    dispatch(logoutTC())
  }

  const nav = (
    <div className={s.selector} onMouseLeave={onMouseLeaveHandler}>
      <Link to={'/profile'} className={s.linkItem}>
        Profile
      </Link>
      <Link to={'/forgot'} className={s.linkItem}>
        Recovery Password
      </Link>
      <Link to={'/set_new_password/aaaa-bbbb-cccc-dddd'} className={s.linkItem}>
        New Password
      </Link>
      <Link to={'/packs_list'} className={s.linkItem}>
        Packs
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

  const headerMode = (
    <div>
      {signInMode ? (
        <SuperButton onClick={signInHandler}>Sign in</SuperButton>
      ) : (
        <SuperButton onClick={signUpHandler}>Sign up</SuperButton>
      )}
    </div>
  )

  return (
    <div className={s.header}>
      <LinearPreloader turnOn={loading} />
      <div className={s.container}>
        <div className={s.logo}>
          <img src={logo} alt="logo" onClick={() => navigate('/packs_list')} />
        </div>
        {isLogin ? user : headerMode}
      </div>
    </div>
  )
}
