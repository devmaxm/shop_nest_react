import {Grid} from "@mui/material";
import ReviewItem from "./ReviewItem";
import ReviewsForm from "./ReviewsForm";
import {ReviewType} from "../../../types/product-types";


function Reviews(props: {reviews: ReviewType[]}) {
    const reviews = props.reviews.map((review) => {
        return <ReviewItem review={review} />
    })
    return (
        <Grid container>
            <ReviewsForm />
            {props.reviews.length > 0 ? reviews :
                <span className='text' style={{width: "100%", textAlign: 'center'}}>Нет отзывов</span>
            }
        </Grid>
    )
}

export default Reviews