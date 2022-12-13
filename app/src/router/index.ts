import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  useRouter,
} from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      navmark: "/login",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login/index.vue"),
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "主页",
      navmark: "/home",
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/about/:userInfo",
    name: "About",
    meta: {
      title: "详情",
      navmark: "/about",
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: NotFound*/ "../views/404/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (!localStorage.userInfo && to.name !== "Login") {
    next({ name: "Login" });
    return;
  }
  // 根据路由元信息设置文档标题
  window.document.title = to.meta.title as string;
  next();
});

export default router;
