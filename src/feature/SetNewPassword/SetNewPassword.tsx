import React from 'react'

import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import {
  newPasswordRequestStatusAC,
  setNewPasswordTC,
} from '../../main/bll/passwordRecovery-reducer'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../main/ui/hooks/hooks'
import { FormikErrorType } from '../Register/Register'

import s from './SetNewPassword.module.css'

export const SetNewPassword = () => {
  const params = useParams()
  const resetPasswordToken = params.token
  const dispatch = useAppDispatch()
  const newPasswordRequestStatus = useAppSelector(
    state => state.passwordRecovery.newPasswordRequestStatus
  )
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 2)
        errors.password = 'Invalid password. Passord should be longer then 2 simvols!'
      if (values.password !== values.confirmPassword)
        errors.confirmPassword = "Passwords don't match"

      return errors
    },

    onSubmit: values => {
      if (resetPasswordToken) dispatch(setNewPasswordTC(values.password, resetPasswordToken))
    },
  })

  if (newPasswordRequestStatus === 'succeeded') {
    dispatch(newPasswordRequestStatusAC('idle'))

    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.setPassword}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className={s.formName}>Create new password</div>
          <div className={s.inputsBox}>
            <div className={s.inputWrapper}>
              <span>Password</span>
              <SuperInputText
                type="password"
                {...formik.getFieldProps('password')}
                error={formik.errors.password}
              />
            </div>

            <div className={s.inputWrapper}>
              <span>Confirm password</span>
              <SuperInputText
                type="password"
                {...formik.getFieldProps('confirmPassword')}
                error={formik.errors.confirmPassword}
              />
            </div>
          </div>

          <div className={s.text_if_login}>
            Create new password and we will send you further instructions to email
          </div>

          <div className={s.buttonWrapper}>
            <SuperButton width100pr={true} type={'submit'}>
              Create new password
            </SuperButton>
          </div>
        </div>
      </form>
    </div>
  )
}
