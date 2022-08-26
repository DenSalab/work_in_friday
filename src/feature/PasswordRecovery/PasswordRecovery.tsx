import React from 'react'
import mainStyles from '../main-styles/Container.module.css'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import { Link, Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import {
  passwordRecoveryTC,
  RecoveryRequestStatusType,
} from '../../main/bll/passwordRecovery-reducer'
import { useAppDispatch } from '../../main/ui/hooks/hooks'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../main/bll/store'

type FormikErrorType = {
  email?: string
}

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const recoveryRequestStatus = useSelector<AppRootStateType, RecoveryRequestStatusType>(
    (state) => state.passwordRecovery.recoveryRequestStatus
  )
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors
    },
    onSubmit: (values) => {
      console.log(values.email)
      dispatch(passwordRecoveryTC(values.email))
    },
  })

  if (recoveryRequestStatus === 'succeeded') return <Navigate to={'/test'} />

  return (
    <div className={mainStyles.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Forgot your password?</h2>

        <label htmlFor="email">Email</label>
        <SuperInputText
          id={'email'}
          {...formik.getFieldProps('email')}
          error={formik.errors.email}
        />

        <p>Enter your email address and we will send you further instructions</p>

        <SuperButton className={mainStyles.mainButton} type={'submit'}>
          Send Instructions
        </SuperButton>

        <div className={mainStyles.header}>
          <span>Did you remember your password?</span>
          <Link to="/login">Try logging in</Link>
          <div>
            {recoveryRequestStatus === 'failed'
              ? 'Произошла ошибка сервера, пожалуйта повторите поздже'
              : ''}
          </div>
        </div>
      </form>
    </div>
  )
}
