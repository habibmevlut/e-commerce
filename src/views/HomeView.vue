<template>
  <div class="home">
    <WelcomePage />

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import WelcomePage from "@/components/WelcomePage.vue"; // @ is an alias to /src

  @Component({
    components: {
      WelcomePage,
    },
  })
  export default class HomeView extends Vue {}
</script>
