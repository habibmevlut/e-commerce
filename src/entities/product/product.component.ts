import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from "vue2-filters";
import ProductService from "@/entities/product/product.service";
import AlertService from "@/shared/alert/alert.service";
import { IProduct } from "@/shared/model/product.model";


@Component({
    mixins: [Vue2Filters.mixin],
})
export default class Product extends Vue {

    @Inject('productService') private productService: () => ProductService;
    @Inject('alertService') private alertService: (() => AlertService);
    public products: IProduct[] = [];

    public isFetching = false;

    public mounted(): void {
        this.retrieveAllProducts();
    }

    public clear(): void {
        this.retrieveAllProducts();
    }

    /**
     * Get all products.
     */
    public retrieveAllProducts(): void {
        debugger;
        this.isFetching = true;
        this.productService()
            .retrieve()
            .then(
                (res: { data: IProduct[]; }) => {
                    this.products = res.data;
                    this.isFetching = false;
                },
                (err: { response: any; }) => {
                    this.isFetching = false;
                    this.alertService().showHttpError(this, err.response);
                }
            );
    }

}