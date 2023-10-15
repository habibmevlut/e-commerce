<template>
  <div class="d-flex flex-column sticky-footer-wrapper">
    <main class="flex-fill">
      <app-header></app-header>
      <message-component></message-component>
      <div class="container mt-3">
        <div class="row">
          <div class="col-md-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </main>

    <footer class="navbar-default navbar-bottom navbar-dark bg-dark">
      <div class="container-fluid">
        <p class="text-center nav-bar mb-0">Checkout repository at <a
            href="https://github.com/ittus/vuejs-firebase-shopping-cart" target="_blank">
          https://github.com/ittus/vuejs-firebase-shopping-cart
        </a></p>
      </div>
    </footer>
  </div>

</template>

<script>
import AppHeader from "@/components/Header.vue";
import MessageComponent from "@/components/common/MessageComponent.vue";

export default {
  name: 'App',
  components: {MessageComponent, AppHeader},
};
</script>
<style scoped>
body, .sticky-footer-wrapper {
  min-height: 100vh;
}

.flex-fill {
  flex: 1 1 auto;
}

footer {
  height: 50px;
  color: #666;
  padding: 10px 0 10px 0;
  font-size: 85%;
}

footer a {
  color: #999;
}

footer a:hover {
  color: #efefef;
}

@media (max-width: 576px) {
  footer {
    height: 50px;
  }
}
</style>
