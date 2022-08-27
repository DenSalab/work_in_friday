import React from 'react'
import { logoutTC, updateUserTC } from './profile-reducer'
import { EditableSpan } from '../../../../common/components/EditableSpan/EditableSpan'
import SuperButton from '../../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import logout from '../../../../common/images/logout_FILL0_wght400_GRAD0_opsz48.png'
import mainStyles from '../../../../common/styles/Container.module.css'

import s from './Profile.module.css'

export const Profile = () => {
  const user = useAppSelector((state) => state.profile.user)
  const dispatch = useAppDispatch()
  const logOutHandler = () => dispatch(logoutTC())

  return (
    <div className={mainStyles.container}>
      <h2>Personal Information</h2>

      <div className={s.avatar}>
        <img src={user.avatar} alt="avatar" />
      </div>

      <div className={s.info}>
        <EditableSpan
          title={user.name}
          onChange={(name) => dispatch(updateUserTC({ ...user, name: name }))}
        />
        <span>{user.email}</span>
      </div>

      <SuperButton onClick={logOutHandler} className={s.mainButton}>
        <img src={logout} className={s.symbols} alt="logout" />
        Log out
      </SuperButton>
    </div>
  )
}
