const routes = [
  {
    path: "/",
    name: "Login",
    meta: { authorized: false },
    component: () => import("../views/userAuthentication.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { authorized: true },
    component: () => import("../views/dashboard.vue"),
  },
];
export default routes;
