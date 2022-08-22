import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Header from './header/Header'
import { Page404 } from './page404/Page404'
import { Login } from '../../n2-feature/f1-auth/a1-login/Login'

// hashRouter*
// добавить навлинки чтобы рыгать через хедер а не через логику
// <Main/>  общие структуры
function App() {
  return (
    <div>
      <Link to={'work_in_friday/a1-login'}>login</Link>---
      <Link to={'work_in_friday/register'}>register</Link>---
      <Link to={'work_in_friday/profile'}>profile</Link>---
      <Link to={'work_in_friday/404'}>404</Link>---
      <Link to={'work_in_friday/password_recovery'}>password_recovery</Link>---
      <Link to={'work_in_friday/new_password'}>new_password</Link>---
      <Link to={'work_in_friday/test'}>test</Link>
      <br />
      <Routes>
        <Route path={'work_in_friday/a1-login'} element={<Login />} />
        <Route path={'work_in_friday/register'} element={<>register</>} />
        <Route path={'work_in_friday/profile'} element={<>profile</>} />
        <Route path={'work_in_friday/404'} element={<Page404 />} />
        <Route path={'work_in_friday/password_recovery'} element={<>password recovery</>} />
        <Route path={'work_in_friday/new_password'} element={<>new password</>} />
        <Route path={'work_in_friday/test'} element={<>test</>} />
      </Routes>
    </div>
  )
}

export default App
