import { ApplicationConfigService } from "@/shared/service/application-config.service";
import { ICategory } from "@/shared/model/category.model";
import axios from "axios";
import UIHelperService from "@/shared/service/uihelper.service";

const uiHelperService = new UIHelperService();

let baseApiUrl: string = '';
export default class CategoryService {
    private applicationConfigService: ApplicationConfigService;

    constructor(applicationConfigService: ApplicationConfigService) {
        this.applicationConfigService = applicationConfigService;
        baseApiUrl = this.applicationConfigService.getEndpointFor('api/categories');
    }

    /**
     * Find a category by id
     */
    public find(id: number): Promise<ICategory> {
        return new Promise<ICategory>((resolve, reject) => {
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
     * Retrieve all categories
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
     * Delete a category by id
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
     * Create a category
     */
    public create(category: ICategory): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios
                .post(`${baseApiUrl}`, category)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Update a category
     */
    public update(category: ICategory): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios
                .put(`${baseApiUrl}/${category.id}`, category)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

}