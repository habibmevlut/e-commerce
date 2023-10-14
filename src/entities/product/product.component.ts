import { Component, Inject, Vue } from 'vue-property-decorator';
import Vue2Filters from "vue2-filters";
import ProductService from "@/entities/product/product.service";
import AlertService from "@/shared/alert/alert.service";
import { IProduct, IProductResponseResult } from "@/shared/model/product.model";
import { ITEMS_PER_PAGE } from "@/app.constants";
import { ICategory } from "@/shared/model/category.model";
import CategoryService from "@/entities/category/category.service";


@Component({
    mixins: [Vue2Filters.mixin],
    data() {
        return {
            itemsPerPage: ITEMS_PER_PAGE,
            selectedCategory: null,
            drag: false,
        };
    },
    components: {
        draggable: () => import('vuedraggable')
    }
})
export default class Product extends Vue {

    @Inject('productService') private productService: () => ProductService;
    @Inject('categoryService') private categoryService: () => CategoryService;
    @Inject('alertService') private alertService: (() => AlertService);
    public products: IProduct[] | undefined = [];
    public categories: ICategory[] | undefined = [];
    public isFetching = false;
    totalItems: number | undefined = 0;
    currentPage: number | null = 1;
    itemsPerPage: number = ITEMS_PER_PAGE;
    currentView: string = "card";
    private removeId: number | null = null;
    public addCartButtonVisible: boolean = false;
    public isPriceEditing: boolean = false;

    cart: Array<IProduct> = [];

    public selectedCategory: string | null = null;

    public onCategoryChange() {
        this.selectedCategory === null ? this.currentPage = 1 : this.currentPage = null;
        this.retrieveAllProducts();
    }

    public mounted(): void {
        this.retrieveAllProducts();
        this.initRelationships();
    }

    navigateToPage(event: any): void {
        this.currentPage = event;
        this.retrieveAllProducts();
    }


    addToCart(product: IProduct) {
        this.productService().basketItems.push(product);
        this.productService().basketItemsCount += 1;
        console.log(this.productService().getTotalCountOfProducts());
        product.addedToCart = true;
        product.isEditingPrice = false;
        product.defaultQuantity = 1;
    }

    increaseQuantity(product: IProduct) {
        product.defaultQuantity ? product.defaultQuantity++ : product.defaultQuantity = 1;
        this.productService().basketItems.push(product);
        this.productService().basketItemsCount = ++this.productService().basketItems.length;
        console.log(this.productService().basketItems);
        console.log(this.productService().basketItemsCount);
    }

    decreaseQuantity(product: IProduct) {
        if (product.defaultQuantity && product.defaultQuantity > 1) {
            product.defaultQuantity--;
        }
    }

    toggleView() {
        this.currentView = this.currentView === "card" ? "list" : "card";
    }

    priceChanged() {
        this.isPriceEditing = true;
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
                    if (res.data.products) {
                        this.products = res.data.products.map((product) => ({
                            ...product,
                            isEditingPrice: false,
                            addedToCart: false,
                        }));
                        this.totalItems = res.data.count;
                        this.isFetching = false;
                    } else {
                        this.products = [];
                    }
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
                this.categories = res.data.categories;
            });
    }

    toggleEditPrice(product: IProduct) {
        product.isEditingPrice = !product.isEditingPrice;
        product.addedToCart = false;
        this.addCartButtonVisible = !this.addCartButtonVisible;
    }

    updatePrice(product: IProduct) {
        if (product.price !== undefined) {
            this.productService()
                .update(product)
                .then(param => {
                    this.retrieveAllProducts();
                    const message = 'A Product is updated with identifier ' + param.id + ' .';
                    return (this.$root as any).$bvToast.toast(message.toString(), {
                        toaster: 'b-toaster-top-center',
                        title: 'Info',
                        variant: 'info',
                        solid: true,
                        autoHideDelay: 5000,
                    });
                })
                .catch(error => {
                    this.alertService().showHttpError(this, error.response);
                });
        }
    }

    public prepareRemove(instance: IProduct): void {
        if (!instance.id) return;
        this.removeId = instance.id;
        if (<any>this.$refs.removeEntity) {
            (<any>this.$refs.removeEntity).show();
        }
    }

    public removeProduct(): void {
        this.productService()
            .delete(this.removeId)
            .then(() => {
                const message = 'A Product is deleted with identifier ' + this.removeId + ' .';
                this.$bvToast.toast(message.toString(), {
                    toaster: 'b-toaster-top-center',
                    title: 'Info',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 5000,
                });
                this.removeId = null;
                this.retrieveAllProducts();
                this.closeDialog();
            })
            .catch(error => {
                this.alertService().showHttpError(this, error.response);
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }

}