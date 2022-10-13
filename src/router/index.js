import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout/index.vue";
import Longin from "../views/Login/login.vue";
import Home from "../views/Home/index.vue";
Vue.use(VueRouter);
//异步加载
const Goods = () => import("../views/Goods/Goods.vue");
const Params = () => import("../views/Params/Params.vue");
const Advert = () => import("../views/Advert/Advert.vue");
const Order = () => import("../views/Order/index.vue");
const OrderList = () => import("../views/Order/OrderList/index.vue");
const OrderBakc = () => import("../views/Order/OrderBack/index.vue");
const addGoods = () => import("../views/Goods/addGoods.vue");
//const asstesStatus = () => import("../views/Assets/status.vue");
const routes = [
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/goods",
        name: "Goods",
        component: Goods,
      },
      {
        path: "/add-goods",
        nmae: "addGoods",
        component: addGoods,
      },
      {
        path: "/params",
        name: "Params",
        component: Params,
      },
      {
        path: "/advert",
        name: "Advert",
        component: Advert,
      },
      {
        path: "/order",
        name: "Order",
        component: Order,
        redirect: "order/order-list",
        children: [
          {
            path: "order-list",
            component: OrderList,
          },
          {
            path: "order-back",
            component: OrderBakc,
          },
        ],
      },
      {
        path: "/advert",
        name: "Advert",
        component: Advert,
      },

    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
