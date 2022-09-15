import React from 'react'
import Paginator from '../../../common/components/Pagination/Paginator'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { setCardsListPageAC, setPageCountAC } from '../cards-reducer'
import s from './CardsListFooter.module.css'

export const CardsListFooter = () => {
  const dispatch = useAppDispatch()

  const pageCount = useAppSelector((state) => state.cards.pageCount)
  const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount)
  const page = useAppSelector((state) => state.cards.page)
  const loading = useAppSelector((state) => state.app.status) === 'loading'

  const onChangePageHandler = (page: number) => {
    dispatch(setCardsListPageAC(page))
  }
  const onSetPageCountHandler = (page: number) => {
    dispatch(setPageCountAC(page))
  }

  return (
    <div className={s.footer}>
      <Paginator
        totalUsersCount={cardsTotalCount}
        currentPage={page}
        pageSize={pageCount}
        onPageChange={onChangePageHandler}
      />
      <div className={s.pageCount}>
        <span>Show</span>
        <input
          type="number"
          step={1}
          min={1}
          max={25}
          value={pageCount}
          onChange={(e) => onSetPageCountHandler(+e.currentTarget.value)}
          disabled={loading}
        />
        <span>cards per page</span>
      </div>
    </div>
  )
}
