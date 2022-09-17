import React, { ChangeEvent, useRef, useState } from 'react'
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import SuperCheckbox from '../../../common/components/SuperCheckbox/SuperCheckbox'
import { CustomModal } from '../../../common/components/CustomModal/CustomModal'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { createCardsPackTC } from '../packs-reducer'
import SuperButton from '../../../common/components/SuperButton/SuperButton'

type PropsType = {
  active: boolean
  setActive: (value: boolean) => void
  callback?: () => void
}

export const AddPackModal: React.FC<PropsType> = ({ active, setActive }) => {
  const dispatch = useAppDispatch()
  const [newPackName, setNewPackName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [baseCover, setBaseCover] = useState('')
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked)
  }

  const addNewPack = () => {
    const CreatePackData = {
      name: newPackName,
      deckCover: baseCover,
      private: isPrivate,
    }
    dispatch(createCardsPackTC(CreatePackData))
    setNewPackName('My pack')
    setIsPrivate(false)
    setActive(false)
  }

  // - upload cover----------------------------------------------
  const inputRef = useRef<HTMLInputElement>(null)

  const setCoverHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      console.log('file: ', file)

      if (file.size < 4000000) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const file64 = reader.result as string
          setBaseCover(file64)
          console.log(file64)
        }
        reader.readAsDataURL(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }
  return (
    <CustomModal
      title={'Add new pack'}
      active={active}
      setActive={setActive}
      callback={addNewPack}
      buttonsText={'Add'}
    >
      <div>Packs name:</div>
      <SuperInputText
        id={'newPackName'}
        value={newPackName}
        onChange={onChangeInputHandler}
        placeholder={'My pack'}
      />
      <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={uploadHandler} />
      <SuperButton
        style={{ width: '100%', borderRadius: '5px', margin: '0 0 15px 0' }}
        onClick={setCoverHandler}
      >
        set cover
      </SuperButton>
      <div>
        <SuperCheckbox id={'PrivatePack'} onChange={onChangeCheckboxHandler} checked={isPrivate}>
          Private pack
        </SuperCheckbox>
      </div>
    </CustomModal>
  )
}
