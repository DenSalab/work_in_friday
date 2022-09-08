import React, { useEffect, useState } from 'react'
import mainStyles from '../../common/styles/Container.module.css'
import { ArrowBack } from '../../common/components/ArrowBack/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { CardType } from '../../api/cardsAPI'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { getCardsTC, updateCardGradeTC } from '../cards/cards-reducer'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import SuperRadio from '../../common/components/SuperRadio/SuperRadio'

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )
  console.log('test: ', sum, rand, res)

  return cards[res.id + 1]
}

export const Learn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { packId, packName } = useParams()

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const [radioValue, setRadioValue] = useState(grades[0])
  const [card, setCard] = useState({} as CardType)

  const { cards } = useAppSelector((store) => store.cards)

  let radioValueIndex = grades.indexOf(radioValue)

  useEffect(() => {
    if (first) {
      if (packId) dispatch(getCardsTC(packId))
      setFirst(false)
    }
    if (cards.length > 0) setCard(getCard(cards))
  }, [dispatch, packId, cards, first])

  const onNext = () => {
    setIsChecked(false)
    if (packId) dispatch(updateCardGradeTC(packId, radioValueIndex + 1, card._id))
    if (cards.length > 0) setCard(getCard(cards))
  }

  return (
    <>
      <ArrowBack title={'Back to Packs List'} onClick={() => navigate('/packs_list')} />
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
