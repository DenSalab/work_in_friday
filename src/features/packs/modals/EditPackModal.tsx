import React, { ChangeEvent, useEffect, useState } from 'react'
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import SuperCheckbox from '../../../common/components/SuperCheckbox/SuperCheckbox'
import { CustomModal } from '../../../common/components/CustomModal/CustomModal'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { getCardsPackTC, updateCardsPackTC } from '../packs-reducer'
import { InputImage } from '../../../common/components/InputImage/InputImage'
import { CardPackType } from '../../../api/packAPI'

export const EditPackModal: React.FC<PropsType> = ({ active, setActive, pack }) => {
  const dispatch = useAppDispatch()
  const [newPackName, setNewPackName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [deckCover, setDeckCover] = useState(pack.deckCover)

  // обновление картинки при каждом вызове модального окна
  useEffect(() => {
    setDeckCover(pack.deckCover)
  })

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked)
  }

  const editNamePack = async () => {
    await dispatch(updateCardsPackTC({ ...pack, name: newPackName, private: isPrivate, deckCover }))
    await dispatch(getCardsPackTC())
    setActive(false)
  }

  useEffect(() => {
    setNewPackName(pack.name)
    setIsPrivate(pack.private)
  }, [pack._id, pack.name])

  return (
    <CustomModal
      title={'Edit pack'}
      active={active}
      setActive={setActive}
      callback={editNamePack}
      buttonsText={'Save'}
    >
      <div
        style={{
          width: '250px',
          margin: '0 auto',
        }}
      >
        {deckCover && (
          <img src={deckCover || ''} alt="deckCover" style={{ width: '100%', height: 'auto' }} />
        )}
      </div>

      <div>Packs name:</div>
      <SuperInputText
        type={'text'}
        id={'newPackName'}
        value={newPackName}
        onChange={onChangeInputHandler}
        placeholder={'new name'}
      />
      <InputImage callback={setDeckCover} />
      <div>
        <SuperCheckbox id={'PrivatePack'} onChange={onChangeCheckboxHandler} checked={isPrivate}>
          Private pack
        </SuperCheckbox>
      </div>
    </CustomModal>
  )
}

//types
type PropsType = {
  active: boolean
  setActive: (value: boolean) => void
  pack: CardPackType
  callback?: () => void
}
