import React, { useEffect } from 'react'
import s from './Profile.module.css'
import logout from './../../n1-main/m1-ui/images/logout_FILL0_wght400_GRAD0_opsz48.png'
import { updateUserTC } from '../../n1-main/m2-bll/profile-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import { EditableSpan } from '../../n1-main/m1-ui/common/c4-EditableSpan/EditableSpan'
import { Navigate } from 'react-router-dom'
import { initializeAppTC } from '../../n1-main/m2-bll/app-reducer'
import { UserType } from './profileAPI'

export const Profile = () => {
  const user = useSelector<AppRootStateType, UserType>((state) => state.profile.user)
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
  const dispatch: any = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(initializeAppTC())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.profile}>
      <div className={s.profile_block}>
        <div className={s.header}>
          <span>Personal Information</span>
        </div>
        <div className={s.avatar}>{user.avatar}</div>
        <EditableSpan
          title={user.name}
          onChange={(name) => dispatch(updateUserTC({ ...user, name: name }))}
        />
        <div className={s.email}>{user.email}</div>
        <div className={s.button}>
          <img src={logout} className={s.symbols} />
          <span className={s.title}>Log out</span>
        </div>
      </div>
    </div>
  )
}