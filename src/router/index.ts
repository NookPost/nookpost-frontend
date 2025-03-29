import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicy.vue'),
    },
    {
      path: '/legal-notice',
      name: 'legal-notice',
      component: () => import('../views/ImpressumView.vue'),
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/PostDetailView.vue'),
      meta: {
        edit: false,
      },
    },
    {
      path: '/post/edit/:id',
      name: 'post-edit',
      component: () => import('../views/PostDetailView.vue'),
      meta: {
        edit: true,
      },
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue'),
    },
    {
      path: '/category/:categoryID',
      name: 'categoryPosts',
      component: () => import('../views/CategoryDetailView.vue'),
    },
    {
      path: '/post/create',
      name: 'create-post',
      component: () => import('../views/PostDetailView.vue'),
      meta: {
        create: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: () => import('../views/PersonalProfileView.vue'),
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('../views/UserProfileView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchResultsView.vue'),
    },
    {
      // redirect everything unknown to home
      // needs to be on the end of the routes list
      path: '/:pathMatch(.*)*',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
  ],
})

export default router
