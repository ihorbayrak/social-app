import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import PostView from '../views/PostView.vue';
import NotFound from '../views/NotFound.vue';
import LoginView from '../views/LoginView';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: 'Home',
            requiresAuth: true,
        },
    },
    {
        path: '/profile/:userId',
        name: 'profile',
        component: ProfileView,
        meta: {
            title: 'Profile',
            requiresAuth: true,
        },
    },
    {
        path: '/feed/:postId',
        name: 'post',
        component: PostView,
        meta: {
            title: 'Feed',
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            title: 'Login',
            requiresAuth: false,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
        meta: {
            title: '404',
            requiresAuth: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Social App`;
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

        if (!loggedIn) {
            next({
                path: '/login',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
