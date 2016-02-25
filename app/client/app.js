import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import createRouter from './routes';

Vue.use(VueRouter);

const router = createRouter();

router.start(App, 'app');