import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import entities from "@/router/entities";

Vue.use(VueRouter);

// const Product = () => import('@/entities/product/product.component.vue');

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    entities,
    // {
    //     path: "/about",
    //     name: "about",
    //     component: () =>
    //         import("../views/AboutView.vue"),
    // },
    // {
    //     path: "/product",
    //     name: "product",
    //     component: () =>
    //         import("../views/ProductView.vue"),
    // },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
