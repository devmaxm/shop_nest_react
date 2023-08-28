import s from '../Product.module.css'
import {Grid} from "@mui/material";
import Rating from '@mui/material/Rating';
import {ReviewType} from "../../../types/product-types";

function ReviewItem(props: { review: ReviewType }) {
    return (
        <Grid container item sm={12} className={s.reviewItemWrapper}>
            <Grid item sm={3} className={`${s.sectionWrapper} ${s.userInfoWrapper}`}>
                <img className={s.userAvatarImg}
                     src='https://www.ispot.com.ua/catalog/view/theme/oct_remarket/img/sprite.svg#include--user-icon'/>
                <p className={s.reviewUserName}>{props.review.username}</p>
                <p className={s.reviewInfoText}>{props.review.createdAt}</p>
                {props.review.rating && <><p className={s.reviewInfoText}>Мой рейтинг:</p>
                    <div className={s.reviewUserRateWrapper}>
                        <Rating name="read-only" value={props.review.rating} readOnly/>
                    </div></>
                }
            </Grid>
            <Grid item sm={9} className={s.sectionWrapper}>
                <p className={s.reviewText}>{props.review.review}</p>
            </Grid>
        </Grid>
    )
}

export default ReviewItem