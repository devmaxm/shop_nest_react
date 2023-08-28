import {PhotoCarouselPropsType} from "../../types/product-types";
import {Grid} from "@mui/material";
import s from './Product.module.css'

import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import {useState} from "react";

function PhotoCarousel(props: PhotoCarouselPropsType) {
    const [currentImg, setCurrentImg] = useState<number>(0)
    const handleNextImg = () => {
        currentImg + 1 === props.photos.length ? setCurrentImg(0) : setCurrentImg(currentImg + 1)
    }
    const handlePrevImg = () => {
        currentImg == 0 ? setCurrentImg(props.photos.length - 1) : setCurrentImg(currentImg - 1)
    }

    const leftImg = currentImg == 0 ? props.photos.length - 1 : currentImg - 1
    const rightImg = currentImg + 1 === props.photos.length ? 0 : currentImg + 1
    return (
        <Grid container xl={6} xs={12} className={s.carousel_wrapper}>
            <Grid container item sm={12}>
                <Grid item xs={12} className={s.main_carousel_wrapper}>
                    <button className='slick_btn' onClick={handlePrevImg}>
                        <NavigateBeforeOutlinedIcon/>
                    </button>
                    <div className={s.current_img_wrapper}>
                        {
                            props.photos.length === 0 ?
                                <CameraAltOutlinedIcon className={s.productNoPhoto}
                                                       sx={{width: "100%", height: "100%", color: "#6c757d"}}
                                /> :
                                <img
                                    src={require(`../../../../server/files/product_photo/${props.photos[currentImg].photoUrl}`)}
                                    alt={props.photos[currentImg].photoUrl}
                                    className={s.carouselPhoto}
                                />
                        }
                    </div>
                    <button className='slick_btn' onClick={handleNextImg}>
                        <NavigateNextOutlinedIcon/>
                    </button>
                </Grid>
                {props.photos.length > 1 && <Grid container md={8} xs={12}  className={s.nav_carousel_wrapper}>
                    <Grid container className={s.navCarousel} xs={12} >
                        <Grid item xs={4} className={`${s.navCarousel_photoWrapper}`}>
                            <img
                                src={require(`../../../../server/files/product_photo/${props.photos[leftImg].photoUrl}`)}
                                className={`${s.navCarouselPhoto}`}
                                onClick={() => setCurrentImg(leftImg)}
                            />
                        </Grid>
                        <Grid item xs={4} className={`${s.navCarousel_photoWrapper} ${s.navCarousel_photoCurrent}`}>
                            <img
                                src={require(`../../../../server/files/product_photo/${props.photos[currentImg].photoUrl}`)}
                                className={`${s.navCarouselPhoto}`}
                            />
                        </Grid>
                        <Grid item xs={4} className={`${s.navCarousel_photoWrapper}`}>
                            <img
                                src={require(`../../../../server/files/product_photo/${props.photos[rightImg].photoUrl}`)}
                                className={`${s.navCarouselPhoto}`}
                                onClick={() => setCurrentImg(rightImg)}
                            />
                        </Grid>

                    </Grid>
                </Grid>}

            </Grid>

        </Grid>
    )
}

export default PhotoCarousel