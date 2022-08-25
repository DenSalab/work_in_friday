import React from 'react'
import s from './Register.module.css'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { registerTC } from '../../main/bll/auth-reducer'
import { useAppDispatch } from '../../main/ui/hooks/hooks'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../main/bll/store'
import { Navigate } from 'react-router-dom'

export type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const Register = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useSelector<AppRootStateType, boolean>((state) => state.auth.isRegistered)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
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
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      const data = { email: values.email, password: values.password }
      dispatch(registerTC(data))
    },
  })

  if (isRegistered) return <Navigate to={'/login'} />

  return (
    <div className={s.register}>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.form}>
          <div className={s.formName}>Sign Up</div>
          <div className={s.inputsBox}>
            <div className={s.inputWrapper}>
              <span>Email</span>
              <SuperInputText {...formik.getFieldProps('email')} error={formik.errors.email} />
            </div>
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
          <div className={s.buttonWrapper}>
            <SuperButton width100pr={true} type={'submit'}>
              Sign Up
            </SuperButton>
          </div>
          <div className={s.text_if_login}>Already have an account?</div>
          <div className={s.link_to_login}>
            <Link to={'/login'}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
