import React from 'react'

import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { registerTC } from '../auth-reducer'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'

import mainStyles from '../../../common/styles/Container.module.css'

export type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const Register = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector(state => state.auth.isRegistered)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 2)
        errors.password = 'Invalid password. Passord should be longer then 2 simvols!'
      if (values.password !== values.confirmPassword)
        errors.confirmPassword = "Passwords don't match"

      return errors
    },
    onSubmit: values => {
      alert(JSON.stringify(values))
      const data = { email: values.email, password: values.password }

      dispatch(registerTC(data))
    },
  })

  if (isRegistered) return <Navigate to={'/Login'} />

  return (
    <div className={mainStyles.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Sign Up</h2>

        <label htmlFor="email">Email</label>
        <SuperInputText
          id={'email'}
          {...formik.getFieldProps('email')}
          error={formik.errors.email}
          placeholder={'enter your email'}
        />

        <label htmlFor="password">Password</label>
        <SuperInputText
          id={'password'}
          type="password"
          {...formik.getFieldProps('password')}
          error={formik.errors.password}
          placeholder={'enter password'}
        />

        <label htmlFor="confirm">Confirm password</label>
        <SuperInputText
          id={'confirm'}
          type="password"
          {...formik.getFieldProps('confirmPassword')}
          error={formik.errors.confirmPassword}
          placeholder={'confirm password'}
        />

        <SuperButton className={mainStyles.mainButton} type={'submit'}>
          Sign Up
        </SuperButton>

        <div className={mainStyles.header}>
          <span>Already have an account?</span>
          <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  )
}
