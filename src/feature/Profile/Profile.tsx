import React from 'react'
import s from './Profile.module.css'
import { updateUserTC } from '../../main/bll/profile-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../main/bll/store'
import { EditableSpan } from '../../main/ui/common/EditableSpan/EditableSpan'
import { UserDataType } from '../../main/dal/api'
import { ProfileAvatar } from './Avatar/ProfileAvatar'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import logout from '../../main/ui/images/logout_FILL0_wght400_GRAD0_opsz48.png'

export const Profile = () => {
  const user = useSelector<AppRootStateType, UserDataType>((state) => state.profile.user)
  // const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
  const dispatch: any = useDispatch()

  // проверка логинизации в апп при старте
  return (
    <div className={s.profile}>
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
        <SuperButton
          onClick={() =>
            dispatch(() => {
              // тут был logoutTC()
            })
          }
        >
          <img src={logout} className={s.symbols} alt="logout" />
          <span className={s.title}>Log out</span>
        </SuperButton>
      </div>
    </div>
  )
}
