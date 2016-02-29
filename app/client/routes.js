import VueRouter from 'vue-router';

/* Views */
import Game from './components/views/Game.vue';
import Login from './components/views/Login.vue';
import Register from './components/views/Register.vue';
import About from './components/views/About.vue';
/* Views */

export default createRouter;

function createRouter() {
    const routerOptions = {
        hashbang: false,
        history: true,
        linkActiveClass: 'active',
        saveScrollPosition: true
    };
    const router = new VueRouter(routerOptions);

    /* Routes */
    router.map({
        '/': {
            component: Game
        },
        '/login': {
            component: Login
        },
        '/register': {
            component: Register
        },
        '/about': {
            component: About
        }
    });

    router.redirect({
        '*': '/'
    });
    /* Routes */

    return router;
}