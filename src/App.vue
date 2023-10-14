<template>
  <div id="app">
    <b-navbar toggleable="xl" type="dark" variant="dark">
      <b-navbar-brand href="#">E-Commerce</b-navbar-brand>

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

            <b-button variant="primary" size="md">
              <b-badge variant="light">{{ totalCountOfProducts }}</b-badge>
              My Basket
            </b-button>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>

<!--    <div id="footer" class="footer">-->
<!--      <p>Powered by <a href="https://www.linkedin.com/in/habib-mevl%C3%BCt-085aab176/" target="_blank"-->
<!--                       rel="noopener noreferrer">Habib Mevlüt</a></p>-->
<!--    </div>-->
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      totalCountOfProducts: 0,
    };
  },
  methods: {},
  computed: {},
  mounted() {
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: #42b983;
}

.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

.footer a {
  color: #fff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
