import s from './PacksList.module.css'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { createCardsPackTC, getCardsPackTC, PackStateType } from './packs-reducer'
import { useEffect } from 'react'
import { useDebounce } from '../../common/hooks/debounce'
import { PackListTable } from './PackListTable/PackListTable'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { PackListFooter } from './PackListFooter/PackListFooter'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn)
  const state: PackStateType = useAppSelector((state) => state.packs)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCardsPackTC())
    }
  }, [])

  const debouncedSearchTerm = useDebounce(state.searchedPackName, 500)
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(getCardsPackTC())
    }
  }, [debouncedSearchTerm])

  const addNewPack = () => {
    const CreatePackData = {
      name: 'Пачек тачка',
      deckCover: 'baseURL',
      private: false,
    }
    dispatch(createCardsPackTC(CreatePackData))
    dispatch(getCardsPackTC())
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h2>Packs list</h2>
        <SuperButton onClick={addNewPack}>Add new pack</SuperButton>
      </div>
      <FilterPanel />
      <PackListTable cardPacks={state.cardPacks} />
      <PackListFooter />
    </div>
  )
}
