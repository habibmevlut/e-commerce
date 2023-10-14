<template>
  <div>
    <b-modal v-model="showModal" title="Update Book" @hidden="onModalClose">
      <form @submit="updateBook">
        <label for="title">Title</label>
        <input v-model="updatedProduct.title" type="text" id="title" required/>

        <!-- Other form fields for product properties -->

        <button type="submit">Update</button>
      </form>
    </b-modal>
  </div>
</template>

<style scoped>

</style>

<script lang="ts" src="./product-update-dialog.component.ts"></script>
