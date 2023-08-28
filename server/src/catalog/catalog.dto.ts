import {ColorInterface, ModelInterface} from "../products/products.dto";

type AvailablePropInterface = {
    name: string,
    slug: string,
    values: string[]
}

export interface ResultInterface {
    availableColors: ColorInterface[],
    availableProperties: AvailablePropInterface[],
    availableModels: ModelInterface[]
}