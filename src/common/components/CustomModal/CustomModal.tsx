import React, { ReactNode, useEffect } from 'react'
import mainStyles from '../../styles/Container.module.css'
import SuperButton from '../SuperButton/SuperButton'

import modalStyles from './CustomModal.module.css'

type PropsType = {
  children: ReactNode
  title: string
  active: boolean
  setActive: (value: boolean) => void
  callback?: () => void
  buttonsText?: string
}

export const CustomModal: React.FC<PropsType> = ({
  children,
  title,
  active,
  setActive,
  callback,
  buttonsText,
}) => {
  const close = () => {
    setActive(false)
  }

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', closeModal)

    return () => window.removeEventListener('keydown', closeModal)
  }, [])

  return (
    <div
      className={active ? `${modalStyles.modal} ${modalStyles.active}` : modalStyles['modal']}
      onClick={close}
    >
      <div className={modalStyles.modal__content} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyles.close} onClick={close}>
          {' '}
          x{' '}
        </div>
        <div className={modalStyles.header}>
          <span>{title}</span>
        </div>
        <div>{children}</div>
        <div className={modalStyles.buttons__wrap}>
          <SuperButton className={mainStyles.mainButton} monochrome={true} onClick={close}>
            Cancel
          </SuperButton>
          <SuperButton
            className={mainStyles.mainButton}
            onClick={callback}
            red={buttonsText === 'Delete' ? true : false}
          >
            {buttonsText}
          </SuperButton>
        </div>
      </div>
    </div>
  )
}
