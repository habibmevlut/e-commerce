<template>
  <b-container style="text-align: start">
    <b-row>
      <h2>
        Create or Edit a Product
      </h2>
    </b-row>
    <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
      <div class="form-group" v-if="product?.id">
        <label for="id">ID</label>
        <input type="text" class="form-control" id="id" name="id" v-model="product.id" readonly/>
      </div>


      <b-form-group
          label="Name"
          label-for="input-name">
        <b-form-input id="input-name" v-model="product.name" trim></b-form-input>
      </b-form-group>

      <b-form-group
          label="Price"
          label-for="input-price">
        <b-form-input id="input-price" v-model="product.price" trim type="number" min="0.00" max="10000.00"
                      step="0.01"></b-form-input>
      </b-form-group>

      <b-form-group
          label="ImageURL"
          label-for="input-imageURL">
        <b-form-input id="input-imageURL" v-model="product.imageURL" trim></b-form-input>
      </b-form-group>

      <div class="form-group">
        <label class="form-control-label">Category</label>
        <select class="form-control" id="country-category" data-cy="category" name="category"
                v-model="product.category">
          <option v-bind:value="null"></option>
          <option
              v-for="category in categories"
              :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <b-form-group
          label="Description"
          label-for="input-description">
        <b-form-input id="input-description" v-model="product.description" trim></b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-danger" v-on:click="previousState()">
          <span>Cancel</span>
        </button>
        &nbsp;
        <button type="submit" :disabled=" isSaving" class="btn btn-primary">
          <span>Save</span>
        </button>
      </div>
    </form>
  </b-container>

</template>

<script lang="ts" src="./product-update.component.ts"></script>
