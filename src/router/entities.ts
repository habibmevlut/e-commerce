const Entities = () => import('@/entities/entities.vue');

const Product = () => import('@/entities/product/product.vue');

const ProductUpdate = () => import('@/entities/product/product-update.vue');

const ProductDetails = () => import('@/components/ProductDetails.vue');

const Category = () => import('@/entities/category/category.vue');
const CategoryUpdate = () => import('@/entities/category/category-update.vue');

const ShoppingCart = () => import('@/components/ShoppingCart.vue');


export default {
    path: '/',
    component: Entities,
    children: [
        {
            path: 'product',
            name: 'Product',
            component: Product,
        },
        {
            path: 'product/new',
            name: 'ProductCreate',
            component: ProductUpdate,
        },
        {
            path: 'product/:productId/edit',
            name: 'ProductEdit',
            component: ProductUpdate,
        },
        {
            path: '/product/:productId/detail',
            name: 'ProductDetail',
            component: ProductDetails
        },

        {
            path: 'category',
            name: 'Category',
            component: Category,
        },
        {
            path: 'category/new',
            name: 'CategoryCreate',
            component: CategoryUpdate,
        },
        {
            path: 'category/:categoryId/edit',
            name: 'CategoryEdit',
            component: CategoryUpdate,
        },
        {
            path: '/cart',
            component: ShoppingCart,
            name: 'ShoppingCart'
        }
    ],
};
