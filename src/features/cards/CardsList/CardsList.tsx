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

export const CardsList = () => {
  const [editedCard, setEditedCard] = useState({} as CardType)
  const [editModalActive, setEditModalActive] = useState(false)
  const [delModalActive, setDelModalActive] = useState(false)
  const [addModalActive, setAddModalActive] = useState(false)

  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const packId = params.packId ? params.packId : ''
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const pageCount = useAppSelector((state) => state.cards.pageCount)
  const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount)
  const page = useAppSelector((state) => state.cards.page)
  const searchedQuestion = useAppSelector((state) => state.cards.cardQuestion)
  const isPackEmpty = cardsTotalCount === 0
  const sortCards = useAppSelector((state) => state.cards.sortCards)

  const onAddNewCardHandler = () => {
    setAddModalActive(true)
  }

  useEffect(() => {
    if (packId === '1') {
      alert('Пожалуйста, для перехода к списку вопросов нажмите на имя вашей колоды')
      navigate('/packs_list')
    } else dispatch(getCardsTC(packId))
  }, [page, pageCount, cardsTotalCount, searchedQuestion, sortCards])

  if (!isLoggedIn) {
    navigate('/login')
  }

  // for Packs modal
  const temp = {
    _id: 'string',
    user_id: 'string',
    user_name: 'string',
    private: false,
    name: 'string',
    path: 'string',
    grade: 1,
    shots: 1,
    cardsCount: 1,
    type: 'string',
    rating: 1,
    created: 'string',
    updated: 'string',
    more_id: 'string',
    __v: 1,
    deckCover: 'string',
  }
  let pack = useAppSelector((state) => state.packs.cardPacks.find((f) => f._id === packId))
  pack = pack ? pack : temp
  console.log('packId: ', packId)
  // const [editedPack, setEditedPack] = useState(pack as CardPackType)
  const [editPackModalActive, setEditPackModalActive] = useState(false)
  const [delPackModalActive, setDelPackModalActive] = useState(false)

  const editPackCallback = () => {
    setEditModalActive(true)
  }

  const deletePackCallBack = () => {
    setDelModalActive(true)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.header_title}>
          <ArrowBack title={'Back to Packs List'} onClick={() => navigate('/packs_list')} />
          <div className={s.title}>
            <h2>Cards list</h2>
            <DropDownMenu editCallback={editPackCallback} deleteCallBack={deletePackCallBack} pack={pack}/>
          </div>
        </div>
        <SuperButton onClick={onAddNewCardHandler}>Add new card</SuperButton>
      </div>

      {isPackEmpty && 'This pack is empty. Click "Add new card" to fill this pack.'}
      {!isPackEmpty && <CardsSearchPanel />}
      {!isPackEmpty && (
        <CardsListTable
          setEditedCard={setEditedCard}
          setEditModalActive={setEditModalActive}
          setDelModalActive={setDelModalActive}
        />
      )}
      {!isPackEmpty && <CardsListFooter />}

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

      {/* modals for drop down menu */}
      <EditPackModal active={editPackModalActive} setActive={setEditPackModalActive} pack={pack} />
      <DelPackModal active={delPackModalActive} setActive={setDelPackModalActive} pack={pack} />
    </div>
  )
}
