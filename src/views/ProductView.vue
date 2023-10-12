<template>
  <div>
    <Product />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Product from "@/entities/product/product.component";

@Component({
  components: {
    Product,
  },
})
export default class ProductView extends Vue {}
</script>
