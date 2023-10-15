<template>

  <b-navbar toggleable="xl" type="dark" variant="dark">
    <b-navbar-brand href="#">
      <router-link to="/">E-Commerce</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/product">Products</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/category">Category</router-link>
          </b-nav-item>
          <router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
            <b-button variant="success" size="md">
              My Basket
              <b-badge variant="light">{{ numItems }} ($ {{ cartValue }})</b-badge>
            </b-button>
          </router-link>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {
  mapGetters
} from 'vuex';

export default {
  name: 'app-header',
  data() {
    return {
      isNavOpen: false
    }
  },
  computed: {
    ...mapGetters(['cartValue', 'cartItemList']),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total
      }, 0);
    },

  },
  methods: {}
}
</script>


<style>
a {
  color: #42b983 !important;
  text-decoration: none !important;
}
</style>
