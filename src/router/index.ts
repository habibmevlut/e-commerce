import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import entities from "@/router/entities";
import { Component } from "vue-property-decorator";

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate', // for vue-router 2.2+
]);

Vue.use(VueRouter);


const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    entities,
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
