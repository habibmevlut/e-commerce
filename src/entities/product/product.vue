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
      </b-col>
    </b-row>

    <b-row v-if="products && products.length > 0 && !isFetching">
      <b-col>
        <b-card-group deck>
          <b-row>
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

    <div class="spinner-div" v-if="isFetching">
      <b-spinner large style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
    </div>
    <div class="alert alert-warning" v-if="!isFetching && products && products.length === 0">
      <span>No products found</span>
    </div>
    <div id="footer" class="footer">
      <p>Powered by <a href="https://www.linkedin.com/in/habib-mevl%C3%BCt-085aab176/" target="_blank"
                       rel="noopener noreferrer">Habib Mevlüt</a></p>
    </div>
  </b-container>
</template>

<style scoped>
/* Style for the footer container */
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #333; /* Background color */
  color: #fff; /* Text color */
  padding: 20px; /* Add some padding to the content inside the footer */
  text-align: center; /* Center-align the content */
}

/* Style for the link inside the footer */
.footer a {
  color: #fff; /* Link text color */
  text-decoration: none; /* Remove underlines from links */
}

/* Style for the link when hovered */
.footer a:hover {
  text-decoration: underline; /* Add underline when the link is hovered */
}

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

</style>

<script lang="ts" src="./product.component.ts"></script>
