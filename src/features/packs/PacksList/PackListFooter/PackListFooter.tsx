import s from './PackListFooter.module.css'
import Paginator from '../../../../common/components/Pagination/Paginator'
import { ChangeEvent } from 'react'
import { getCardsPackTC, PackStateType, setPage, setPageCount } from '../../packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'

export const PackListFooter = () => {
  const dispatch = useAppDispatch()
  const state: PackStateType = useAppSelector((state) => state.packs)

  const onChangePageCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPageCount(+e.currentTarget.value))
    dispatch(getCardsPackTC())
  }

  const onChangePage = (page: number) => {
    dispatch(setPage(page))
    dispatch(getCardsPackTC())
  }
  return (
    <div className={s.footer}>
      <Paginator
        totalUsersCount={state.cardPacksTotalCount}
        currentPage={state.page}
        pageSize={state.pageCount}
        onPageChange={onChangePage}
      />
      <div className={s.pageCount}>
        <span>Show</span>
        <input
          type="number"
          step={1}
          min={5}
          max={25}
          value={state.pageCount}
          onChange={onChangePageCount}
        />
        <span>cards per page</span>
      </div>
    </div>
  )
}
