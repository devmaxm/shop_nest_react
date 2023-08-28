import Carousel from "./Slider/Carousel";
import Goods from "./Goods/Goods";
import Rubrics from "./Rubrics/Rubrics";
import Question from "./Question";

function MainPage() {
    return (
        <div >
            <Carousel />
            <Goods />
            <Rubrics />
            <Question />
        </div>
    )
}

export default MainPage