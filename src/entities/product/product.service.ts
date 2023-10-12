import axios from 'axios';
import type { IProduct } from "@/shared/model/product.model";


const baseApiUrl = "http://localhost:8080/api/products";
export default class ProductService {
    /**
     * Find a product by id
     * @param id
     */
    public find(id: number): Promise<IProduct> {
        return new Promise<IProduct>((resolve, reject) => {
            axios
                .get(`${baseApiUrl}/${id}`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Retrieve all products
     */
    public retrieve(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios
                .get(baseApiUrl)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Delete a product by id
     * @param id
     */
    public delete(id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios
                .delete(`${baseApiUrl}/${id}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Create a new product
     * @param entity
     */
    public create(entity: IProduct): Promise<IProduct> {
        return new Promise<IProduct>((resolve, reject) => {
            axios
                .post(`${baseApiUrl}`, entity)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Update a product
     * @param entity
     */
    public update(entity: IProduct): Promise<IProduct> {
        return new Promise<IProduct>((resolve, reject) => {
            axios
                .put(`${baseApiUrl}/${entity.id}`, entity)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Partially update a product
     * @param entity
     */
    public partialUpdate(entity: IProduct): Promise<IProduct> {
        return new Promise<IProduct>((resolve, reject) => {
            axios
                .patch(`${baseApiUrl}/${entity.id}`, entity)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}