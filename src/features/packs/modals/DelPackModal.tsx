import React, {ChangeEvent, useEffect, useState} from 'react';
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import SuperCheckbox from '../../../common/components/SuperCheckbox/SuperCheckbox';
import {CustomModal} from '../../../common/components/CustomModal/CustomModal';
import {useAppDispatch} from '../../../common/hooks/hooks';
import {deleteCardsPackTC, getCardsPackTC, updateCardsPackTC} from '../packs-reducer';
import {CardPackType} from '../../../api/packAPI';

type PropsType = {
    active: boolean
    setActive: (value: boolean) => void
    pack: CardPackType
    callback?: () => void
}

export const DelPackModal: React.FC<PropsType> = ({active, setActive, pack}) => {

    const dispatch = useAppDispatch()

    const [newPackName, setNewPackName] = useState('new name')

    const deleteNamePack = async () => {
        await dispatch(deleteCardsPackTC(pack._id))
        await dispatch(getCardsPackTC())
        setActive(false)
    }

    useEffect(() => {
        setNewPackName(pack.name)
    }, [pack._id, pack.name])

    return (
        <CustomModal title={'Delete pack'} active={active} setActive={setActive}
                     callback={deleteNamePack} buttonsText={'Delete'}>
            <div>Do you really want to remove "{newPackName}"?</div>
            <div>All cards will be excluded from this course!</div>
        </ CustomModal>
    )
}