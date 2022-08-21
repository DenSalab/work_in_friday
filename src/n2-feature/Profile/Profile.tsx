import React, { useEffect } from 'react'
import s from './Profile.module.css'
import logout from './../../n1-main/m1-ui/images/logout_FILL0_wght400_GRAD0_opsz48.png'
import { updateUserTC } from '../../n1-main/m2-bll/profileReducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import { profileAPI, UserType } from './profileAPI'
import { EditableSpan } from '../../n1-main/m1-ui/common/c4-EditableSpan/EditableSpan'

export const Profile = () => {
  const user = useSelector<AppRootStateType, UserType>((state) => state.profile)
  const dispatch: any = useDispatch()

  //need fix after getting auth-api
  useEffect(() => {
    profileAPI
      .login()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])
  return (
    <div className={s.profile}>
      <div className={s.profile_block}>
        <div className={s.header}>
          <span>Personal Information</span>
        </div>
        <div className={s.avatar}></div>
        <EditableSpan title={user.name} onChange={(name) => dispatch(updateUserTC(name, ''))} />
        <div className={s.email}>qwerty@gmail.com</div>
        <div className={s.button}>
          <img src={logout} className={s.symbols} />
          <span className={s.title}>Log out</span>
        </div>
      </div>
    </div>
  )
}
