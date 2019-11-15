import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import About from './components/About.vue';
import NotFound from './components/NotFound.vue';

import AlbumApiService from './services/AlbumApiService';
import AlbumRoutingService from "./services/AlbumRoutingService";
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;

Vue.use(VueRouter);

AlbumApiService.getAllAlbums().then(allAlbums => {
    const albumRoutes = AlbumRoutingService.AlbumRoutes(allAlbums);

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
        vuetify,
        render: h => h(App , { props: { albums: allAlbums }})
    }).$mount('#app');
});

