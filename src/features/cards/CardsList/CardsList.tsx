import { useEffect } from 'react'

import { CardType } from '../../../api/cardsAPI'
import Paginator from '../../../common/components/Pagination/Paginator'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { createCardTC, getCardsTC, setCardsListPageAC, setPageCountAC } from '../cards-reducer'

import s from './CardsList.module.css'
import delete_img from './images/delete.png'
import edit_img from './images/edit.png'
import filter_img from './images/filter.png'
import teacher_img from './images/teacher.png'

export const CardsList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector(state => state.auth.isLoggedIn)

  const cards = useAppSelector(state => state.cards.cards)
  const pageCount: number = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount: number = useAppSelector(state => state.cards.cardsTotalCount)
  const page: number = useAppSelector(state => state.cards.page)

  const onChangePage = (page: number) => {
    dispatch(setCardsListPageAC(page))
  }
  const onPageCount = (page: number) => {
    dispatch(setPageCountAC(page))
  }
  const addNewCard = () => {
    dispatch(
      createCardTC({
        cardsPack_id: '630e436131b6d940e375e1b3',
        question: 'hardcode1 question',
        answer: 'hardcode1 answer',
      })
    )
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCardsTC())
    }
  }, [page, pageCount, cardsTotalCount])

  const tableRender = (e: CardType) => {
    const onClickTeacher = () => {}
    const onClickEdit = () => {}
    const onClickDelete = () => {}

    return (
      <div className={s.tb_main} key={e._id}>
        <div className={s.tb_question}>{e.question}</div>
        <div className={s.tb_answer}>{e.answer}</div>
        <div className={s.tb_last}>{e.updated}</div>
        <div className={s.tb_grade}>{e.grade}</div>
        <div className={s.tb_actions}>
          <img src={teacher_img} alt="teacher" onClick={onClickTeacher} />
          <img src={edit_img} alt="edit" onClick={onClickEdit} />
          <img src={delete_img} alt="delete" onClick={onClickDelete} />
        </div>
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h2>Cards list</h2>
        <SuperButton onClick={() => alert('click')}>
          Клацни сюда, чтобы обновить (пока нет debounce)
        </SuperButton>
        <SuperButton onClick={addNewCard}>Add new card</SuperButton>
      </div>

      <div className={s.control}>
        <div className={s.search}>
          <label htmlFor="search">Search</label>
          <input
            id={'search'}
            placeholder={'Provide your text'}
            className={s.search}
            value={''}
            onChange={() => {}}
            onKeyDown={() => {}}
          />
        </div>

        <div className={s.filter_remove}>
          <img src={filter_img} alt="swg" onClick={() => {}} />
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
            onChange={e => onPageCount(+e.currentTarget.value)}
          />
          <span>cards per page</span>
        </div>
      </div>
    </div>
  )
}
