import s from '../MainPage.module.css'

import {Box, Grid} from "@mui/material";
// icons
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import {useState} from "react";

function Carousel() {
    const [currentImg, setCurrentImg] = useState<number>(0)
    const photos = [
        require('../../../assets/carousel/carousel_img1.png'),
        require('../../../assets/carousel/carousel_img2.png'),
        require('../../../assets/carousel/carousel_img3.png'),
    ]
    const handleNextImg = () => {
        currentImg + 1 === photos.length ? setCurrentImg(0) : setCurrentImg(currentImg + 1)
    }
    const handlePrevImg = () => {
        currentImg == 0 ? setCurrentImg(photos.length - 1) : setCurrentImg(currentImg - 1)
    }

    return (
        <Grid container className={s.wrapper}>
            <button className='slick_btn' onClick={handlePrevImg}>
                <NavigateBeforeOutlinedIcon/>
            </button>
            <Grid item className={s.carousel_img_wrapper}>
                    <img src={photos[currentImg]} className={s.carousel_photo}/>
            </Grid>
            <button className='slick_btn' onClick={handleNextImg}>
                <NavigateNextOutlinedIcon/>
            </button>
        </Grid>
    )
}

export default Carousel