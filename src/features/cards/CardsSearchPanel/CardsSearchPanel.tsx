import React, { ChangeEvent, useEffect } from 'react'

import { useDebounce } from '../../../common/hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { setSearchedQuestionAC } from '../cards-reducer'

import s from './CardsSearchPanel.module.css'

export const CardsSearchPanel = () => {
  const dispatch = useAppDispatch()
  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchedQuestionAC(e.currentTarget.value))
  }
  const searchedQuestion = useAppSelector((state) => state.cards.cardQuestion)

  useDebounce(searchedQuestion, 500)
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuestionAC(''))
    }
  }, [])

  return (
    <div className={s.control}>
      <div className={s.search}>
        <label htmlFor="search">Search</label>
        <input
          id={'search'}
          placeholder={'Provide your text'}
          className={s.search}
          value={searchedQuestion}
          onChange={onChangeSearchHandler}
        />
      </div>
    </div>
  )
}
