import React, { useState } from 'react'
import mainStyles from '../../common/styles/Container.module.css'
import s from './Learn.module.css'
import { ArrowBack } from '../../common/components/ArrowBack/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { updateCardGradeTC } from '../cards/cards-reducer'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import SuperRadio from '../../common/components/SuperRadio/SuperRadio'
import { getRandomCard } from '../../common/utils/getRandomCard'

const grades = ["don't know", 'forgot', 'long thought', 'confused', 'knew']

export const Learn = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { cards } = useAppSelector((store) => store.cards)
  const loading = useAppSelector((state) => state.app.status) === 'loading'

  const { packId, packName } = useParams()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [radioValue, setRadioValue] = useState(grades[0])
  const [card, setCard] = useState(getRandomCard(cards))

  let radioValueIndex = grades.indexOf(radioValue)

  const onNext = async () => {
    setIsChecked(false)
    if (packId) await dispatch(updateCardGradeTC(packId, radioValueIndex + 1, card._id))
    setCard(getRandomCard(cards))
  }

  console.log('Learn mount, cards:', cards)

  return (
    <div className={s.wrapper}>
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
                  disabled={loading}
                />

                <div>
                  <SuperButton onClick={onNext} disabled={loading}>
                    next
                  </SuperButton>
                </div>
              </>
            )}
            {!isChecked && (
              <div>
                <SuperButton onClick={() => setIsChecked(true)} disabled={loading}>
                  Check
                </SuperButton>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
