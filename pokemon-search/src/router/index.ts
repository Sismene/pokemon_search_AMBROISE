import { createRouter, createWebHistory } from 'vue-router';
import SearchAndDetail from '../components/SearchAndDetail.vue';

const routes = [
    { path: '/', component: SearchAndDetail }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;