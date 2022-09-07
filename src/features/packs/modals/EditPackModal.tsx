import React, { ChangeEvent, useEffect, useState } from 'react'
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import SuperCheckbox from '../../../common/components/SuperCheckbox/SuperCheckbox'
import { CustomModal } from '../../../common/components/CustomModal/CustomModal'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { getCardsPackTC, updateCardsPackTC } from '../packs-reducer'
import { CardPackType } from '../../../api/packAPI'

type PropsType = {
  active: boolean
  setActive: (value: boolean) => void
  pack: CardPackType
  callback?: () => void
}

export const EditPackModal: React.FC<PropsType> = ({ active, setActive, pack }) => {
  const dispatch = useAppDispatch()
  const [newPackName, setNewPackName] = useState('new name' as string)
  const [isPrivate, setIsPrivate] = useState(false)

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked)
  }

  const editNamePack = async () => {
    await dispatch(updateCardsPackTC({ ...pack, name: newPackName, private: isPrivate }))
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
      <div>Packs name:</div>
      <SuperInputText
        type={'text'}
        id={'newPackName'}
        value={newPackName}
        onChange={onChangeInputHandler}
      />
      <div>
        <SuperCheckbox id={'PrivatePack'} onChange={onChangeCheckboxHandler} checked={isPrivate}>
          Private pack
        </SuperCheckbox>
      </div>
    </CustomModal>
  )
}
