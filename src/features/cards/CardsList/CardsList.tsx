import React, { ChangeEvent, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { CardType } from '../../../api/cardsAPI'
import { ArrowBack } from '../../../common/components/ArrowBack/ArrowBack'
import Paginator from '../../../common/components/Pagination/Paginator'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useDebounce } from '../../../common/hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { edit } from '../../../common/swg/edit'
import { teacher } from '../../../common/swg/teacher'
import { trash } from '../../../common/swg/trash'
import {
  getCardsTC,
  setCardsListPageAC,
  setPageCountAC,
  setSearchedQuestionAC,
} from '../cards-reducer'
import { AddCardModal } from '../modals/AddNewCardModal'
import { DelCardModal } from '../modals/DelCardModal'
import { EditCardModal } from '../modals/EditCardModal'

import s from './CardsList.module.css'

export const CardsList = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const packId = params.packId ? params.packId : ''
  const isLoggedIn: boolean = useAppSelector(state => state.auth.isLoggedIn)

  const cards = useAppSelector(state => state.cards.cards)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const page = useAppSelector(state => state.cards.page)
  const searchedQuestion = useAppSelector(state => state.cards.cardQuestion)
  const user_id: string = useAppSelector(state => state.profile.user._id)

  const [addModalActive, setAddModalActive] = useState(false)
  const [editModalActive, setEditModalActive] = useState(false)
  const [delModalActive, setDelModalActive] = useState(false)
  const [editedCard, setEditedCard] = useState({} as CardType)

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
    setAddModalActive(true)
  }

  const tableRender = (e: CardType) => {
    const onClickTeacher = () => {
      alert('Do you want to learn it?')
    }
    const onClickEdit = () => {
      setEditedCard(e)
      setEditModalActive(true)
    }
    const onClickDelete = () => {
      setEditedCard(e)
      setDelModalActive(true)
    }

    return (
      <div className={s.tb_main} key={e._id}>
        <div className={s.tb_question}>{e.question}</div>
        <div className={s.tb_answer}>{e.answer}</div>
        <div className={s.tb_last}>{e.updated.slice(0, 10)}</div>
        <div className={s.tb_grade}>{e.grade}</div>
        <div className={s.tb_actions}>
          <div className={s.teacher} onClick={onClickTeacher}>
            {teacher}
          </div>
          {e.user_id === user_id && (
            <div className={s.edit} onClick={onClickEdit}>
              {edit}
            </div>
          )}

          {e.user_id === user_id && (
            <div className={s.trash} onClick={onClickDelete}>
              {trash}
            </div>
          )}
        </div>
      </div>
    )
  }

  useDebounce(searchedQuestion, 500)

  useEffect(() => {
    if (packId === '1') {
      alert('Пожалуйста, для перехода к списку вопросов нажмите на имя вашей колоды')
      navigate('/packs_list')
    } else dispatch(getCardsTC(packId))
  }, [page, pageCount, cardsTotalCount, searchedQuestion])

  if (!isLoggedIn) {
    navigate('/login')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.header_title}>
          <ArrowBack title={'Back to Packs List'} onClick={() => navigate('/packs_list')} />
          <h2>Cards list</h2>
        </div>
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
      <AddCardModal packId={packId} active={addModalActive} setActive={setAddModalActive} />
      <EditCardModal
        packId={packId}
        card={editedCard}
        active={editModalActive}
        setActive={setEditModalActive}
      />
      <DelCardModal
        packId={packId}
        card={editedCard}
        active={delModalActive}
        setActive={setDelModalActive}
      />
    </div>
  )
}
