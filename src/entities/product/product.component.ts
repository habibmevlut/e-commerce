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
    selected: null

    categories = [
        {text: 'All', value: null},
        {text: 'Electronics', value: 'electronics'},
        {text: 'Clothing', value: 'clothing'},
        {text: 'Shoes', value: 'shoes'},
        {text: 'Jewelry', value: 'jewelry'},
        {text: 'Toys', value: 'toys'},
        {text: 'Sports', value: 'sports'},
        {text: 'Outdoors', value: 'outdoors'},
        {text: 'Beauty', value: 'beauty'},
    ]


    currentPage = 1;
    cardsData = [
        {
            title: "Card Title 1",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 1",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 1",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 1",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 1",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 1",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 2",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 3",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 4",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 5",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 5",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
        {
            title: "Card Title 5",
            text: "Some quick example",
            button: "Go somewhere",
            image: "https://picsum.photos/200/100/?random",
        },
    ];

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