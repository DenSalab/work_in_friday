import React, {ReactNode} from 'react'

import modalStyles from './CustomModal.module.css'

type PropsType = {
    children: ReactNode
    title: string
    active: boolean
    setActive: (value:boolean) => void
    callback?: () => void
}

export const CustomModal: React.FC<PropsType> = (
    {
        children,
        title,
        active,
        setActive,
        callback,
    }) => {

    const close = () => {
       setActive(false)
    }

    return (
        <div className={active ? `${modalStyles.modal} ${modalStyles.active}` : modalStyles['modal']} onClick={close}>
            <div className={modalStyles.modal__content} onClick={e=>e.stopPropagation()}>
                <div className={modalStyles.close} onClick={close}> x </div>
                <div className={modalStyles.header}>
                    <span>
                        {title}
                    </span>
                </div>
                <div>
                {children}
                </div>
            </div>
        </div>
    )
}
