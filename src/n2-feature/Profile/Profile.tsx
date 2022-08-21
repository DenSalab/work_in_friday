import React from 'react';
import s from "./Profile.module.css"
import pen from "./../../n1-main/m1-ui/images/edit_FILL0_wght400_GRAD0_opsz48.png"
import logout from "./../../n1-main/m1-ui/images/logout_FILL0_wght400_GRAD0_opsz48.png"


export const Profile = () => {
    return (
        <div className={s.profile}>
            <div className={s.profile_block}>
                <div className={s.header}>
                    <span>Personal Information</span>
                </div>
                <div className={s.avatar}></div>
                <div className={s.name}>Ivan Ivanov <img src={pen} className={s.symbols}/></div>
                <div className={s.email}>qwerty@gmail.com</div>
                <div className={s.button}>
                    <img src={logout} className={s.symbols}/>
                    <span className={s.title}>
                        Log out
                    </span>
                </div>
            </div>
        </div>
    );
};
