import React from 'react'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'
import SuperButton from '../../../../common/components/SuperButton/SuperButton'
import SuperInputText from '../../../../common/components/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import mainStyles from '../../../../common/styles/Container.module.css'
import { FormikErrorType } from '../../Register/Register'
import { setNewPasswordTC } from '../PasswordRecovery/passwordRecovery-reducer'
import { setAppStatusAC } from '../../../../app/app-reducer'

export const SetNewPassword = () => {
  const params = useParams()
  const resetPasswordToken = params.token
  const dispatch = useAppDispatch()
  const newPasswordRequestStatus = useAppSelector((state) => state.app.status)
  const formik = useFormik({
    initialValues: {
      password: '',
    },

    validate: (values) => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 2)
        errors.password = 'Invalid password. Password should be longer then 2 simvols!'

      return errors
    },

    onSubmit: (values) => {
      if (resetPasswordToken) dispatch(setNewPasswordTC(values.password, resetPasswordToken))
    },
  })

  if (newPasswordRequestStatus === 'succeeded') {
    dispatch(setAppStatusAC('idle'))

    return <Navigate to={'/Login'} />
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

        <p>Create new password and we will send you further instructions to email</p>

        <SuperButton className={mainStyles.mainButton} type={'submit'}>
          Create new password
        </SuperButton>
      </form>
    </div>
  )
}
