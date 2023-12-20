// import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import BusinessDetailPage from './pages/BusinessDetailPage.vue';

const routes = [
    { path: '/', name: 'home', component: HomePage },
    {
        path: '/business/:alias',
        component: BusinessDetailPage,
        name: 'business-detail',
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router