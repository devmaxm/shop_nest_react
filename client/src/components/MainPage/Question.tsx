import {Alert, Grid} from "@mui/material";
import s from './MainPage.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";

type Inputs = {
    email: string
    question: string
}

function Question() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>({mode: 'onChange'});
    const [messageSent, setMessageSent] = useState<boolean>(false)

    const handleSendQuestion: SubmitHandler<Inputs> = async (data) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/question`, data)
        setMessageSent(true)
        reset()
    }
    return (
        <div className={s.question}>
            <Grid container className={s.question_wrapper}>
                <Grid item md={6} xs={12} className={s.question_info}>
                    <h1 className={s.question_title}>Возникли вопросы?</h1>
                    <p className={s.question_text}>
                        Если у вас возникли вопросы заполняйте форму и мы свяжемся с Вами через указаный email!
                    </p>
                </Grid>
                <Grid item md={6} xs={12}>
                    {messageSent && <Alert sx={{marginBottom: '20px'}} severity="success">Спасибо! Ваше сообщение доставлено. Мы скоро свяжемся с Вами!</Alert>}
                    <form onSubmit={handleSubmit(handleSendQuestion)}>
                        <div className={s.question_input_wrapper}>
                            <input
                                className={`${s.question_input} ${errors.email && s.error}`}
                                {...register('email', {
                                    required: 'Обязательное поле!',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Неверно введен email"
                                    }
                                })}
                                placeholder='Ваш email'
                            />
                            {errors.email && <p className={s.error_message}>{errors.email?.message}</p>}
                        </div>
                        <div className={s.question_input_wrapper}>
                            <input
                                className={`${s.question_input} ${errors.question && s.error}`}
                                {...register('question', {
                                    required: 'Обязательное поле!',
                                })}
                                placeholder='Ваш вопрос'
                            />
                            {errors.question && <p className={s.error_message}>{errors.question?.message}</p>}
                        </div>
                        <button className={s.send_question_btn}>Отправить</button>
                    </form>

                </Grid>
            </Grid>
        </div>
    )
}

export default Question