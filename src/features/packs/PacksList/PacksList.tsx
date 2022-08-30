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
  setMaxCardsCount,
  setMinCardsCount,
  setOnlyMyPacks,
  setPage,
  setPageCount,
  setSearchedPackName,
} from './packs-reducer'
import { ChangeEvent, useEffect } from 'react'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn)

  const user_id: string = useAppSelector((state) => state.profile.user._id)

  const cardPacks: CardPackType[] = useAppSelector((state) => state.packs.cardPacks)
  const searchedPackName: string = useAppSelector((state) => state.packs.searchedPackName)
  const isOnlyMy: boolean = useAppSelector((state) => state.packs.onlyMyPacks)
  const minCardsCount: number = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount: number = useAppSelector((state) => state.packs.maxCardsCount)
  const pageCount: number = useAppSelector((state) => state.packs.pageCount)
  const packsTotalCount: number = useAppSelector((state) => state.packs.packsTotalCount)
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)
  const page: number = useAppSelector((state) => state.packs.page)

  // наимбольшее количество карточек
  const maxRangeValue = cardPacks.map((e) => e.cardsCount).sort((a, b) => b - a)[0]
  const data: CardsPackQueryType = {
    packName: searchedPackName,
    pageCount: pageCount,
    user_id: isOnlyMy ? user_id : null,
    min: minCardsCount,
    max: maxCardsCount,
    page: page,
  }

  //temp code-----------------------------------------------------------------------
  const клацХэндлерМазаФака = () => {
    dispatch(getCardsPackTC(data))
  }
  //end-------------------------------------------------------------------------------

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCardsPackTC(data))
    }
  }, [])

  const addNewPack = () => {
    alert('Not now, maybe someday...')
  }
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchedPackName(e.currentTarget.value))
  }
  const onKeyDownSearch = () => {}
  const sortMy = () => dispatch(setOnlyMyPacks(true))
  const sortAll = () => dispatch(setOnlyMyPacks(false))

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
  }

  const onChangePageCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPageCount(+e.currentTarget.value))
  }
  const onChangePage = (page: number) => {
    dispatch(setPage(page))
  }
  const tableRender = (e: CardPackType) => {
    const onClickTeacher = () => {}
    const onClickEdit = () => {}
    const onClickDelete = () => {}

    return (
      <div className={s.tb_main} key={e._id}>
        <div className={s.tb_name}>{e.name}</div>
        <div className={s.tb_cards}>{e.cardsCount}</div>
        <div className={s.tb_last}>{e.updated}</div>
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
        <SuperButton onClick={клацХэндлерМазаФака}>
          Клацни сюда, чтобы обновить (пока нет debounce)
        </SuperButton>
        <SuperButton onClick={addNewPack}>Add new pack</SuperButton>
      </div>

      <div className={s.control}>
        <div className={s.search}>
          <label htmlFor="search">Search</label>
          <input
            id={'search'}
            placeholder={'Provide your text'}
            className={s.search}
            value={searchedPackName}
            onChange={onChangeSearch}
            onKeyDown={onKeyDownSearch}
          />
        </div>

        <div className={s.selectPacks}>
          <label htmlFor="my">Show packs cards</label>
          <button
            id={'my'}
            className={`${s.btn_my} ${isOnlyMy ? s.btn_selected : ''}`}
            onClick={sortMy}
          >
            My
          </button>
          <button className={`${s.btn_all} ${!isOnlyMy ? s.btn_selected : ''}`} onClick={sortAll}>
            All
          </button>
        </div>

        <div className={s.switch}>
          <input className={s.switch_min} value={minCardsCount} onChange={onChangeMinValue} />
          <SuperDoubleRange value={[minCardsCount, maxCardsCount]} onChangeRange={onChangeRange} />
          <input className={s.switch_max} value={maxCardsCount} onChange={onChangeMaxValue} />
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
        <div>{cardPacks.map((e) => tableRender(e))}</div>
      </div>

      <div className={s.footer}>
        <Paginator
          totalUsersCount={packsTotalCount}
          currentPage={page}
          pageSize={cardPacksTotalCount}
          onPageChange={onChangePage}
        />
        <div className={s.pageCount}>
          <span>Show</span>
          <input
            type="number"
            step={1}
            min={5}
            max={25}
            value={pageCount}
            onChange={onChangePageCount}
          />
          <span>cards per page</span>
        </div>
      </div>
    </div>
  )
}

/*
debounce
const doCityFilter = (query) => {
  if (!query) return setFilteredCities([])

  setTimeout(() => {
    setFilteredCities(
        citiesArray.filter((city) => city.toLowerCase().includes(query.toLowerCase()))
    )
  }, 500)
}
 */
