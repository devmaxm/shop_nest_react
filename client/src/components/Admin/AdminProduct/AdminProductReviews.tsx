import {Button, Grid, TextField} from "@mui/material";
import s from '../Admin.module.css'
import React, {useState} from "react";
import Rating from "@mui/material/Rating";
import {useOutletContext, useParams} from "react-router-dom";
import {PropsType} from "./AdminProduct";

function AdminProductReviews() {
    const {productId} = useParams<string>()
    const {createReview} = useOutletContext<PropsType>()

    const [username, setUsername] = useState<string>('')
    const [review, setReview] = useState<string>('')
    const [createdAt, setCreatedAt] = useState<string>('')
    const [rating, setRating] = React.useState<number | null>(null);

    const handleReview = () => {
        productId && createReview(parseInt(productId), username, review, rating, createdAt)
    }
    return (
        <Grid container className={s.add_review_wrapper}>
            <TextField
                sx={{marginBottom: "10px"}}
                id="username"
                label="username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
            />
            <TextField
                sx={{marginBottom: "10px"}}
                className={s.review_input}
                id="review"
                label="review"
                variant="outlined"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                fullWidth
                required
            />
            <TextField
                sx={{marginBottom: "10px"}}
                className={s.review_input}
                id="created-at"
                label="Created At"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                variant="outlined"
                fullWidth
                required
            />
            <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            <Button fullWidth onClick={handleReview}>Создать отзыв</Button>
        </Grid>
    )
}


export default AdminProductReviews
