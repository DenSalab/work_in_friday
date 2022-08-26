import s from './Login.module.css'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import SuperCheckbox from '../../main/ui/common/SuperCheckbox/SuperCheckbox'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginStatusType, loginTC } from '../../main/bll/login-reducer'
import { useAppDispatch, useAppSelector } from '../../main/ui/hooks/hooks'
import { AppRootStateType } from '../../main/bll/store'

export const Login = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.login)

  const formik = useFormik({
    initialValues: {
      email: 'nya-admin@nya.nya',
      password: '1qazxcvBG',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(loginTC(values))
    },
  })

  return (
    <div className={s.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Sign in</h2>

        <div className={s.inputs}>
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

        <Link className={s.forgotPass} to={'/forgot'}>
          Forgot password?
        </Link>

        <div className={s.signIn}>
          <SuperButton type={'submit'}>Sign in</SuperButton>
        </div>

        <div className={s.signUp}>
          <span>Don&apos;t have an account?</span>

          <Link to="/register">Sign Up</Link>
        </div>
      </form>
      {status.loading ? 'КРУТИЛКА' : status.error}
    </div>
  )
}
