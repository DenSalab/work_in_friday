import React from 'react'

import { UserDataType } from '../../../main/dal/api'
import s from '../Profile.module.css'

type ProfileAvatarPropsType = {
  user: UserDataType
}
export const Avatar = (props: ProfileAvatarPropsType) => {
  return (
    <div>
      <div className={s.avatar}>{props.user.avatar}</div>
    </div>
  )
}
