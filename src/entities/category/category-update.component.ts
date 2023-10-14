import { Component, Vue, Inject } from 'vue-property-decorator';
import AlertService from '@/shared/alert/alert.service';
import { Category, ICategory } from "@/shared/model/category.model";
import CategoryService from "@/entities/category/category.service";

const validations: any = {
    category: {
        name: {},
    }
}
@Component({
    // @ts-ignore
    validations,
})
export default class CategoryUpdate extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('categoryService') private categoryService: () => CategoryService;
    public category: ICategory = new Category();
    public isSaving = false;

    beforeRouteEnter(to: any, from: any, next: any) {
        next((vm: any) => {
            if (to.params.categoryId) {
                vm.retrieveCategory(to.params.categoryId);
            }
        });
    }

    public save(): void {
        this.isSaving = true;
        if (this.category.id) {
            this.categoryService()
                .update(this.category)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = 'A Category is updated with identifier ' + param.data.id + ' .';
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
            this.categoryService()
                .create(this.category)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = 'A Category is created with identifier ' + param.data.id + ' .';
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

    public retrieveCategory(categoryId: number): void {
        this.categoryService()
            .find(categoryId)
            .then((res: ICategory) => {
                this.category = res;
            })
            .catch((error: { response: any; }) => {
                this.alertService().showHttpError(this, error.response);
            });
    }

    public previousState(): void {
        this.$router.go(-1);
    }

}
