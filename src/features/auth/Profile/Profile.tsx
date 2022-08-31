import React from 'react'

import { Navigate } from 'react-router-dom'

import { EditableSpan } from '../../../common/components/EditableSpan/EditableSpan'
import Notification from '../../../common/components/Notification/Notification'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import logout from '../../../common/images/logout_FILL0_wght400_GRAD0_opsz48.png'
import mainStyles from '../../../common/styles/Container.module.css'

import { logoutTC, updateUserTC } from './profile-reducer'
import s from './Profile.module.css'

export const Profile = () => {
  const user = useAppSelector(state => state.profile.user)
  const dispatch = useAppDispatch()
  const logOutHandler = () => dispatch(logoutTC())
  const onChangeNameHandler = (name: string) => {
    dispatch(updateUserTC({ ...user, name: name }))
  }
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={mainStyles.container}>
      <h2>Personal Information</h2>
      <Notification />

      <div className={s.avatar}>
        <img src={user.avatar} alt="avatar" />
      </div>

      <div className={s.info}>
        <EditableSpan title={user.name} onChange={onChangeNameHandler} />
        <span>{user.email}</span>
      </div>

      <SuperButton onClick={logOutHandler} className={s.mainButton}>
        <img src={logout} className={s.symbols} alt="logout" />
        Log out
      </SuperButton>
    </div>
  )
}
