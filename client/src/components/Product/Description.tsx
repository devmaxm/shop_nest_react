import s from './Product.module.css'
import {ProductDescriptionProps} from "../../types/product-types";

function Description(props: ProductDescriptionProps) {
    return <p className={s.description}>{props.description}</p>
}

export default Description