import React from "react"
import s from '../Auth.module.css'
import {Alert} from "@mui/material";
import {LoginPropsType} from "../../../types/auth-types";
import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    email: string,
    password: string,
};

function Login(props: LoginPropsType) {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({mode: 'onChange'});

    const handleLogin: SubmitHandler<Inputs> = (data) => {

        props.login(data.email, data.password)
    }
    return (
        <>
            <h1 className={s.title}>Вход</h1>
            <form className={s.form_wrapper} onSubmit={handleSubmit(handleLogin)}>
                {props.error ? <Alert severity="error" sx={{marginBottom: '20px'}}>{props.error.message}</Alert>: ''}
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
                    <input id='password'
                           type={'password'}
                           className={`${s.form_input} ${errors.password && s.error}`}
                           {...register('password', {
                               required: 'Обязательное поле',
                               minLength: {message: "Минимальная длинна пароля 8 символов", value: 8}
                           })}
                    />
                    <label htmlFor='password'
                           className={`${s.input_label} ${errors.password && s.error}`}>Введите
                        пароль</label>
                    {errors?.password && <p className={s.error_message}>{errors.password.message}</p>}
                </div>
                <button type='submit' className={s.button}>Войти</button>
                <span className={s.redirect_title}>Нет аккаунта? <Link to='/auth/register' className={s.redirect_link}>Зарегистрироваться</Link></span>
            </form>
        </>
    )
}

export default Login