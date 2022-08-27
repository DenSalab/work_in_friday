import { loginReducer, setError, setLoading, setSuccess } from '../login-reducer'

test('reducer test', () => {
  const state = {
    error: '',
    loading: false,
    success: false,
  }
  const endState1 = loginReducer(state, setLoading(true))
  const endState2 = loginReducer(state, setError('some error'))
  const endState3 = loginReducer(state, setSuccess(true))

  expect(endState1.loading && endState1.error === '' && !endState1.success).toBeTruthy()
  expect(!endState2.loading && endState2.error === 'some error' && !endState2.success).toBeTruthy()
  expect(!endState3.loading && endState3.error === '' && endState3.success).toBeTruthy()
})
