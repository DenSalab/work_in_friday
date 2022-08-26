import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutTC, updateUserTC } from '../../main/bll/profile-reducer'
import { AppRootStateType } from '../../main/bll/store'
import { UserDataType } from '../../main/dal/api'
import { EditableSpan } from '../../main/ui/common/EditableSpan/EditableSpan'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import logout from '../../main/ui/images/logout_FILL0_wght400_GRAD0_opsz48.png'

import s from './Profile.module.css'
import mainStyles from '../main-styles/Container.module.css'

export const Profile = () => {
  const user = useSelector<AppRootStateType, UserDataType>((state) => state.profile.user)
  const dispatch: any = useDispatch()

  return (
    <div className={mainStyles.container}>
      <h2>Personal Information</h2>

      <div className={s.avatar}>
        <img src={user.avatar} alt="asd" />
      </div>

      <div className={s.info}>
        <EditableSpan
          title={user.name}
          onChange={(name) => dispatch(updateUserTC({ ...user, name: name }))}
        />
        <span>{user.email}</span>
      </div>

      <SuperButton onClick={() => dispatch(logoutTC())} className={s.mainButton}>
        <img src={logout} className={s.symbols} alt="logout" />
        <span>Log out</span>
      </SuperButton>
    </div>
  )
}
