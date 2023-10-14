<template>
  <div>
    <h2 id="page-heading" data-cy="CategoryHeading">
      <span style="display: flex; justify-content: start">Categories</span>
      <div class="d-flex justify-content-end">
        <router-link :to="{ name: 'CategoryCreate' }" custom v-slot="{ navigate }">
          <b-button
              class="mr-3"
              @click="navigate"
              variant="outline-primary">
            <b-icon icon="plus"></b-icon>
            <span>Add new Category </span>
          </b-button>
        </router-link>
      </div>
    </h2>
    <br/>
    <div class="spinner-div" v-if="isFetching">
      <b-spinner large style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
    </div>
    <div class="alert alert-warning" v-if="!isFetching && categories && categories.length === 0">
      <span>No categories found</span>
    </div>
    <div class="table-responsive" v-if="categories && categories.length > 0 && !isFetching">
      <table class="table table-striped" aria-describedby="categories">
        <thead>
        <tr>
          <th scope="row"><span>ID</span></th>
          <th scope="row"><span>Name</span></th>
          <th scope="row"><span>Code</span></th>
          <th scope="row"><span>Description</span></th>
          <th scope="row"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category.id" data-cy="entityTable">
          <td> {{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.code }}</td>
          <td>{{ category.description }}</td>
          <td class="text-right">
            <div class="btn-group">
              <router-link :to="{ name: 'CategoryEdit', params: { categoryId: category.id } }" custom
                           v-slot="{ navigate }">
                <b-button
                    v-on:click="navigate"
                    variant="outline-primary">
                  <b-icon icon="pencil"></b-icon>
                </b-button>
              </router-link>
              &nbsp;
              <b-button
                  v-on:click="prepareRemove(category)"
                  variant="outline-danger"
                  v-b-modal.removeEntity>
                <b-icon icon="trash"></b-icon>
              </b-button>

            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <b-pagination
          v-model="currentPage"
          :total-rows="totalItems"
          :per-page="itemsPerPage"
          v-on:change="navigateToPage($event)"
          align="center">
      </b-pagination>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title">
        <span>Confirm delete operation</span>
      </span>
      <div class="modal-body">
        <p>
          Are you sure you want to delete this Category?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">
          Cancel
        </button>
        &nbsp;
        <button
            type="button"
            class="btn btn-primary"
            v-on:click="removeCategory()">
          Delete
        </button>
      </div>
    </b-modal>

  </div>
</template>

<style scoped>
.spinner-div {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 252px
}
</style>

<script lang="ts" src="./category.component.ts"></script>
