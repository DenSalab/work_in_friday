import React from 'react'

import { Navigate } from 'react-router-dom'

import { recoveryRequestStatusAC } from '../PasswordRecovery/passwordRecovery-reducer'
import SuperButton from '../../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'

import s from './CheckEmail.module.css'
import icon from './emailIcon.png'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const recoveryEmail = useAppSelector((state) => state.passwordRecovery.recoveryEmail)
  const recoveryRequestStatus = useAppSelector(
    (state) => state.passwordRecovery.recoveryRequestStatus
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
