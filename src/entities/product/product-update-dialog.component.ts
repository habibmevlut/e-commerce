import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProductUpdateDialogComponent extends Vue {
    @Prop(Boolean) readonly showModal!: boolean;
    @Prop(Object) readonly product!: Record<string, any>;

    updatedProduct: Record<string, any> = {...this.product};

    updateBook() {
        this.$emit('close', this.updatedProduct);
    }

    onModalClose() {
        this.$emit('close', null);
    }
}
