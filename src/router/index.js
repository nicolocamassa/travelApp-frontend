import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TravelDetailComponent from '../components/TravelDetailComponent.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/travels/:id',
      name: 'TravelDetail',
      component: TravelDetailComponent,
      props: true,
    },
    {
      path: '/travels',
      name: 'TravelsView',
      component: () => import('../views/TravelsView.vue')
    },
    {
      path: '/create-travel',
      name: 'CreateTravelsView',
      component: () => import('../views/CreateTravelsView.vue')
    },
    {
      path: '/calendar',
      name: 'CalendarView',
      component: () => import('../views/CalendarView.vue')
    },
  ]
})

export default router
