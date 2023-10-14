<template>
  <b-container style="text-align: start">
    <b-row>
      <h2>
        Create or Edit a Category
      </h2>
    </b-row>
    <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
      <div class="form-group" v-if="category?.id">
        <label for="id">ID</label>
        <input type="text" class="form-control" id="id" name="id" v-model="category.id" readonly/>
      </div>

      <b-form-group
          label="Name"
          label-for="input-name">
        <b-form-input id="input-name" v-model="category.name" trim></b-form-input>
      </b-form-group>

      <b-form-group
          label="Code"
          label-for="input-code">
        <b-form-input id="input-code" v-model="category.code" trim></b-form-input>
      </b-form-group>

      <b-form-group
          label="Description"
          label-for="input-description">
        <b-form-input id="input-description" v-model="category.description" trim></b-form-input>
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

<script lang="ts" src="./category-update.component.ts"></script>
