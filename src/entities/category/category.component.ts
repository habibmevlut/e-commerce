import Vue from "vue";
import { ITEMS_PER_PAGE } from "@/app.constants";
import Vue2Filters from "vue2-filters";
import { Component, Inject } from "vue-property-decorator";
import CategoryService from "@/entities/category/category.service";
import AlertService from "@/shared/alert/alert.service";
import { ICategory, ICategoryResponseResult } from "@/shared/model/category.model";


@Component({
    mixins: [Vue2Filters.mixin],
    data() {
        return {
            itemsPerPage: ITEMS_PER_PAGE,
        };
    }
})
export default class Category extends Vue {
    @Inject('categoryService') private categoryService: () => CategoryService;
    @Inject('alertService') private alertService: (() => AlertService);

    public categories: ICategory[] | undefined = [];
    public isFetching = false;
    totalItems: number | undefined = 0;
    currentPage: number | null = 1;
    itemsPerPage: number = ITEMS_PER_PAGE;
    private removeId: number | null = null;

    public mounted(): void {
        this.retrieveAllCategories();
    }

    public navigateToPage(event: any): void {
        this.currentPage = event;
        this.retrieveAllCategories();
    }

    public retrieveAllCategories(): void {
        this.isFetching = true;
        this.categoryService()
            .retrieve({
                page: this.currentPage,
                limit: this.itemsPerPage,
            })
            .then(
                (res: { data: ICategoryResponseResult; }) => {
                    this.categories = res.data.categories;
                    this.totalItems = res.data.count;
                    this.isFetching = false;
                },
                err => {
                    this.alertService().showHttpError(this, err.response);
                    this.isFetching = false;
                }
            );
    }

    public prepareRemove(instance: ICategory): void {
        if (!instance.id) return;
        this.removeId = instance.id;
        if (<any>this.$refs.removeEntity) {
            (<any>this.$refs.removeEntity).show();
        }
    }

    public removeCategory(): void {
        this.categoryService()
            .delete(this.removeId)
            .then(() => {
                const message = 'A Category is deleted with identifier ' + this.removeId + ' .';
                this.$bvToast.toast(message.toString(), {
                    toaster: 'b-toaster-top-center',
                    title: 'Info',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 5000,
                });
                this.removeId = null;
                this.retrieveAllCategories();
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