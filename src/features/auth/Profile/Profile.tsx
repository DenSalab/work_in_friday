import React, { ChangeEvent, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { EditableSpan } from '../../../common/components/EditableSpan/EditableSpan'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import logout from '../../../common/assets/images/logout.png'
import mainStyles from '../../../common/styles/Container.module.css'
import { logoutTC, updateUserTC } from './profile-reducer'
import s from './Profile.module.css'
import noAvatar from '../../../common/assets/images/no_avatar.jpg'
import { changePhoto } from '../../../common/assets/images/svg/changePhoto'

export const Profile = () => {
  const user = useAppSelector((state) => state.profile.user)
  const dispatch = useAppDispatch()
  const logOutHandler = () => dispatch(logoutTC())
  const onChangeNameHandler = (name: string) => {
    dispatch(updateUserTC({ ...user, name: name }))
  }
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      console.log('file: ', file)

      if (file.size < 4000000) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const file64 = reader.result as string
          dispatch(updateUserTC({ ...user, avatar: file64 }))
        }
        reader.readAsDataURL(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  return (
    <div className={mainStyles.container}>
      <h2>Personal Information</h2>
      <div className={s.avatar}>
        <img src={user.avatar || noAvatar} alt="avatar" />
        <div className={s.loadPhoto} onClick={selectFileHandler}>
          {changePhoto}
          <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={uploadHandler} />
        </div>
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
