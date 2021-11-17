/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Opiniones from "../views/Opiniones.vue";
import Administracion from "../views/Administracion.vue";
import Notfound from "../views/Notfound.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/opiniones",
        name: "opiniones",
        component: Opiniones,
    },
    {
        path: "/administracion",
        name: "administracion",
        component: Administracion,
    },

    {
        path: "/*",
        name: "notfound",
        component: Notfound,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;