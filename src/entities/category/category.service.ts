import { ApplicationConfigService } from "@/shared/service/application-config.service";
import { ICategory } from "@/shared/model/category.model";
import axios from "axios";

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
     * Delete a category by id
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