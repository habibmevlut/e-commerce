import type { ICategory } from "./category.model";

export interface IProduct {
    id?: number;
    title?: string | null;
    price?: number | null;
    quantity?: number | null;
    description?: string | null;
    image?: string | null;
    categoryId?: number | null;
}

export interface IProductResponseResult {
    count?: number;
    products?: IProduct[];
}

export class Product implements IProduct {

    constructor(
        public id?: number,
        public title?: string | null,
        public price?: number | null,
        public quantity?: number | null,
        public description?: string | null,
        public image?: string | null,
        public categoryId?: number | null
    ) {
    }
}
