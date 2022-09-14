import React, {useEffect, useState} from 'react'
import mainStyles from '../../common/styles/Container.module.css'
import { ArrowBack } from '../../common/components/ArrowBack/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { CardType } from '../../api/cardsAPI'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import {getCardsTC, setCardsAC, updateCardGradeTC} from '../cards/cards-reducer'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import SuperRadio from '../../common/components/SuperRadio/SuperRadio'
import {getCard} from './getCard';

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']

export const Learn = () => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { cards } = useAppSelector((store) => store.cards)

  const { packId, packName } = useParams()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [radioValue, setRadioValue] = useState(grades[0])
  const [card, setCard] = useState(getCard(cards))

  let radioValueIndex = grades.indexOf(radioValue)

  const onNext = async () => {
    setIsChecked(false)
    if (packId) await dispatch(updateCardGradeTC(packId, radioValueIndex + 1, card._id))
    setCard(getCard(cards))
  }


  console.log('Lern mount, cards:', cards)

  return (
    <>
      <ArrowBack title={'Back to Packs List'} onClick={() => navigate(`/cards_list/${packId}`)} />
      <h2>You are learning: {packName}</h2>
      <div className={mainStyles.container}>
        {card.question && (
          <div className={mainStyles.content}>
            <div>Question: {card.question}</div>
            <br />
            {isChecked && (
              <>
                <div>Answer: {card.answer}</div>

                <SuperRadio
                  name={'radio'}
                  options={grades}
                  value={radioValue}
                  onChangeOption={setRadioValue}
                />

                <div>
                  <SuperButton onClick={onNext}>next</SuperButton>
                </div>
              </>
            )}
            {!isChecked && (
              <div>
                <SuperButton onClick={() => setIsChecked(true)}>Check</SuperButton>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
