import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import { loginTC } from '../../main/bll/login-reducer'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import SuperCheckbox from '../../main/ui/common/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../main/ui/hooks/hooks'
import mainStyles from '../main-styles/Container.module.css'

import s from './Login.module.css'

export const Login = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.login)

  const formik = useFormik({
    initialValues: {
      email: 'nya-admin@nya.nya',
      password: '1qazxcvBG',
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
    },
  })

  return (
    <div className={mainStyles.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Sign in</h2>

        <div>
          <label htmlFor={'email'}>Email</label>

          <SuperInputText
            type="email"
            id="email"
            placeholder={'email'}
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label htmlFor={'password'}>Password</label>

          <SuperInputText
            type="password"
            id={'password'}
            placeholder={'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>

        <div className={s.remember}>
          <SuperCheckbox
            id="rememberMe"
            onChange={formik.handleChange}
            checked={formik.values.rememberMe}
          />

          <label htmlFor={'rememberMe'}>Remember me</label>
        </div>

        <div className={mainStyles.header}>
          <Link to={'/forgot'}>Forgot password?</Link>
        </div>

        <SuperButton type={'submit'} className={mainStyles.mainButton}>
          Sign in
        </SuperButton>

        <div className={mainStyles.header}>
          <span>Don&apos;t have an account?</span>

          <Link to="/register">Sign Up</Link>
        </div>
      </form>
      {status.loading ? 'КРУТИЛКА' : status.error}
    </div>
  )
}
