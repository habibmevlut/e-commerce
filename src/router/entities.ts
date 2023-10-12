const Entities = () => import('@/entities/entities.vue');

const Product = () => import('@/entities/product/product.vue');


export default {
    path: '/',
    component: Entities,
    children: [
        {
            path: 'product',
            name: 'Product',
            component: Product,
        },
    ],
};
