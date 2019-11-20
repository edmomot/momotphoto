import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import About from './components/About.vue';
import NotFound from './components/NotFound.vue';
import AlbumRoutingService from "./services/AlbumRoutingService";
import albumCollection from '../albums.json';

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { MdToolbar, MdButton, MdIcon, MdDrawer, MdList, MdContent } from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdDrawer);
Vue.use(MdList);
Vue.use(MdContent);

Vue.config.productionTip = false;

Vue.use(VueRouter);

const albums = albumCollection.albums;

const albumRoutes = AlbumRoutingService.AlbumRoutes(albums);

const staticRoutes = [
    { path: '/', name: 'home', component: Home, props: { albumRoutes: albumRoutes }},
    { path: '/about', name: 'about', component: About }
];

const errorRoutes = [
    { path: '*', component: NotFound }
];

const router = new VueRouter({ mode: 'history', routes: [...staticRoutes, ...albumRoutes, ...errorRoutes] });

new Vue({
    router,
    render: h => h(App , { props: { albums: albums }})
}).$mount('#app');

