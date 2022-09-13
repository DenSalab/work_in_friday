import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import SuperCheckbox from '../../../common/components/SuperCheckbox/SuperCheckbox'
import { CustomModal } from '../../../common/components/CustomModal/CustomModal'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { getCardsPackTC, updateCardsPackTC } from '../packs-reducer'
import { CardPackType } from '../../../api/packAPI'
import SuperButton from '../../../common/components/SuperButton/SuperButton'

type PropsType = {
  active: boolean
  setActive: (value: boolean) => void
  pack: CardPackType
  callback?: () => void
}

export const EditPackModal: React.FC<PropsType> = ({ active, setActive, pack }) => {
  const dispatch = useAppDispatch()
  const [newPackName, setNewPackName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [deckCover, setDeckCover] = useState(pack.deckCover)

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

  //-upload cover-
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
          setDeckCover(file64)
        }
        reader.readAsDataURL(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }
  return (
    <CustomModal
      title={'Edit pack'}
      active={active}
      setActive={setActive}
      callback={editNamePack}
      buttonsText={'Save'}
    >
      <div style={{ width: '250px', margin: '0 auto' }}>
        <img src={deckCover || ''} alt="deckCover" style={{ width: '100%', height: 'auto' }} />
      </div>

      <div>Packs name:</div>
      <SuperInputText
        type={'text'}
        id={'newPackName'}
        value={newPackName}
        onChange={onChangeInputHandler}
        placeholder={'new name'}
      />
      <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={uploadHandler} />
      <SuperButton
        onClick={setCoverHandler}
        style={{ width: '100%', borderRadius: '5px', marginBottom: '15px' }}
      >
        upload new cover
      </SuperButton>
      <div>
        <SuperCheckbox id={'PrivatePack'} onChange={onChangeCheckboxHandler} checked={isPrivate}>
          Private pack
        </SuperCheckbox>
      </div>
    </CustomModal>
  )
}
