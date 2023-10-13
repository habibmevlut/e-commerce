import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from "vue2-filters";
import ProductService from "@/entities/product/product.service";
import AlertService from "@/shared/alert/alert.service";
import { IProduct, IProductResponseResult } from "@/shared/model/product.model";
import { ITEMS_PER_PAGE, ITEMS_VIEW_CONTENT_COUNT } from "@/app.constants";
import { ICategory } from "@/shared/model/category.model";
import CategoryService from "@/entities/category/category.service";


@Component({
    mixins: [Vue2Filters.mixin],
    data() {
        return {
            itemsPerPage: ITEMS_PER_PAGE,
            selectedCategory: null,
        };
    }
})
export default class Product extends Vue {

    @Inject('productService') private productService: () => ProductService;
    @Inject('categoryService') private categoryService: () => CategoryService;
    @Inject('alertService') private alertService: (() => AlertService);
    public products: IProduct[] | undefined = [];
    public categories: ICategory[] | undefined = [];
    totalItems: number | undefined = 0;
    currentPage: number | null = 1;
    itemsPerPage: number = ITEMS_PER_PAGE;
    public isFetching = false;

    public selectedCategory: string | null = null;

    // ... Other methods

    public onCategoryChange() {
        this.selectedCategory === null ? this.currentPage = 1 : this.currentPage = null;
        this.retrieveAllProducts();
    }


    public mounted(): void {
        this.retrieveAllProducts();
        this.initRelationships();
    }

    public clear(): void {
        this.retrieveAllProducts();
    }

    navigateToPage(event: any): void {
        this.currentPage = event;
        this.retrieveAllProducts();
    }

    /**
     * Get all products.
     */
    public retrieveAllProducts(): void {
        this.isFetching = true;
        const req = {
            categoryId: this.selectedCategory ? this.selectedCategory : null
        }
        this.productService()
            .retrieve({
                ...req,
                page: this.currentPage,
                limit: this.itemsPerPage,
            })
            .then(
                (res: { data: IProductResponseResult; }) => {
                    this.products = res.data.products;
                    this.totalItems = res.data.count;
                    this.isFetching = false;
                },
                (err: { response: any; }) => {
                    this.isFetching = false;
                    this.alertService().showHttpError(this, err.response);
                }
            );
    }


    public initRelationships(): void {
        this.categoryService()
            .retrieve()
            .then(res => {
                this.categories = res.data;
            });
    }

}