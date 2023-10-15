import {ref} from "vue";

export const updateCart = ({commit}, {item, quantity, isAdd}) => {
    // TODO: Call service
    commit('UPDATE_CART', {item, quantity, isAdd});
    if (isAdd) {
        let message_obj = {
            message: `Add ${item.title} to cart successfully`,
            messageClass: "success",
            autoClose: true
        }
        commit('ADD_MESSAGE', message_obj);
    }
}

export const updatePrice = ({commit}, item) => {
    this.productService.updated(item)
    commit('UPDATE_PRICE', {item});
}

export const removeProduct = ({commit}, item) => {
    this.productService.delete(item)
    commit('DELETE_ITEM', {item});
}

export const removeItemInCart = ({commit}, {item}) => {
    commit('REMOVE_CART_ITEM', {item});
}

export function listenToProductList({commit}) {
    return ref.child("products").on('value',
        (products) => {
            commit('UPDATE_PRODUCT_LIST', products.val());
        });
}

// TODO: Call service
export function saveShoppingCart(_, {uid, cartItemList}) {
    return ref.child("cart/" + uid).set(cartItemList);
}

// TODO: Call service
export function saveToTransaction(_, {uid, cartItemList}) {
    let newTransactionKey = ref.child("transactions").push().key;
    const newTransaction = {};
    newTransaction['/transactions/' + uid + '/' + newTransactionKey] = cartItemList;
    return ref.update(newTransaction);
}
