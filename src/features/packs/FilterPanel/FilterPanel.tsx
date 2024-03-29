import s from './FilterPanel.module.css'
import SuperDoubleRange from '../../../common/components/SuperDoubleRange/SuperDoubleRange'
import { filter } from '../../../common/assets/images/svg/filter'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import {
  getCardsPackTC,
  setMaxCardsCount,
  setMinCardsCount,
  setOnlyMyPacks,
  setPage,
  setSearchedPackName,
} from '../packs-reducer'
import { ChangeEvent, useEffect } from 'react'
import { useDebounce } from '../../../common/hooks/debounce'

export const FilterPanel = () => {
  const dispatch = useAppDispatch()

  const state = useAppSelector((state) => state.packs)
  const searchedPackName = useAppSelector((state) => state.packs.searchedPackName)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
  const loading = useAppSelector((state) => state.app.status) === 'loading'

  //const maxRangeValue = state.cardPacks.map((e) => e.cardsCount).sort((a, b) => b - a)[0]

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchedPackName(e.currentTarget.value))
  }

  const sortMyAllToggle = (value: boolean) => {
    dispatch(setOnlyMyPacks(value))
    if (state.onlyMyPacks !== value) {
      dispatch(getCardsPackTC())
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
    dispatch(setMaxCardsCount(100))
  }

  useDebounce(searchedPackName, 500)

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(getCardsPackTC())
    }, 500)
    return () => {
      clearTimeout(handler)
      dispatch(setPage(1))
    }
  }, [searchedPackName, minCardsCount, maxCardsCount])

  return (
    <div className={s.container}>
      <div className={s.inputContainer}>
        <span className={s.label}>Search</span>
        <input
          placeholder={'Provide your text'}
          className={s.search}
          value={searchedPackName}
          onChange={onChangeSearch}
        />
      </div>

      <div className={s.inputContainer}>
        <span className={s.label}>Show packs cards</span>
        <div className={s.buttons}>
          <button
            className={`${s.btn_my} ${state.onlyMyPacks ? s.btn_selected : ''}`}
            onClick={() => sortMyAllToggle(true)}
            disabled={loading}
          >
            My
          </button>
          <button
            className={`${s.btn_all} ${!state.onlyMyPacks ? s.btn_selected : ''}`}
            onClick={() => sortMyAllToggle(false)}
            disabled={loading}
          >
            All
          </button>
        </div>
      </div>

      <div className={s.inputContainer}>
        <span className={s.label}>Numbers of cart</span>
        <div className={s.switch}>
          <input
            className={s.switch_min}
            value={minCardsCount}
            onChange={onChangeMinValue}
            disabled={loading}
          />
          <SuperDoubleRange
            value={[minCardsCount, maxCardsCount]}
            onChangeRange={onChangeRange}
            range={[0, 100]}
          />
          <input
            className={s.switch_max}
            value={maxCardsCount}
            onChange={onChangeMaxValue}
            disabled={loading}
          />
        </div>
      </div>

      <button className={s.filter_remove} onClick={filterRemote} disabled={loading}>
        {filter}
      </button>
    </div>
  )
}
