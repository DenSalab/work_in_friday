import React from 'react'

import { logoutTC, updateUserTC } from '../../main/bll/profile-reducer'
import { EditableSpan } from '../../main/ui/common/EditableSpan/EditableSpan'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../main/ui/hooks/hooks'
import logout from '../../main/ui/images/logout_FILL0_wght400_GRAD0_opsz48.png'

import { Avatar } from './Avatar/Avatar'
import s from './Profile.module.css'

export const Profile = () => {
  const user = useAppSelector(state => state.profile.user)
  const dispatch = useAppDispatch()
  const logOutHandler = () => dispatch(logoutTC())

  return (
    <div className={s.container}>
      <div className={s.profile_block}>
        <div className={s.header}>
          <span>Personal Information</span>
        </div>

        <Avatar user={user} />

        <EditableSpan
          title={user.name}
          onChange={name => dispatch(updateUserTC({ ...user, name: name }))}
        />

        <div className={s.email}>{user.email}</div>

        <SuperButton onClick={logOutHandler}>
          <img src={logout} className={s.symbols} alt="logout" />
          <span className={s.title}>Log out</span>
        </SuperButton>
      </div>
    </div>
  )
}
