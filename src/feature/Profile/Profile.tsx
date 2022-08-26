import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { logoutTC, updateUserTC } from '../../main/bll/profile-reducer'
import { AppRootStateType } from '../../main/bll/store'
import { UserDataType } from '../../main/dal/api'
import { EditableSpan } from '../../main/ui/common/EditableSpan/EditableSpan'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import logout from '../../main/ui/images/logout_FILL0_wght400_GRAD0_opsz48.png'

import { ProfileAvatar } from './Avatar/ProfileAvatar'
import s from './Profile.module.css'

export const Profile = () => {
  const user = useSelector<AppRootStateType, UserDataType>(state => state.profile.user)
  // const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
  const dispatch: any = useDispatch()

  // проверка логинизации в апп при старте
  return (
    <div className={s.container}>
      <div className={s.profile_block}>
        <div className={s.header}>
          <span>Personal Information</span>
        </div>
        <ProfileAvatar user={user} />
        <EditableSpan
          title={user.name}
          onChange={name => dispatch(updateUserTC({ ...user, name: name }))}
        />
        <div className={s.email}>{user.email}</div>
        <SuperButton onClick={() => dispatch(logoutTC())}>
          <img src={logout} className={s.symbols} alt="logout" />
          <span className={s.title}>Log out</span>
        </SuperButton>
      </div>
    </div>
  )
}
