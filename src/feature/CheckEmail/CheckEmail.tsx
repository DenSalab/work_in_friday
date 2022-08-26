import React from 'react'
import s from './CheckEmail.module.css'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import icon from './emailIcon.png'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppRootStateType } from '../../main/bll/store'
import {
  recoveryRequestStatusAC,
  RecoveryRequestStatusType,
} from '../../main/bll/passwordRecovery-reducer'
import { useAppDispatch } from '../../main/ui/hooks/hooks'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const recoveryEmail = useSelector<AppRootStateType, string>(
    state => state.passwordRecovery.recoveryEmail
  )
  const recoveryRequestStatus = useSelector<AppRootStateType, RecoveryRequestStatusType>(
    state => state.passwordRecovery.recoveryRequestStatus
  )

  const onClickHandler = () => {
    dispatch(recoveryRequestStatusAC('idle'))
  }

  if (recoveryRequestStatus === 'idle') return <Navigate to={'/login'} />

  return (
    <div className={s.checkEmail}>
      <div>
        <div className={s.formName}>Check Email</div>
        <div className={s.icon}>
          <img src={icon} alt="icon" />
        </div>
        <div className={s.text}>
          We’ve sent an Email with instructions to <b>{recoveryEmail}</b>
        </div>
        <div className={s.buttonWrapper}>
          <SuperButton width100pr={true} onClick={onClickHandler}>
            Back to login
          </SuperButton>
        </div>
      </div>
    </div>
  )
}
