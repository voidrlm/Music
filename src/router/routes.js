const routes = [
  {
    path: "/",
    name: "Login",
    meta: { authorized: false },
    component: () => import("../views/userAuthentication.vue"),
  },
  {
    path: "/home",
    name: "Home",
    meta: { authorized: true },
    component: () => import("../views/home.vue"),
  },
  {
    path: "/liked",
    name: "Liked",
    meta: { authorized: true },
    component: () => import("../views/liked.vue"),
  },
  {
    path: "/playlists",
    name: "Playlists",
    meta: { authorized: true },
    component: () => import("../views/playlists.vue"),
  },
];
export default routes;
