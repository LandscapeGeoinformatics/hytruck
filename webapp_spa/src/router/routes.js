const routes = [
  {
    path: "/",
    redirect: "/map",  // This will redirect relatively
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // { path: "", component: () => import("pages/LoginPage.vue") },
      { path: "/about", component: () => import("pages/AboutPage.vue") },
      { path: "/map", component: () => import("src/pages/WebGIS.vue") },
      { path: "/layers_weights", component: () => import("src/pages/LayersWeights.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
