import { Component, Provide, Vue } from 'vue-property-decorator';
import ProductService from "@/entities/product/product.service";
import { ApplicationConfigService } from "@/shared/service/application-config.service";
import CategoryService from "@/entities/category/category.service";

@Component
export default class Entities extends Vue {
    @Provide('productService') private productService = () => new ProductService(new ApplicationConfigService());
    @Provide('categoryService') private categoryService = () => new CategoryService(new ApplicationConfigService());
}
