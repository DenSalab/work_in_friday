import React from 'react'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'
import SuperButton from '../../../../common/components/SuperButton/SuperButton'
import SuperInputText from '../../../../common/components/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import mainStyles from '../../../../common/styles/Container.module.css'
import { passwordRecoveryTC } from './passwordRecovery-reducer'

type FormikErrorType = {
  email?: string
}

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const recoveryRequestStatus = useAppSelector((state) => state.app.status)
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
      dispatch(passwordRecoveryTC(values.email))
    },
  })

  if (recoveryRequestStatus === 'succeeded') return <Navigate to={'/test'} />

  return (
    <div className={mainStyles.container}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <h2>Forgot your password?</h2>
          <div>
            <div>
              <label>Email</label>
              <SuperInputText {...formik.getFieldProps('email')} error={formik.errors.email} />
            </div>

            <p>Enter your email address and we will send you further instructions</p>
          </div>

          <SuperButton type={'submit'} className={mainStyles.mainButton}>
            Send Instructions
          </SuperButton>

          <p>Did you remember your password?</p>
          <div className={mainStyles.header}>
            <Link to={'/Login'}>Try logging in</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
