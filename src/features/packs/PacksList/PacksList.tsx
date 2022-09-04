import s from './PacksList.module.css'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { createCardsPackTC, getCardsPackTC, PackStateType } from '../packs-reducer'
import {useEffect, useState} from 'react'
import { useDebounce } from '../../../common/hooks/debounce'
import { PackListTable } from './PackListTable/PackListTable'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { PackListFooter } from './PackListFooter/PackListFooter'
import {CustomModal} from '../../../common/components/CustomModal/CustomModal';
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import SuperCheckbox from '../../../common/components/SuperCheckbox/SuperCheckbox';
import mainStyles from '../../../common/styles/Container.module.css';
import {AddPackModal} from '../../modals/AddPackModal/AddPackModal';

export const PacksList = () => {
  const [modalActive, setModalActive] = useState(false)
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
    setModalActive(true)
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
        <AddPackModal active={modalActive} setActive={setModalActive} />
    </div>
  )
}
