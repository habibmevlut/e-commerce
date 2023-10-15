<template>
  <div>
    <ProductComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Product from "@/entities/product/product.component";
import ProductComponent from "@/entities/product/product.component";

@Component({
  components: {
    ProductComponent,
  },
})
export default class ProductView extends Vue {}
</script>
