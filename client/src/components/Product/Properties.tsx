import {ProductPropertiesPropsType} from "../../types/product-types";
import {Grid} from "@mui/material";
import s from './Product.module.css'

function Properties(props: ProductPropertiesPropsType) {
    return (
        <Grid container mt={2}>
            <table className={s.propTable}>
                {props.properties.map((property) => {
                    return (
                        <tr>
                            <td className={s.propText}>{property.property}</td>
                            <td className={s.propText}>{property.propertyValue}</td>
                        </tr>
                    )
                })}

            </table>
        </Grid>
    )
}

export default Properties