import React from 'react'

import { CardType } from '../../../api/cardsAPI'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { arrowDown } from '../../../common/swg/arrowDown'
import { arrowUp } from '../../../common/swg/arrowUp'
import { edit } from '../../../common/swg/edit'
import { teacher } from '../../../common/swg/teacher'
import { trash } from '../../../common/swg/trash'
import { setSortCardsAC } from '../cards-reducer'

import s from './CardsListTable.module.css'
import { StarRating } from './StarRating/StarRating'

type CardsListTableType = {
  setEditedCard: (e: CardType) => void
  setEditModalActive: (value: boolean) => void
  setDelModalActive: (value: boolean) => void
}

export const CardsListTable: React.FC<CardsListTableType> = ({
  setEditedCard,
  setEditModalActive,
  setDelModalActive,
}) => {
  const user_id = useAppSelector((state) => state.profile.user._id)
  const cards = useAppSelector((state) => state.cards.cards)
  const sortCards = useAppSelector((state) => state.cards.sortCards)
  const dispatch = useAppDispatch()
  const onSortCardHandler = () => {
    dispatch(setSortCardsAC(sortCards === '0updated' ? '1updated' : '0updated'))
  }

  const tableRender = (e: CardType) => {
    const onClickTeacherHandler = () => {
      alert('Do you want to learn it?')
    }
    const onClickEditHandler = () => {
      setEditedCard(e)
      setEditModalActive(true)
    }
    const onClickDeleteHandler = () => {
      setEditedCard(e)
      setDelModalActive(true)
    }

    return (
      <div className={s.tb_main} key={e._id}>
        <div className={s.tb_question}>{e.question}</div>
        <div className={s.tb_answer}>{e.answer}</div>
        <div className={s.tb_last}>{e.updated.slice(0, 10)}</div>

        <StarRating grade={e.grade} />

        <div className={s.tb_actions}>
          <div className={s.teacher} onClick={onClickTeacherHandler}>
            {teacher}
          </div>
          {e.user_id === user_id && (
            <div className={s.edit} onClick={onClickEditHandler}>
              {edit}
            </div>
          )}

          {e.user_id === user_id && (
            <div className={s.trash} onClick={onClickDeleteHandler}>
              {trash}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={s.table}>
      <div className={s.tb_header}>
        <div className={s.tb_question}>Question</div>
        <div className={s.tb_answer}>Answer</div>
        <div className={s.tb_last} onClick={onSortCardHandler}>
          Last Updated
          {sortCards === '0updated' ? arrowUp : arrowDown}
        </div>
        <div className={s.tb_grade}>Grade</div>
        <div className={s.tb_actions}>Actions</div>
      </div>
      <div>{cards.map((e) => tableRender(e))}</div>
    </div>
  )
}
