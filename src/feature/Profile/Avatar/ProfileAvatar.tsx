import React from 'react'
import s from '../Profile.module.css'
import { UserDataType } from '../../../main/dal/api'

type ProfileAvatarPropsType = {
  user: UserDataType
}
export const ProfileAvatar = (props: ProfileAvatarPropsType) => {
  return (
    <div>
      <div className={s.avatar}>{props.user.avatar}</div>
    </div>
  )
}
