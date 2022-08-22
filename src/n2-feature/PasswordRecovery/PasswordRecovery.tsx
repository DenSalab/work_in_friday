import React from 'react'
import s from './PasswordRecovery.module.css'
import SuperInputText from '../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/c2-SuperButton/SuperButton'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { passwordRecoveryTC, registerTC } from '../../n1-main/m2-bll/auth-reducer'
import { useAppDispatch } from '../../n1-main/m1-ui/hooks/hooks'
import { Navigate } from 'react-router-dom'

type FormikErrorType = {
  email?: string
}

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
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

  return (
    <div className={s.passwordRecovery}>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.form}>
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
            <Link to={'work_in_friday/login'}>Try logging in</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
