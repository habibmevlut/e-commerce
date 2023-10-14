import type { ICategory } from "./category.model";

export interface IProduct {
    id?: number;
    name?: string | null;
    price?: number | null;
    defaultQuantity?: number | null;
    addedToCart?: boolean | null;
    isEditingPrice?: boolean | null;
    description?: string | null;
    imageURL?: string | null;
    category?: ICategory | null;
}

export interface IProductResponseResult {
    count?: number;
    products?: IProduct[];
}

export class Product implements IProduct {

    constructor(
        public id?: number,
        public name?: string | null,
        public price?: number | null,
        public defaultQuantity?: number | null,
        public addedToCart?: boolean | null,
        public description?: string | null,
        public imageURL?: string | null,
        public category?: ICategory | null
    ) {
    }
}
