import axios, { AxiosError } from 'axios'

import { setAppErrorAC } from '../../app/app-reducer'
import { AppDispatchType } from '../../app/store'

export const serverErrorHandler = (
  error: Error | AxiosError<{ error: string }>,
  dispatch: AppDispatchType
): void => {
  const err = error as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    console.log(error)
    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC('more details in the console'))
  }
}
