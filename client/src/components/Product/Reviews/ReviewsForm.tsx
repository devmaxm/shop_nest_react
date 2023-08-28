import {Box, Button, CircularProgress, Grid, TextField} from "@mui/material";
import s from "../Product.module.css";

function ReviewsForm() {
    return (
        <>

            <Grid container sx={{padding: "24px 15px"}}>
                <Grid item sm={6}>
                    <textarea className={s.reviewFormInput} placeholder='Отзыв'/>
                    <button className={s.reviewAddBtn}>Оставить отзыв</button>
                </Grid>
            </Grid>
        </>
    )
}

export default ReviewsForm