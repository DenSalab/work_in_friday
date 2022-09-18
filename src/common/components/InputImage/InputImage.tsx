import React, { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, useRef } from 'react'
import SuperButton from '../SuperButton/SuperButton'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type InputTypeFileType = DefaultButtonPropsType & {
  callback: (baseImg: string) => void
}

export const InputImage: React.FC<InputTypeFileType> = ({ callback, ...restProps }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const setCoverHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      console.log('file: ', file)

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          callback(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const file64 = reader.result as string
      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <input type="file" ref={inputRef} onChange={uploadHandler} style={{ display: 'none' }} />
      <SuperButton
        onClick={setCoverHandler}
        style={{ width: '100%', borderRadius: '5px', marginBottom: '15px' }}
      >
        upload new cover
      </SuperButton>
    </>
  )
}
