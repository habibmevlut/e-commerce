import { Component, Vue, Inject } from 'vue-property-decorator';
import AlertService from '@/shared/alert/alert.service';
import ProductService from "@/entities/product/product.service";
import { IProduct, Product } from "@/shared/model/product.model";
import CategoryService from "@/entities/category/category.service";
import { ICategory } from "@/shared/model/category.model";


const validations: any = {
    product: {
        name: {},
    }
}
@Component({
    // @ts-ignore
    validations,
})
export default class ProductUpdate extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('productService') private productService: () => ProductService;
    @Inject('categoryService') private categoryService: () => CategoryService;
    public product: IProduct = new Product();
    public isSaving = false;
    public categories: ICategory[] | undefined = [];

    beforeRouteEnter(to: any, from: any, next: any) {
        next((vm: any) => {
            if (to.params.productId) {
                vm.retrieveProduct(to.params.productId);
            }
            vm.initRelationships();
        });
    }

    public save(): void {
        this.isSaving = true;
        if (this.product.id) {
            this.productService()
                .update(this.product)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
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
                    this.isSaving = false;
                    this.alertService().showHttpError(this, error.response);
                });
        } else {
            this.productService()
                .create(this.product)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = 'A Product is created with identifier ' + param.id + ' .';
                    (this.$root as any).$bvToast.toast(message.toString(), {
                        toaster: 'b-toaster-top-center',
                        title: 'Success',
                        variant: 'success',
                        solid: true,
                        autoHideDelay: 5000,
                    });
                })
                .catch(error => {
                    this.isSaving = false;
                    this.alertService().showHttpError(this, error.response);
                });
        }
    }

    public retrieveProduct(productId: number): void {
        this.productService()
            .find(productId)
            .then((res: IProduct) => {
                this.product = res;
            })
            .catch((error: { response: any; }) => {
                this.alertService().showHttpError(this, error.response);
            });
    }

    public previousState(): void {
        this.$router.go(-1);
    }

    public initRelationships(): void {
        this.categoryService()
            .retrieve()
            .then(res => {
                debugger;
                this.categories = res.data.categories;
            });
    }
}
