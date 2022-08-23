import s from './Login.module.css'
import SuperInputText from '../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText'
import SuperCheckbox from '../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox'
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
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
            id="remember"
            onChange={formik.handleChange}
            checked={formik.values.remember}
          />
          <label htmlFor={'remember'}>Remember me</label>
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
    </div>
  )
}
