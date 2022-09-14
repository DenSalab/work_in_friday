import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CardType } from '../../../api/cardsAPI'
import { ArrowBack } from '../../../common/components/ArrowBack/ArrowBack'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { getCardsTC } from '../cards-reducer'
import { CardsListFooter } from '../CardsListFooter/CardsListFooter'
import { CardsListTable } from '../CardsListTable/CardsListTable'
import { CardsSearchPanel } from '../CardsSearchPanel/CardsSearchPanel'
import { AddCardModal } from '../modals/AddNewCardModal'
import { DelCardModal } from '../modals/DelCardModal'
import { EditCardModal } from '../modals/EditCardModal'
import s from './CardsList.module.css'
import { DropDownMenu } from '../DropDownMenu/DropDownMenu'
import { EditPackModal } from '../../packs/modals/EditPackModal'
import { DelPackModal } from '../../packs/modals/DelPackModal'
import { getCardsPackTC } from '../../packs/packs-reducer'

export const CardsList = () => {
  const [editedCard, setEditedCard] = useState({} as CardType)
  const [editModalActive, setEditModalActive] = useState(false)
  const [delModalActive, setDelModalActive] = useState(false)
  const [addModalActive, setAddModalActive] = useState(false)
  const [editPackModalActive, setEditPackModalActive] = useState(false)
  const [delPackModalActive, setDelPackModalActive] = useState(false)

  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const packId = params.packId ? params.packId : ''
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const cards = useAppSelector((state) => state.cards.cards)
  const pageCount = useAppSelector((state) => state.cards.pageCount)
  const page = useAppSelector((state) => state.cards.page)
  const searchedQuestion = useAppSelector((state) => state.cards.cardQuestion)
  const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount)
  const sortCards = useAppSelector((state) => state.cards.sortCards)
  const currentPack = useAppSelector((state) => state.packs.cardPacks).find((n) => n._id === packId)
  const currentPackCardsCount = currentPack?.cardsCount

  const isPackEmpty = currentPackCardsCount === 0
  const isCardsNotFound = cardsTotalCount === 0

  const onAddNewCardHandler = () => {
    setAddModalActive(true)
  }

  const editPackCallback = () => {
    setEditPackModalActive(true)
  }

  const deletePackCallBack = () => {
    setDelPackModalActive(true)
  }

  useEffect(() => {
    dispatch(getCardsTC(packId))
  }, [page, pageCount, searchedQuestion, sortCards, cardsTotalCount])

  if (!isLoggedIn) {
    navigate('/login')
  }
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.header_title}>
          <ArrowBack title={'Back to Packs List'} onClick={() => navigate('/packs_list')} />
          <div className={s.title}>
            <h2>{currentPack?.name}</h2>
            <DropDownMenu
              editCallback={editPackCallback}
              deleteCallBack={deletePackCallBack}
              pack={currentPack!}
            />
          </div>
        </div>
        <SuperButton onClick={onAddNewCardHandler}>Add new card</SuperButton>
      </div>

      {!isPackEmpty && <CardsSearchPanel />}

      {isPackEmpty && 'This pack is empty. Click "Add new card" to fill this pack.'}

      {!isPackEmpty && !isCardsNotFound && (
        <CardsListTable
          setEditedCard={setEditedCard}
          setEditModalActive={setEditModalActive}
          setDelModalActive={setDelModalActive}
          pack={currentPack!}
        />
      )}
      {!isPackEmpty && !isCardsNotFound && <CardsListFooter />}
      {isCardsNotFound && !isPackEmpty && 'Cards not found...'}

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
      <EditPackModal
        active={editPackModalActive}
        setActive={setEditPackModalActive}
        pack={currentPack!}
      />
      <DelPackModal
        active={delPackModalActive}
        setActive={setDelPackModalActive}
        pack={currentPack!}
      />
    </div>
  )
}
