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
  const [baseCover, setBaseCover] = useState(
    'data:image/jpeg;base64,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'
  )
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
