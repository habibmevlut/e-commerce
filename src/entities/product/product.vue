<template>
  <b-container class="bv-example-row">
    <b-row class="mb-3 mt-3">
      <b-col>
        <!--        <select class="form-control"  v-model="filterByCategory">-->
        <!--          <option>Filter for Category</option>-->
        <!--          <option-->
        <!--              v-for="category in categories"-->
        <!--              :key="category.id">-->
        <!--            {{ category.name }}-->
        <!--          </option>-->
        <!--        </select>-->
        <select class="form-control" v-model="selectedCategory" @change="onCategoryChange">
          <option :value="null" selected>Filter for Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </b-col>
      <b-col></b-col>
      <b-col style="text-align: end">
        <b-button variant="outline-primary">Add New</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card-group deck>
          <b-row>
            <template v-for="(card, index) in products">
              <b-col sm="6" md="4" lg="3" xl="3" class="mb-3">
                <b-card :img-src="card.imageURL" img-top>
                  <b-card-text>{{ card.name }}</b-card-text>
                  <template #footer>
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </template>
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
    <!--    <div id="footer" class="footer">-->
    <!--      <p>This is your footer</p>-->
    <!--    </div>-->
  </b-container>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
</style>

<script lang="ts" src="./product.component.ts"></script>
