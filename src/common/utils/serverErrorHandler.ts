import axios, { AxiosError } from 'axios'
import { AppDispatchType } from '../../app/store'
import { setError } from '../../features/auth/Login/login-reducer'

export const serverErrorHandler = (
  error: Error | AxiosError<{ error: string }>,
  dispatch: AppDispatchType
): void => {
  const err = error as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message
    console.log(error)
    dispatch(setError(error))
  } else {
    dispatch(setError('more details in the console'))
  }
}
