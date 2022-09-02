import s from './PacksList.module.css'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import filter_img from './images/filter.png'
import teacher_img from './images/teacher.png'
import edit_img from './images/edit.png'
import delete_img from './images/delete.png'
import SuperDoubleRange from '../../../common/components/SuperDoubleRange/SuperDoubleRange'
import { CardPackType, CardsPackQueryType } from '../../../api/packAPI'
import Paginator from '../../../common/components/Pagination/Paginator'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import {
  getCardsPackTC,
  PackStateType,
  setMaxCardsCount,
  setMinCardsCount,
  setOnlyMyPacks,
  setPage,
  setPageCount,
  setSearchedPackName,
} from '../packs-reducer'
import { ChangeEvent, useEffect } from 'react'
import { useDebounce } from '../../../common/hooks/debounce'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn)
  const user_id: string = useAppSelector((state) => state.profile.user._id)
  const state: PackStateType = useAppSelector((state) => state.packs)

  // наимбольшее количество карточек
  const maxRangeValue = state.cardPacks.map((e) => e.cardsCount).sort((a, b) => b - a)[0]
  console.log('cards:', state.cardPacksTotalCount)
  const data: CardsPackQueryType = {
    packName: state.searchedPackName,
    pageCount: state.pageCount,
    user_id: state.onlyMyPacks ? user_id : null,
    min: state.minCardsCount,
    max: state.maxCardsCount,
    page: state.page,
  }
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCardsPackTC(data))
    }
  }, [])

  const debouncedSearchTerm = useDebounce(state.searchedPackName, 500)
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(getCardsPackTC(data))
    }
  }, [debouncedSearchTerm])

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchedPackName(e.currentTarget.value))
  }

  const addNewPack = () => {
    alert('Not now, maybe someday...')
  }

  const sortMyAllToggle = (value: boolean) => {
    dispatch(setOnlyMyPacks(value))
    if (state.onlyMyPacks !== value) {
      dispatch(getCardsPackTC(data))
    }
  }

  const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinCardsCount(+e.currentTarget.value))
  }
  const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaxCardsCount(+e.currentTarget.value))
  }
  const onChangeRange = ([min, max]: [number, number]) => {
    dispatch(setMinCardsCount(min))
    dispatch(setMaxCardsCount(max))
  }

  const filterRemote = () => {
    dispatch(setOnlyMyPacks(false))
    dispatch(setSearchedPackName(''))
    dispatch(setMinCardsCount(0))
    dispatch(setMaxCardsCount(maxRangeValue))
    dispatch(getCardsPackTC(data))
  }

  const onChangePageCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPageCount(+e.currentTarget.value))
    dispatch(getCardsPackTC(data))
  }
  const onChangePage = (page: number) => {
    dispatch(setPage(page))
    dispatch(getCardsPackTC(data))
  }
  const tableRender = (e: CardPackType) => {
    const onClickTeacher = () => {}
    const onClickEdit = () => {}
    const onClickDelete = () => {}

    return (
      <div className={s.tb_main} key={e._id}>
        <div className={s.tb_name}>{e.name}</div>
        <div className={s.tb_cards}>{e.cardsCount}</div>
        <div className={s.tb_last}>{e.updated.slice(0, 10)}</div>
        <div className={s.tb_createdBy}>{e.user_name}</div>
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
        <h2>Packs list</h2>
        <SuperButton onClick={addNewPack}>Add new pack</SuperButton>
      </div>

      <div className={s.control}>
        <div className={s.search}>
          <label htmlFor="search">Search</label>
          <input
            id={'search'}
            placeholder={'Provide your text'}
            className={s.search}
            value={state.searchedPackName}
            onChange={onChangeSearch}
          />
        </div>

        <div className={s.selectPacks}>
          <label htmlFor="my">Show packs cards</label>
          <div className={s.buttons}>
            <button
              id={'my'}
              className={`${s.btn_my} ${state.onlyMyPacks ? s.btn_selected : ''}`}
              onClick={() => sortMyAllToggle(true)}
            >
              My
            </button>
            <button
              className={`${s.btn_all} ${!state.onlyMyPacks ? s.btn_selected : ''}`}
              onClick={() => sortMyAllToggle(false)}
            >
              All
            </button>
          </div>
        </div>

        <div className={s.switch}>
          <input className={s.switch_min} value={state.minCardsCount} onChange={onChangeMinValue} />
          <SuperDoubleRange
            value={[state.minCardsCount, state.maxCardsCount]}
            onChangeRange={onChangeRange}
            range={[0, maxRangeValue]}
          />
          <input className={s.switch_max} value={state.maxCardsCount} onChange={onChangeMaxValue} />
        </div>

        <div className={s.filter_remove}>
          <img src={filter_img} alt="swg" onClick={filterRemote} />
        </div>
      </div>

      <div className={s.table}>
        <div className={s.tb_header}>
          <div className={s.tb_name}>Name</div>
          <div className={s.tb_cards}>Cards</div>
          <div className={s.tb_last}>Last Updated</div>
          <div className={s.tb_createdBy}>Created by</div>
          <div className={s.tb_actions}>Actions</div>
        </div>

        <div>{state.cardPacks.map((e) => tableRender(e))}</div>
      </div>

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
    </div>
  )
}
