import axios from 'axios';
import type { IProduct } from "@/shared/model/product.model";
import { ApplicationConfigService } from "@/shared/service/application-config.service";
import UIHelperService from "@/shared/service/uihelper.service";

const uiHelperService = new UIHelperService();

let baseApiUrl: string = '';
export default class ProductService {

    private applicationConfigService: ApplicationConfigService;
    public basketItemsCount: number = 0;
    public basketItems: IProduct[] = [];


    constructor(applicationConfigService: ApplicationConfigService) {
        this.applicationConfigService = applicationConfigService;
        baseApiUrl = this.applicationConfigService.getEndpointFor('api/products');
    }

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
    public retrieve(req?: any): Promise<any> {
        const query = uiHelperService.createRequestOptionMultipleWithoutNull(req);
        const url = baseApiUrl + '?' + query;
        return new Promise<any>((resolve, reject) => {
            axios
                .get(url)
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
    public delete(id: number | null): Promise<any> {
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

    getTotalCountOfProducts(): number {
        return this.basketItemsCount;
    }
}