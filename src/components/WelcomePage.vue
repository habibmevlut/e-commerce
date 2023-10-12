<template>
  <div class="welcome">
    <h3>Welcome to E-Commerce</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WelcomePage extends Vue {
  @Prop() private msg!: string;
}
</script>
<style scoped>
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  margin: 0.5em;
}
</style>
