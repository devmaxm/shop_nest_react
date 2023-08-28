import s from "../Auth.module.css";
import {Alert} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {RegisterPropsType} from "../../../types/auth-types";

import {SubmitHandler, useForm} from "react-hook-form";


type Inputs = {
    email: string,
    name: string,
    surname: string,
    password: string,
    password2: string,
};


function Register(props: RegisterPropsType) {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({mode: 'onChange'});

    const onSubmit: SubmitHandler<Inputs> = data => {
        const fullName = `${data.name} ${data.surname}`
        props.register(data.email, fullName, data.password, data.password2)
    };

    console.log(errors)
    return (
        <>
            <h1 className={s.title}>Регистрация</h1>
            <form className={s.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
                {props.error && <Alert severity="error" sx={{marginBottom: '20px'}}>{props.error.message}</Alert>}
                <div className={s.input_wrapper}>
                    <input id='email'
                           type='text'
                           className={`${s.form_input} ${errors.email && s.error}`}
                           {...register('email', {
                               required: 'Обязательное поле!',
                               pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "Неверно введен email"
                               }
                           })}
                    />
                    <label htmlFor='email'
                           className={`${s.input_label} ${errors.email && s.error}`}>Введите ваш
                        email</label>
                    {errors?.email && <p className={s.error_message}>{errors.email.message}</p>}
                </div>
                <div className={s.input_wrapper}>
                    <input id='name'
                           type='text'
                           className={`${s.form_input} ${errors.name && s.error}`}
                           {...register('name', {
                               required: "Обязательное поле",
                               minLength: {message: "Минимальная длинна имени 3 символа", value: 3}
                           })}
                    />
                    <label htmlFor='name'
                           className={`${s.input_label} ${errors.name && s.error}`}>Имя</label>
                    {errors?.name && <p className={s.error_message}>{errors.name.message}</p>}
                </div>
                <div className={s.input_wrapper}>
                    <input id='surname'
                           type='text'
                           className={`${s.form_input} ${errors.surname && s.error}`}
                           {...register('surname', {
                               required: 'Обязательное поле',
                               minLength: {message: "Минимальная длинна фамилии 3 символа", value: 3}
                           })}
                    />
                    <label htmlFor='surname'
                           className={`${s.input_label} ${errors.surname && s.input_label}`}>Фамилия</label>
                    {errors?.surname && <p className={s.error_message}>{errors.surname.message}</p>}
                </div>

                <div className={s.input_wrapper}>
                    <input id='password'
                           type={'password'}
                           className={`${s.form_input} ${errors.password && s.error}`}
                           {...register('password', {
                               required: 'Обязательное поле',
                               minLength: {message: "Минимальная длинна пароля 8 символов", value: 8}
                           })}
                    />
                    <label htmlFor='password'
                           className={`${s.input_label} ${errors.password && s.error}`}>
                        Введите пароль
                    </label>
                    {errors?.password && <p className={s.error_message}>{errors.password.message}</p>}
                </div>
                <div className={s.input_wrapper}>
                    <input id='confirm-password'
                           type={'password'}
                           className={`${s.form_input} ${errors.password2 && s.error}`}
                           {...register('password2', {
                               required: 'Обязательное поле',
                               minLength: {message: "Минимальная длинна пароля 8 символов", value: 8}
                           })}
                    />
                    <label htmlFor='confirm-password'
                           className={`${s.input_label} ${errors.password2 && s.error}`}>
                        Повторите пароль</label>
                    {errors?.password2 && <p className={s.error_message}>{errors.password2.message}</p>}
                </div>
                <button type='submit' className={s.button}>Регистрация</button>
                <span className={s.redirect_title}>
                    Есть аккаунт? <Link to='/auth/login' className={s.redirect_link}>Войти</Link>
                </span>
            </form>
        </>
    )
}

export default Register