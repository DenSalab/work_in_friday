import React from 'react'

import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import {
  newPasswordRequestStatusAC,
  RecoveryRequestStatusType,
  setNewPasswordTC,
} from '../../main/bll/passwordRecovery-reducer'
import { AppRootStateType } from '../../main/bll/store'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import { useAppDispatch } from '../../main/ui/hooks/hooks'
import { FormikErrorType } from '../Register/Register'

import mainStyles from '../main-styles/Container.module.css'

export const SetNewPassword = () => {
  const params = useParams()
  const resetPasswordToken = params.token
  const dispatch = useAppDispatch()
  const newPasswordRequestStatus = useSelector<AppRootStateType, RecoveryRequestStatusType>(
    (state) => state.passwordRecovery.newPasswordRequestStatus
  )
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 2)
        errors.password = 'Invalid password. Password should be longer then 2 symbols!'
      if (values.password !== values.confirmPassword)
        errors.confirmPassword = "Passwords don't match"

      return errors
    },
    onSubmit: (values) => {
      if (resetPasswordToken) dispatch(setNewPasswordTC(values.password, resetPasswordToken))
    },
  })

  if (newPasswordRequestStatus === 'succeeded') {
    dispatch(newPasswordRequestStatusAC('idle'))

    return <Navigate to={'/login'} />
  }

  return (
    <div className={mainStyles.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Create new password</h2>

        <label htmlFor="password">Password</label>
        <SuperInputText
          id={'password'}
          type="password"
          {...formik.getFieldProps('password')}
          error={formik.errors.password}
        />

        <label htmlFor="confirm">Confirm password</label>
        <SuperInputText
          type="password"
          {...formik.getFieldProps('confirmPassword')}
          error={formik.errors.confirmPassword}
        />

        <p>Create new password and we will send you further instructions to email</p>

        <SuperButton className={mainStyles.mainButton} type={'submit'}>
          Create new password
        </SuperButton>
      </form>
    </div>
  )
}
