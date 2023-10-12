import { Component, Provide, Vue } from 'vue-property-decorator';
import ProductService from "@/entities/product/product.service";

@Component
export default class Entities extends Vue {
    @Provide('productService') private regionService = () => new ProductService();
}
