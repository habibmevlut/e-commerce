<template>
  <div class="mb-3 col-sm-6 col-md-4 item" :class="{'list-group-item': displayList}">
    <div class="thumbnail card">
      <div style="display: flex; justify-content: end" v-if="displayList">
        <div class="btn-group">
          <router-link :to="{ name: 'ProductEdit', params: { productId: item.id } }" custom
                       v-slot="{ navigate }">
            <b-button
                v-on:click="navigate"
                variant="outline-primary">
              <b-icon icon="pencil"></b-icon>
            </b-button>
          </router-link>
          &nbsp;
          <b-button
              @click="removeProduct(item)"
              variant="outline-danger"
              v-b-modal.removeEntity>
            <b-icon icon="trash"></b-icon>
          </b-button>
        </div>
      </div>
      <div class="img-event intrinsic">
        <img :src="item.image" alt="" class="grow thumbnail-image card-img-top intrinsic-item p-3">
      </div>
      <div class="card-body">
        <!--        <router-link :to="{ name: 'ProductDetail', params: { productId: item.id } }" tag="h5" class="card-title"><a>{{ item.name }}</a></router-link>-->
        <router-link :to="'/product/' + item.id + '/detail'" tag="h5" class="card-title"><a>{{ item.title }}</a>
        </router-link>

        <h6 class="card-subtitle mb-2 remain">{{ item.quantity }} left in stock</h6>

        <p class="card-text truncate">{{ item.description | shortDescription }}</p>

        <div class="row">
          <div class="col-6">
            <p class="lead" v-if="!item.isEditingPrice">
              ${{ item.price }}
            </p>
            <div class="d-flex align-items-center mb-3" v-if="item.isEditingPrice">
              <input type="number" v-model="item.price" class="form-control" min="1" v-on:change="priceChanged">
              <b-button variant="success" @click="updatePrice" :disabled="!isPriceEditing">
                <b-icon icon="check-circle"></b-icon>
              </b-button>
            </div>
          </div>
          <div class="col-6">
            <button class="btn btn-success" :disabled="item.quantity === 0" @click="addItem">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div class="card-body text-center">
        <a href="#" class="card-link" @click="toggleEditPrice(item)" v-if="!item.isEditingPrice">Edit Price</a>
        <a href="#" class="card-link" @click="toggleEditPrice(item)" v-if="item.isEditingPrice">Cancel Edit Price</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';


export default {
  name: 'app-product-item',
  data() {
    return {
      isPriceEditing: false
    }
  },
  props: ['item', 'displayList'],
  methods: {
    ...mapActions(['updateCart']),
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true
      };
      this.updateCart(order);
    },
    toggleEditPrice() {
      this.item.isEditingPrice = !this.item.isEditingPrice;
    },
    priceChanged() {
      this.isPriceEditing = true;
    },
    updatePrice() {
      if (this.item.price !== undefined) {
        this.$emit('updatePrice', this.item);
      }
    },
    removeProduct() {
      if (this.item.id !== undefined) {
        this.$emit('removeProduct', this.item);
      }
    },
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + '...';
      } else {
        return value;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}

div.card {
  height: 100%;
}

.card-text {
  font-size: 0.875rem;
}

.remain {
  color: #d17581;
}

.grow {
  transition: all .2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}

.list-group-item {
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 30px;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 1rem;
  border: 0;

  .thumbnail {
    display: inline-block;
    width: 100%;
  }

  .img-event {
    width: 20%;
    float: left;
    padding: 0 !important;
    margin: 0;
    height: auto;
  }

  .thumbnail-image {
    position: static;
  }

  .card-body {
    float: left;
    width: 80%;
    margin: 0;
  }

  @media (max-width: 767.98px) {
    .img-event {
      width: 30%;
      float: left;
      padding: 0 !important;
      margin: 0;
    }

    .card-body {
      float: left;
      width: 70%;
      margin: 0;
    }
  }
}

.item.list-group-item:before, .item.list-group-item:after {
  display: table;
  content: " ";
}

.item.list-group-item:after {
  clear: both;
}
</style>
