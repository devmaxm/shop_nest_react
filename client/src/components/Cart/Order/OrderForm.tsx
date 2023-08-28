import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";
import s from "../Cart.module.css";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useOutletContext} from "react-router-dom";
import {PropsType} from "../Cart";

type Inputs = {
    fullName: string
    email: string
    phoneNumber: string
    country: string
    city: string
    shippingAddress: string
    comment: string
}

function OrderForm() {
    const {cart, user, createOrder} = useOutletContext<PropsType>()
    const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>({mode: "onChange"});

    const [paidMethod, setPaidMethod] = React.useState('online');
    const handlePaidMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaidMethod((event.target as HTMLInputElement).value);
    };
    const [onlinePaidMethod, setOnlinePaidMethod] = React.useState('');
    const handleOnlinePaidMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlinePaidMethod((event.target as HTMLInputElement).value);
    };

    const handleCreateOrder: SubmitHandler<Inputs> = (data) => {
        const userId = user ? user.id : null
        createOrder(
            data.fullName,
            data.email,
            data.phoneNumber,
            data.country,
            data.city,
            data.shippingAddress,
            data.comment,
            userId,
            cart.totalPrice,
            cart.totalDiscountPrice,
            cart.items
        )
    }

    return (
        <Grid item xs={12} sx={{padding: '0 15px'}}>
            <form onSubmit={handleSubmit(handleCreateOrder)}>
                <div className={s.form_input__wrapper}>
                    <input
                        id='fullName'
                        type='text'
                        placeholder='ФИО'
                        className={`form_input ${errors.fullName && 'error'}`}
                        {...register('fullName', {
                            required: 'Обязательное поле!',
                        })}
                    />
                    {errors.fullName && <p className={s.error_message}>{errors.fullName.message}</p>}
                </div>
                <div className={s.form_input__wrapper}>
                    <input
                        id='phone'
                        type='text'
                        placeholder='Введите номер телефона'
                        className={`form_input ${errors.phoneNumber && 'error'}`}
                        {...register('phoneNumber', {
                            required: 'Обязательное поле!',
                            minLength: {message: 'Минимальная длинна поля 9 символов', value: 9}
                        })}
                    />
                    {errors.phoneNumber && <p className={s.error_message}>{errors.phoneNumber.message}</p>}
                </div>

                <div className={s.form_input__wrapper}>
                    <input
                        id='email'
                        type='email'
                        className={`form_input ${errors.email && 'error'}`}
                        {...register('email', {
                            required: 'Обязательное поле!',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Неверно введен email"
                            }
                        })}
                        placeholder='Введите email'
                    />
                    {errors.email && <p className={s.error_message}>{errors.email.message}</p>}
                </div>

                <div className={s.form_input__wrapper}>
                    <input
                        id='country'
                        type='text'
                        placeholder='Страна'
                        className={`form_input ${errors.country && 'error'}`}
                        {...register('country', {
                            required: 'Обязательное поле!',
                            minLength: {message: 'Минимальная длинна поля 3 символа', value: 3}
                        })}
                    />
                    {errors.country && <p className={s.error_message}>{errors.country.message}</p>}
                </div>

                <div className={s.form_input__wrapper}>
                    <input
                        id='city'
                        type='text'
                        placeholder='Город'
                        className={`form_input ${errors.city && 'error'}`}
                        {...register('city', {
                            required: 'Обязательное поле!',
                            minLength: {message: 'Минимальная длинна поля 3 символа', value: 3}
                        })}
                    />
                    {errors.city && <p className={s.error_message}>{errors.city.message}</p>}
                </div>

                <div className={s.form_input__wrapper}>
                    <input
                        id='address'
                        type='text'
                        className={`form_input ${errors.shippingAddress && 'error'}`}
                        {...register('shippingAddress', {
                            required: 'Обязательное поле!',
                        })}
                        placeholder='Введите адрес доставки'
                    />
                    {errors.shippingAddress && <p className={s.error_message}>{errors.shippingAddress.message}</p>}
                </div>
                <input
                    id='comment'
                    className={`form_input ${errors.comment && 'error'}`}
                    {...register('comment',)}
                    placeholder='Комментарий'
                />

                <FormControl className={s.form_select__wrapper}>
                    <FormLabel id="select-paid-method">Способ оплаты</FormLabel>
                    <RadioGroup
                        aria-labelledby="select-paid-method"
                        name="paid-method"
                        value={paidMethod}
                        onChange={handlePaidMethod}
                    >
                        <FormControlLabel value="received" disabled control={<Radio/>} label="При получении"/>
                        <FormControlLabel value="online" control={<Radio/>} label="Онлайн оплата"/>
                        {paidMethod === 'online' && <FormControl sx={{paddingLeft: "20px"}}>
                            <RadioGroup
                                aria-labelledby="select-online-paid-method"
                                name="online-paid-method"
                                value={onlinePaidMethod}
                                onChange={handleOnlinePaidMethod}
                            >
                                <FormControlLabel value="50%" control={<Radio/>} label="Предоплата 50%"/>
                                <FormControlLabel value="100%" control={<Radio/>} label="Предоплата 100%"/>
                            </RadioGroup>
                        </FormControl>}
                    </RadioGroup>
                </FormControl>
                <button type='submit' className={s.create_order_button}>Оформить заказ</button>
            </form>
        </Grid>
    )
}

export default OrderForm