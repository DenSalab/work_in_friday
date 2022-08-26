import React from 'react'

import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { passwordRecoveryTC } from '../../main/bll/passwordRecovery-reducer'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../main/ui/hooks/hooks'

import s from './PasswordRecovery.module.css'

type FormikErrorType = {
  email?: string
}

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const recoveryRequestStatus = useAppSelector(
    state => state.passwordRecovery.recoveryRequestStatus
  )
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      console.log(values.email)
      dispatch(passwordRecoveryTC(values.email))
    },
  })

  if (recoveryRequestStatus === 'succeeded') return <Navigate to={'/test'} />

  return (
    <div className={s.passwordRecovery}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className={s.formName}>Forgot your password?</div>
          <div className={s.inputsBox}>
            <div className={s.inputWrapper}>
              <span>Email</span>
              <SuperInputText {...formik.getFieldProps('email')} error={formik.errors.email} />
            </div>

            <div className={s.text}>
              Enter your email address and we will send you further instructions
            </div>
          </div>

          <div className={s.buttonWrapper}>
            <SuperButton width100pr={true} type={'submit'}>
              Send Instructions
            </SuperButton>
          </div>

          <div className={s.text}>Did you remember your password?</div>
          <div className={s.link_to_login}>
            <Link to={'/login'}>Try logging in</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
