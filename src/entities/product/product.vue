<template>
  <b-container class="bv-example-row">
    <b-row class="mb-3 mt-3">
      <b-col>
        <select class="form-control" v-model="selectedCategory" @change="onCategoryChange">
          <option :value="null" selected>Filter for Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </b-col>
      <b-col></b-col>
      <b-col style="text-align: end">
        <router-link :to="{ name: 'ProductCreate' }" custom v-slot="{ navigate }">
          <b-button
              @click="navigate"
              variant="outline-primary">
            <b-icon icon="plus"></b-icon>
            <span>Add New </span>
          </b-button>
        </router-link>
        &nbsp;
        <b-button
            @click="toggleView"
            variant="outline-primary">
          <b-icon :icon="currentView === 'card' ? 'list' : 'grid'"></b-icon>
        </b-button>

      </b-col>
    </b-row>

    <b-row v-if="products && products.length > 0 && !isFetching">
      <b-col>
        <b-card-group deck>
          <b-row>
            <draggable
                :class="{ [`cursor-grabbing`]: drag }"
                v-model="products"
                group="items"
                @start="drag = true"
                @end="drag = false"
                tag="b-card-group">
              <app-product-item v-for="prod in products" :item="prod" :key="prod.id" :displayList="displayList"
                                @updatePrice="updatePrice(prod)"
                                @removeProduct="prepareRemove(prod)">
              </app-product-item>
            </draggable>
          </b-row>
        </b-card-group>
        <b-pagination
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="itemsPerPage"
            v-on:change="navigateToPage($event)"
            align="center">
        </b-pagination>

      </b-col>
    </b-row>

    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title">
        <span>Confirm delete operation</span>
      </span>
      <div class="modal-body">
        <p>
          Are you sure you want to delete this Product?
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
            v-on:click="removeProduct()">
          Delete
        </button>
      </div>
    </b-modal>


    <div class="spinner-div" v-if="isFetching">
      <b-spinner large style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
    </div>
    <div class="alert alert-warning" v-if="!isFetching && products && products.length === 0">
      <span>No products found</span>
    </div>
  </b-container>
</template>

<style scoped>

.spinner-div {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 300px;
}

.items pre {
  color: #fff;
  width: 200px;
  margin: auto;
}

</style>

<script lang="ts" src="./product.component.ts"></script>
