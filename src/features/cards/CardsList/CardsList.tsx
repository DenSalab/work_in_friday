import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { CardType } from '../../../api/cardsAPI'
import Paginator from '../../../common/components/Pagination/Paginator'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useDebounce } from '../../../common/hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { edit } from '../../../common/swg/edit'
import { teacher } from '../../../common/swg/teacher'
import { trash } from '../../../common/swg/trash'
import {
  createCardTC,
  deleteCardTC,
  getCardsTC,
  setCardsListPageAC,
  setPageCountAC,
  setSearchedQuestionAC,
} from '../cards-reducer'

import s from './CardsList.module.css'

export const CardsList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector(state => state.auth.isLoggedIn)

  const cards = useAppSelector(state => state.cards.cards)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const page = useAppSelector(state => state.cards.page)
  const searchedQuestion = useAppSelector(state => state.cards.cardQuestion)
  const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchedQuestionAC(e.currentTarget.value))
  }
  const onChangePage = (page: number) => {
    dispatch(setCardsListPageAC(page))
  }
  const onSetPageCount = (page: number) => {
    dispatch(setPageCountAC(page))
  }
  const onAddNewCard = () => {
    dispatch(
      createCardTC({
        cardsPack_id: cardsPack_id,
        question: 'can I delete it?',
        answer: 'NOOOO',
      })
    )
    dispatch(getCardsTC())
  }

  const tableRender = (e: CardType) => {
    const onClickTeacher = () => {
      alert('Do you want to learn it?')
    }
    const onClickEdit = () => {
      alert('You can edit this card')
    }
    const onClickDelete = () => {
      dispatch(deleteCardTC(e._id))
      dispatch(getCardsTC())
    }

    return (
      <div className={s.tb_main} key={e._id}>
        <div className={s.tb_question}>{e.question}</div>
        <div className={s.tb_answer}>{e.answer}</div>
        <div className={s.tb_last}>{e.updated.slice(0, 10)}</div>
        <div className={s.tb_grade}>{e.grade}</div>
        <div className={s.tb_actions}>
          <div className={s.icon} onClick={onClickTeacher}>
            {teacher}
          </div>
          <div className={s.edit} onClick={onClickEdit}>
            {edit}
          </div>
          <div className={s.edit} onClick={onClickDelete}>
            {trash}
          </div>
        </div>
      </div>
    )
  }

  useDebounce(searchedQuestion, 500)

  useEffect(() => {
    dispatch(getCardsTC())
  }, [page, pageCount, cardsTotalCount, searchedQuestion])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h2>Cards list</h2>
        <SuperButton onClick={onAddNewCard}>Add new card</SuperButton>
      </div>

      <div className={s.control}>
        <div className={s.search}>
          <label htmlFor="search">Search</label>
          <input
            id={'search'}
            placeholder={'Provide your text'}
            className={s.search}
            value={searchedQuestion}
            onChange={onChangeSearch}
          />
        </div>
      </div>

      <div className={s.table}>
        <div className={s.tb_header}>
          <div className={s.tb_question}>Question</div>
          <div className={s.tb_answer}>Answer</div>
          <div className={s.tb_last}>Last Updated</div>
          <div className={s.tb_grade}>Grade</div>
          <div className={s.tb_actions}>Actions</div>
        </div>
        <div>{cards.map(e => tableRender(e))}</div>
      </div>

      <div className={s.footer}>
        <Paginator
          totalUsersCount={cardsTotalCount}
          currentPage={page}
          pageSize={pageCount}
          onPageChange={onChangePage}
        />
        <div className={s.pageCount}>
          <span>Show</span>
          <input
            type="number"
            step={1}
            min={1}
            max={25}
            value={pageCount}
            onChange={e => onSetPageCount(+e.currentTarget.value)}
          />
          <span>cards per page</span>
        </div>
      </div>
    </div>
  )
}
