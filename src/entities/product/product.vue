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
          <b-icon icon="list"></b-icon>
        </b-button>

      </b-col>
    </b-row>

    <b-row v-if="products && products.length > 0 && !isFetching">
      <b-col>
        <div v-if="currentView === 'card'">
          <b-card-group deck>
            <b-row>
              <!-- Draggable rows -->
              <draggable
                  :class="{ [`cursor-grabbing`]: drag }"
                  v-model="products"
                  group="items"
                  @start="drag = true"
                  @end="drag = false"
                  tag="b-card-group">
                <template v-for="(product, index) in products">
                  <b-col sm="6" md="4" lg="3" xl="3" class="mb-3">
                    <b-card :img-src="product.imageURL" img-top>
                      <b-card-text>{{ product.name }}</b-card-text>
                      <b-card-text class="text-muted product-price">Price: ${{ product.price }}</b-card-text>
                      <div v-if="!product.addedToCart">
                        <b-button variant="primary" @click="addToCart(product)" lg="4" class="pl-4 pr-4">Add to Cart
                        </b-button>
                      </div>
                      <div v-else>
                        <div class="d-flex align-items-center">
                          <b-button variant="primary" @click="decreaseQuantity(product)">-</b-button>
                          <input type="text" v-model="product.defaultQuantity" class="form-control text-center" min="1"
                                 readonly>
                          <b-button variant="primary" @click="increaseQuantity(product)">+</b-button>
                        </div>
                      </div>
                    </b-card>
                  </b-col>
                </template>

              </draggable>
            </b-row>
          </b-card-group>
        </div>
        <div v-else>
          <b-table-simple class="table-item">
            <b-thead>
              <b-th>Id</b-th>
              <b-th>Name</b-th>
              <b-th>Price</b-th>
              <b-th>Description</b-th>
              <b-th></b-th>
            </b-thead>
            <!-- Draggable rows -->
            <draggable
                :class="{ [`cursor-grabbing`]: drag }"
                v-model="products"
                group="items"
                @start="drag = true"
                @end="drag = false"
                tag="tbody">
              <b-tr v-for="product in products" :key="product.id" class="item-row">
                <b-td>{{ product.id }}</b-td>
                <b-td>{{ product.name }}</b-td>
                <b-td>{{ product.price }}</b-td>
                <b-td>{{ product.description }}</b-td>
                <b-td>
                  <div class="btn-group">
                    <router-link :to="{ name: 'ProductEdit', params: { productId: product.id } }" custom
                                 v-slot="{ navigate }">
                      <b-button
                          v-on:click="navigate"
                          variant="outline-primary">
                        <b-icon icon="pencil"></b-icon>
                      </b-button>
                    </router-link>
                    &nbsp;
                    <b-button
                        v-on:click="prepareRemove(product)"
                        variant="outline-danger"
                        v-b-modal.removeEntity>
                      <b-icon icon="trash"></b-icon>
                    </b-button>

                  </div>
                </b-td>
              </b-tr>
            </draggable>
          </b-table-simple>
        </div>

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
.product-price {
  font-weight: bold;
  background-color: #FFDF2F;
  padding: 8px;
}

.spinner-div {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 300px;
}

.table-item {
  margin: 0.5rem;
}


.item-row {
  cursor: pointer;
}

.items pre {
  color: #fff;
  width: 200px;
  margin: auto;
}

</style>

<script lang="ts" src="./product.component.ts"></script>
