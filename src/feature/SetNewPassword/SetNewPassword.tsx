import React from 'react'
import {Link, Navigate, useParams} from 'react-router-dom'
import s from './SetNewPassword.module.css'
import {useAppDispatch} from "../../main/ui/hooks/hooks";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import {useFormik} from "formik";
import {registerTC} from "../../main/bll/auth-reducer";
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import {RecoveryRequestStatusType} from "../../main/bll/passwordRecovery-reducer";
import { FormikErrorType } from '../Register/Register';

export const SetNewPassword = () => {
    const params = useParams()
    const email = params.token
    const dispatch = useAppDispatch()
    const newPasswordRequestStatus = useSelector<AppRootStateType, RecoveryRequestStatusType>((state) => state.passwordRecovery.newPasswordRequestStatus)
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 2)
                errors.password = 'Invalid password. Passord should be longer then 2 simvols!'
            if (values.password !== values.confirmPassword)
                errors.confirmPassword = "Passwords don't match"
            return errors
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values))
            const data = { password: values.password }
            dispatch(registerTC( data ))
        },
    })

    if (newPasswordRequestStatus === 'succeeded') return <Navigate to={'/login'}/>

    return (
        <div className={s.setPassword}>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.form}>
                    <div className={s.formName}>Create new password</div>
                    <div className={s.inputsBox}>

                        <div className={s.inputWrapper}>
                            <span>Password</span>
                            <SuperInputText
                                type="password"
                                {...formik.getFieldProps('password')}
                                error={formik.errors.password}
                            />
                        </div>
                        <div className={s.inputWrapper}>
                            <span>Confirm password</span>
                            <SuperInputText
                                type="password"
                                {...formik.getFieldProps('confirmPassword')}
                                error={formik.errors.confirmPassword}
                            />
                        </div>
                    </div>
                    <div className={s.text_if_login}>Create new password</div>
                    <div className={s.buttonWrapper}>
                        <SuperButton width100pr={true} type={'submit'}>
                            Sign Up
                        </SuperButton>
                    </div>
                </div>
            </form>
        </div>
    )

}
