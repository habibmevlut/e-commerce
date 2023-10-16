<template>
  <div class="container">
    <div class="col-md-12">
      <div v-if="isLoading" class="text-center">
        <grid-loader :loading="isLoading" :color="loaderColor" :size="loaderSize" class="d-inline-block"/>
      </div>
      <div class="card" v-if="product">
        <div class="row">
          <div class="col-12 col-md-4 offset-md-4">
            <div class="intrinsic">
              <img class="img-fluid intrinsic-product" :src="product.image" alt="">
            </div>
          </div>
        </div>

        <div class="caption-full">
          <h4 class="pull-right">$ {{ product.price }}</h4>
          <h4> {{ product.title }}</h4>
          <p> {{ product.description }} </p>
        </div>
        <div class="ratings">
          <span>{{ product.quantity }} left in stock</span>
          <p class="pull-right">
            <button @click="addItem" :disabled="product.quantity === 0" class="btn btn-success"> Add to cart</button>
          </p>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <vue-json-pretty :data="product"></vue-json-pretty>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import createApi from '../shared/service/api';
import {BASE_API_URL} from "@/app.constants";

export default {
  components: {
    GridLoader,
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      isLoading: true,
      product: null,
    };
  },
  methods: {
    ...mapActions(['updateCart']),
    addItem() {
      const order = {
        product: Object.assign({}, this.product),
        quantity: 1,
        isAdd: true
      };
      this.updateCart(order);
    },
    async loadData() {
      try {
        const endpoint = `${BASE_API_URL}/api/products/${this.$route.params.productId}`;
        const response = await createApi(endpoint).fetchData();
        this.isLoading = false;
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    },
  },
  created() {
    // Load product data when the component is created
    this.loadData();
  },
};
</script>


<style scoped>
.caption-full {
  padding-right: 10px;
  padding-left: 10px;
}

.ratings {
  padding-right: 10px;
  padding-left: 10px;
  color: #d17581;
}
</style>
